"use client";

import { useEffect, useState } from "react";
import { CloseIcon } from "./icons";

/**
 * Generic email-capture modal:
 *   1. user clicks the trigger button
 *   2. modal asks for their email
 *   3. on submit, builds a mailto: URL with subject + body (with {placeholder}
 *      substitution from `replacements`, plus an auto {email} key from the
 *      input) and opens their mail app
 *
 * Shared by: ContactEventButton, BookingButton, FanCardApplyButton.
 */
export function MailToButton({
  adminEmail,
  subject,
  bodyTemplate,
  replacements,
  triggerLabel,
  triggerClassName = "btn btn-primary btn-md w-full",
  kicker,
  title,
  description,
}: {
  adminEmail: string;
  subject: string;
  bodyTemplate: string;
  /** Placeholders to interpolate, e.g. {event:"...", city:"...", date:"..."}. */
  replacements: Record<string, string>;
  triggerLabel: string;
  triggerClassName?: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const all = { ...replacements, email: email.trim() };
    let body = bodyTemplate;
    for (const [k, v] of Object.entries(all)) {
      // global replace without regex special-char headaches
      body = body.split(`{${k}}`).join(v);
    }
    const href = `mailto:${encodeURIComponent(adminEmail)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="w-full max-w-md border border-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  {kicker}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md p-1.5 text-muted transition hover:bg-subtle hover:text-foreground"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={send} className="space-y-4 p-5">
              {description && (
                <p className="text-sm text-muted">{description}</p>
              )}
              <div>
                <label
                  htmlFor="mailto-email"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
                >
                  Your email
                </label>
                <input
                  id="mailto-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border bg-card px-3.5 py-3 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand"
                  placeholder="you@example.com"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-md w-full">
                Open my mail app →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
