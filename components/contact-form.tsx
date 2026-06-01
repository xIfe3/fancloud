"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { CheckIcon } from "./icons";

const initialState: ContactState = { ok: false };

const fieldClass =
  "w-full border border-border bg-card px-4 py-3 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand";
const labelClass =
  "mb-2 block font-mono text-xs uppercase tracking-widest text-muted";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="border border-border bg-card p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center border border-brand bg-brand-soft text-brand">
          <CheckIcon className="size-6" />
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight">Message sent.</h3>
        <p className="mt-2 text-muted">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
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

      {state.error && (
        <p className="border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary btn-lg">
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
