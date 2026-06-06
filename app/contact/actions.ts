"use server";

import { getAllContent, pick } from "@/lib/content";
import { sendEmail } from "@/lib/email";
import { saveContactMessage } from "@/lib/events";

export interface ContactState {
  ok: boolean;
  error?: string;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length > 5000) {
    return { ok: false, error: "That message is a little too long." };
  }

  // 1. Save to DB first — this is the source of truth and always works,
  //    even if SMTP is misconfigured or the mail server is down.
  await saveContactMessage({
    name,
    email,
    subject: subject || null,
    message,
  });

  // 2. Try to forward via SMTP to the support inbox. Best-effort — if SMTP
  //    fails the message is still saved to /backstage/messages.
  try {
    const content = await getAllContent();
    const supportInbox = pick(content, "admin.email.support");

    const fullSubject = subject
      ? `[FANCLOUD contact] ${subject}`
      : `[FANCLOUD contact] New message from ${name}`;

    const body = [
      `New message from the FANCLOUD contact form.`,
      ``,
      `From:    ${name} <${email}>`,
      subject ? `Subject: ${subject}` : null,
      ``,
      `Message:`,
      message,
      ``,
      `— — —`,
      `Hit reply to respond directly to the sender.`,
      `Also saved in backstage at /backstage/messages.`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    await sendEmail({
      to: supportInbox,
      subject: fullSubject,
      text: body,
      // Reply-To = the sender's address, so clicking Reply in your mailbox
      // goes to them rather than to your own SMTP user.
      replyTo: email,
    });
  } catch (err) {
    console.error("[contact] email forward failed:", err);
    // Don't surface this to the user — the DB save succeeded.
  }

  return { ok: true };
}
