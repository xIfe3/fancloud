import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug, getUpcomingEvents } from "@/lib/events";
import { getAllContent, pick } from "@/lib/content";
import { EventBanner } from "@/components/event-banner";
import { EventCard } from "@/components/event-card";
import { StarburstMark } from "@/components/logo";
import { BookingButton } from "@/components/booking-modal";
import { ContactEventButton } from "@/components/contact-event-modal";
import { formatAttendance, formatDateRange } from "@/lib/format";
import { EVENT_TYPE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const attendance = formatAttendance(event.attendance);
  const isPast = event.status === "past";

  const [allUpcoming, content] = await Promise.all([
    getUpcomingEvents(8),
    getAllContent(),
  ]);
  const more = allUpcoming.filter((e) => e.slug !== event.slug).slice(0, 3);

  const adminEmail = pick(content, "admin.email");
  const contactTemplate = pick(content, "contact.event.body");
  const bookingTemplate = pick(content, "booking.event.body");

  return (
    <div>
      {/* HERO */}
      <EventBanner
        color={event.color}
        image={event.heroImage}
        className="min-h-[28rem] sm:min-h-[34rem]"
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]">
              <StarburstMark className="size-3.5" />
              {EVENT_TYPE_LABELS[event.eventType]} · {event.category}
            </span>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {event.featured && (
                <span className="fc-rotate-2 bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
                  ★ Featured
                </span>
              )}
              {isPast && (
                <span className="fc-rotate-1 bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Past event
                </span>
              )}
            </div>
          </div>

          <div className="mt-12">
            <p className="font-mono text-sm uppercase tracking-[0.3em] opacity-80">
              {formatDateRange(event.startDate, event.endDate)}
            </p>
            <h1 className="mt-3 text-7xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-9xl">
              {event.city}
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-bold uppercase tracking-tight sm:text-2xl">
              {event.title} · {event.venue}, {event.country}
            </p>
          </div>
        </div>
      </EventBanner>

      {/* BODY */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Link
          href="/events"
          className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
        >
          ← All events
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            {isPast && (
              <div className="border border-border bg-card px-5 py-4 text-sm font-medium text-muted">
                This event has already wrapped. Thanks to everyone who showed up.
              </div>
            )}

            {/* CELEBRITY PANEL */}
            {event.celebrityName && (
              <section className="border border-border bg-card p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
                  ★ Featured guest
                </p>
                <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
                  {event.celebrityImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.celebrityImage}
                      alt={event.celebrityName}
                      className="size-32 shrink-0 border border-border object-cover sm:size-40"
                    />
                  )}
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      {event.celebrityName}
                    </h2>
                    {event.celebrityBio && (
                      <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                        {event.celebrityBio}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ABOUT */}
            <section>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                About this show
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {event.celebrityName ? "What's included." : "Who you'll meet."}
              </h2>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-foreground/90">
                {event.description}
              </p>
            </section>
          </div>

          {/* Sticky ticket panel */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-border bg-card">
              <div className="border-b border-border p-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Show info
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight">
                  {event.title}
                </p>
              </div>

              <dl className="divide-y divide-border">
                <Fact label="Type" value={EVENT_TYPE_LABELS[event.eventType]} />
                <Fact label="Dates" value={formatDateRange(event.startDate, event.endDate)} mono />
                <Fact label="Venue" value={event.venue} />
                <Fact label="Location" value={`${event.city}, ${event.country}`} />
                <Fact label="Category" value={event.category} />
                {attendance && <Fact label="Attendance" value={`${attendance} fans`} />}
              </dl>

              <div className="space-y-3 border-t border-border p-6">
                {isPast ? (
                  <Link href="/events" className="btn btn-secondary btn-md w-full">
                    Find an upcoming show →
                  </Link>
                ) : (
                  <BookingButton
                    adminEmail={adminEmail}
                    bodyTemplate={bookingTemplate}
                    eventTitle={event.title}
                    eventCity={event.city}
                    eventDate={formatDateRange(event.startDate, event.endDate)}
                    celebrityName={event.celebrityName}
                  />
                )}

                <ContactEventButton
                  adminEmail={adminEmail}
                  bodyTemplate={contactTemplate}
                  eventTitle={event.title}
                  eventCity={event.city}
                  eventDate={formatDateRange(event.startDate, event.endDate)}
                  celebrityName={event.celebrityName}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* MORE EVENTS */}
      {more.length > 0 && (
        <section className="border-t border-border bg-subtle">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Keep going
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  More upcoming shows.
                </h2>
              </div>
              <Link
                href="/events"
                className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
              >
                Full calendar →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Fact({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 py-4">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className={`text-right font-medium ${mono ? "font-mono text-sm" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
