import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP password support: we accept either
 *   SMTP_PASSWORD       — raw password
 *   SMTP_PASSWORD_B64   — base64-encoded (use this if your password contains
 *                         `$` characters, which Next.js's env loader otherwise
 *                         mangles via variable expansion — same trick we use
 *                         for ADMIN_PASSWORD_HASH).
 *
 * Generate the base64 form with:
 *   node -e "console.log(Buffer.from('YOUR_PASSWORD').toString('base64'))"
 */
function getSmtpPassword(): string | undefined {
  const b64 = process.env.SMTP_PASSWORD_B64;
  if (b64) return Buffer.from(b64, "base64").toString("utf8");
  return process.env.SMTP_PASSWORD;
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      getSmtpPassword() &&
      (process.env.SMTP_FROM || process.env.SMTP_USER),
  );
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: getSmtpPassword(),
    },
  });
  return cachedTransporter;
}

export interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  /** Optional Reply-To — usually the original sender's address. */
  replyTo?: string;
}

/**
 * Send an email via SMTP. Returns true on success, false on failure.
 * Never throws — failures are logged but don't crash the caller, so the
 * surrounding action (e.g. saving a contact message to the DB) can still
 * succeed if SMTP is misconfigured.
 */
export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  if (!isSmtpConfigured()) {
    console.warn(
      "[email] SMTP not configured — skipping send. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD (or SMTP_PASSWORD_B64), and SMTP_FROM in .env.local.",
    );
    return false;
  }

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;

  try {
    await getTransporter().sendMail({
      from,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      text: params.text,
    });
    return true;
  } catch (err) {
    console.error("[email] sendMail failed:", err);
    return false;
  }
}
