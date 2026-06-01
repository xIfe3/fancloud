import type { Metadata } from "next";
import Link from "next/link";
import { StarburstMark } from "@/components/logo";
import { getAllContent, pick } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "FANCLOUD is the fan event network where audiences meet the actors, voice talent, and creators behind their favorite films, shows, comics, and games.",
};

const VALUES = [
  {
    title: "Fans first.",
    body: "Every decision starts with the people in line. Shorter waits, better access, better memories — not red-rope theatre.",
  },
  {
    title: "Real access.",
    body: "Up-close photo ops, intimate panels, signings that don't feel like assembly lines. The whole point is actually meeting the people you came for.",
  },
  {
    title: "Every city, all in.",
    body: "We don't do cookie-cutter shows. Each FANCLOUD is built around the city and the fandoms that call it home.",
  },
];

export default async function AboutPage() {
  const content = await getAllContent();

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {pick(content, "about.kicker")}
          </p>
          <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            {pick(content, "about.headline.line1")}
            <br />
            <span className="text-brand">
              {pick(content, "about.headline.line2")}
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
            {pick(content, "about.subcopy")}
          </p>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Our story
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                From one weekend to twelve cities.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/90">
                <p>
                  What began as a single weekend reunion of a cult-favorite cast
                  has grown into a touring network of events that bring the
                  actors, voice talent, and creators behind comics, anime,
                  gaming, sci-fi, and horror together with the audiences who
                  show up for them.
                </p>
                <p>
                  We partner with studios, agencies, and the talent directly to
                  build shows that put real access front and center — photo ops
                  that don&apos;t feel rushed, panels that go off-script, and
                  signing lines staffed to actually move.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                ["12+", "Cities a year"],
                ["500+", "Celebrity guests"],
                ["1M+", "Fans hosted"],
                ["100K+", "Photo ops booked"],
              ].map(([stat, label]) => (
                <div key={label} className="bg-background p-8">
                  <p className="text-5xl font-extrabold tracking-tight text-brand sm:text-6xl">
                    {stat}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-border bg-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            What we stand for
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Three rules. That&apos;s it.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="border border-border bg-background p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-brand">
                  0{i + 1}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <StarburstMark className="size-10 text-brand" />
              <h2 className="mt-6 text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-6xl">
                Come say hi
                <br />
                at the next show.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <Link href="/events" className="btn btn-primary btn-lg">
                See all events →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
