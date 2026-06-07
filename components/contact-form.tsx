"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

const fieldClass =
  "w-full border border-border bg-card px-4 py-3 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand";
const labelClass =
  "mb-2 block font-mono text-xs uppercase tracking-widest text-muted";

export function ContactForm({ adminEmail }: { adminEmail: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) return;

    const finalSubject = subject || `Message from ${name}`;
    const body = [
      `From: ${name} <${email}>`,
      "",
      message,
    ].join("\n");

    const href = `mailto:${encodeURIComponent(adminEmail)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-border bg-card p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center border border-brand bg-brand-soft text-brand">
          <CheckIcon className="size-6" />
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight">
          Your mail app opened.
        </h3>
        <p className="mt-2 text-muted">
          Finish sending the message from there. We&apos;ll reply to the email
          address you wrote it from.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
        >
          ← Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="subject" name="subject" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg">
        Send message →
      </button>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        Opens in your default mail app
      </p>
    </form>
  );
}
