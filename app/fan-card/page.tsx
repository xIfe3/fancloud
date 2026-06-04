import type { Metadata } from "next";
import { getAllContent, pick } from "@/lib/content";
import { FanCardSection } from "@/components/fan-card-section";

export const metadata: Metadata = {
  title: "Fan Card",
  description:
    "The FANCLOUD Fan Card. A year-round pass to every show — pick Regular or VIP.",
};

export default async function FanCardPage() {
  const content = await getAllContent();

  const adminEmail = pick(content, "admin.email");

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {pick(content, "fancard.kicker")}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            {pick(content, "fancard.headline.line1")}
            <br />
            <span className="text-brand">
              {pick(content, "fancard.headline.line2")}
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
            {pick(content, "fancard.subcopy")}
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FanCardSection
              variant="regular"
              name={pick(content, "fancard.regular.name")}
              tagline={pick(content, "fancard.regular.tagline")}
              price={pick(content, "fancard.regular.price")}
              perks={pick(content, "fancard.regular.perks")}
              adminEmail={adminEmail}
              bodyTemplate={pick(content, "fancard.regular.email.body")}
            />
            <FanCardSection
              variant="vip"
              name={pick(content, "fancard.vip.name")}
              tagline={pick(content, "fancard.vip.tagline")}
              price={pick(content, "fancard.vip.price")}
              perks={pick(content, "fancard.vip.perks")}
              adminEmail={adminEmail}
              bodyTemplate={pick(content, "fancard.vip.email.body")}
            />
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section className="border-t border-border bg-subtle">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Fine print
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li>
              · Memberships run for one calendar year from the date of
              activation.
            </li>
            <li>
              · Perks apply at every FANCLOUD-branded event. Partner shows may
              have separate access rules.
            </li>
            <li>
              · Photo-op slots and lounge access are subject to availability at
              each individual show.
            </li>
            <li>
              · Cancel any time — we&apos;ll refund unused months pro rata.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
