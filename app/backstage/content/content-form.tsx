"use client";

import { useActionState } from "react";
import {
  saveContentAction,
  type ContentFormState,
} from "./actions";
import { CONTENT_KEYS, type ContentKey } from "@/lib/content";

const initial: ContentFormState = {};

const field =
  "w-full border border-border bg-card px-3.5 py-2.5 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand";

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

  return (
    <form action={formAction} className="space-y-12">
      {SECTIONS.map((section) => (
        <section key={section.title}>
          <h2 className="border-b border-border pb-3 text-2xl font-bold tracking-tight">
            {section.title}
          </h2>
          <div className="mt-6 space-y-5">
            {section.keys.map((key) => {
              const def = CONTENT_KEYS[key];
              const value = current[key] ?? def.defaultValue;
              return (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    {def.label}
                  </label>
                  {def.multiline ? (
                    <textarea
                      id={key}
                      name={key}
                      defaultValue={value}
                      rows={4}
                      className={`${field} resize-y`}
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      defaultValue={value}
                      className={field}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {state.error && (
        <p className="border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300">
          Content saved · changes are live.
        </p>
      )}

      <div className="sticky bottom-4">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary btn-md"
        >
          {pending ? "Saving…" : "Save content →"}
        </button>
      </div>
    </form>
  );
}
