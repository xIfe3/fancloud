"use client";

import { useActionState, useState } from "react";
import {
  saveContentAction,
  type ContentFormState,
} from "./actions";
import {
  CONTENT_KEYS,
  type ContentKey,
  type ContentKeyDef,
} from "@/lib/content-keys";

const initial: ContentFormState = {};

const field =
  "w-full border border-border bg-card px-4 py-3 text-sm font-medium leading-relaxed outline-none transition placeholder:text-muted focus:border-brand";

const SECTIONS: { title: string; keys: ContentKey[] }[] = [
  {
    title: "Home page",
    keys: [
      "home.kicker",
      "home.headline.line1",
      "home.headline.line2",
      "home.headline.line3",
      "home.subcopy",
      "home.cta.title",
      "home.cta.subcopy",
    ],
  },
  {
    title: "About page",
    keys: [
      "about.kicker",
      "about.headline.line1",
      "about.headline.line2",
      "about.subcopy",
    ],
  },
  {
    title: "Footer",
    keys: ["footer.tagline.big", "footer.tagline.small"],
  },
  {
    title: "Fan Card · page",
    keys: [
      "fancard.kicker",
      "fancard.headline.line1",
      "fancard.headline.line2",
      "fancard.subcopy",
    ],
  },
  {
    title: "Fan Card · Regular",
    keys: [
      "fancard.regular.name",
      "fancard.regular.tagline",
      "fancard.regular.price",
      "fancard.regular.perks",
    ],
  },
  {
    title: "Fan Card · VIP",
    keys: [
      "fancard.vip.name",
      "fancard.vip.tagline",
      "fancard.vip.price",
      "fancard.vip.perks",
    ],
  },
  {
    title: "Customer-care inboxes",
    keys: ["admin.email", "admin.email.support", "admin.email.booking"],
  },
  {
    title: "Email templates",
    keys: [
      "contact.event.body",
      "booking.event.body",
      "fancard.regular.email.body",
      "fancard.vip.email.body",
    ],
  },
];

export function ContentForm({
  current,
}: {
  current: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    saveContentAction,
    initial,
  );
  const [active, setActive] = useState(SECTIONS[0].title);

  return (
    <form action={formAction}>
      {/* TAB BAR */}
      <div className="sticky top-16 z-20 -mx-4 mb-10 border-b border-border bg-background/95 px-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="-mb-px flex gap-1 overflow-x-auto">
          {SECTIONS.map((section) => {
            const isActive = section.title === active;
            return (
              <button
                key={section.title}
                type="button"
                onClick={() => setActive(section.title)}
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTIONS — all rendered, only the active one visible */}
      {SECTIONS.map((section) => {
        const isActive = section.title === active;
        return (
          <section
            key={section.title}
            className={isActive ? "" : "hidden"}
            aria-hidden={!isActive}
          >
            <header className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Editing
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
            </header>

            <div className="space-y-10">
              {section.keys.map((key) => {
                // Widen the literal-typed entry so we can read the optional
                // hint / placeholders / rows fields uniformly.
                const def: ContentKeyDef = CONTENT_KEYS[key];
                const value = current[key] ?? def.defaultValue;
                const rows = def.rows ?? (def.multiline ? 6 : undefined);

                return (
                  <div key={key} className="space-y-3">
                    {/* Label + hint */}
                    <div>
                      <label
                        htmlFor={key}
                        className="block text-sm font-bold tracking-tight"
                      >
                        {def.label}
                      </label>
                      {def.hint && (
                        <p className="mt-1.5 text-xs text-muted">{def.hint}</p>
                      )}
                    </div>

                    {/* Input / textarea */}
                    {def.multiline ? (
                      <textarea
                        id={key}
                        name={key}
                        defaultValue={value}
                        rows={rows}
                        className={`${field} font-mono resize-y`}
                      />
                    ) : (
                      <input
                        id={key}
                        name={key}
                        defaultValue={value}
                        className={field}
                      />
                    )}

                    {/* Placeholder chips */}
                    {def.placeholders && def.placeholders.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                          Placeholders:
                        </span>
                        {def.placeholders.map((p) => (
                          <code
                            key={p}
                            className="border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-brand"
                            title="Paste this exact text into the body where you want the value to appear."
                          >
                            {`{${p}}`}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {state.error && (
        <p className="mt-10 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="mt-10 border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          Content saved · changes are live across every tab.
        </p>
      )}

      <div className="sticky bottom-4 mt-12 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary btn-md"
        >
          {pending ? "Saving…" : "Save all content →"}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Saves every tab at once
        </span>
      </div>
    </form>
  );
}
