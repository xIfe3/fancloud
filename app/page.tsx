import Link from "next/link";
import { getFeaturedEvents, getUpcomingEvents } from "@/lib/events";
import { EventCard } from "@/components/event-card";
import { Marquee } from "@/components/marquee";
import { StarburstMark } from "@/components/logo";
import { formatDateRange } from "@/lib/format";
import { getAllContent, pick } from "@/lib/content";

export default async function HomePage() {
  const [featured, upcoming, content] = await Promise.all([
    getFeaturedEvents(3),
    getUpcomingEvents(8),
    getAllContent(),
  ]);

  const ctaTitle = pick(content, "home.cta.title").split("|");

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            <span className="inline-block size-1.5 rounded-full bg-brand" />
            {pick(content, "home.kicker")}
          </div>

          <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-[10rem]">
            {pick(content, "home.headline.line1")}
            <br />
            {pick(content, "home.headline.line2")}
            <br />
            <span className="text-brand">{pick(content, "home.headline.line3")}</span>
          </h1>

          <div className="mt-10 grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-end">
            <p className="max-w-xl text-lg text-muted sm:text-xl">
              {pick(content, "home.subcopy")}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <Link href="/events" className="btn btn-primary btn-lg">
                Browse all events →
              </Link>
              <Link href="/about" className="btn btn-secondary btn-lg">
                About FANCLOUD
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
            {[
              ["12+", "Cities a year"],
              ["500+", "Celebrity guests"],
              ["1M+", "Fans hosted"],
              ["100K+", "Photo ops booked"],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {stat}
                </dt>
                <dd className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee
        invert
        items={[
          "Meet your heroes",
          "Photo ops",
          "Autograph alley",
          "Live Q&A panels",
          "Cast reunions",
          "Voice actor stages",
          "Exclusive signings",
          "Celebrity guests",
        ]}
      />

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Featured · The big ones
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Headline shows.
                </h2>
              </div>
              <Link
                href="/events"
                className="hidden font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand sm:inline"
              >
                View all →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NOW BOOKING — list rail, ticket platform energy */}
      {upcoming.length > 0 && (
        <section className="border-b border-border bg-subtle">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Now booking
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Upcoming dates.
                </h2>
              </div>
              <Link
                href="/events"
                className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
              >
                Full calendar →
              </Link>
            </div>

            <ul className="mt-10 border-t border-border">
              {upcoming.map((event) => (
                <li
                  key={event.id}
                  className="border-b border-border transition hover:bg-background"
                >
                  <Link
                    href={`/events/${event.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-8 sm:py-6"
                  >
                    <span
                      className="hidden w-1.5 self-stretch sm:block"
                      style={{ backgroundColor: event.color }}
                      aria-hidden
                    />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">
                        {formatDateRange(event.startDate, event.endDate)}
                      </p>
                      <p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                        {event.title}
                      </p>
                      <p className="text-sm text-muted">
                        {event.venue} · {event.city}, {event.country}
                      </p>
                    </div>
                    <span className="hidden items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand sm:inline-flex">
                      Get tickets
                      <span aria-hidden className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA PANEL */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <StarburstMark className="size-10 text-brand" />
              <h2 className="mt-6 text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-6xl">
                {ctaTitle.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < ctaTitle.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted">
                {pick(content, "home.cta.subcopy")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <Link href="/events" className="btn btn-primary btn-lg">
                Browse all events →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
