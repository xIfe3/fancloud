import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategories, searchEvents } from "@/lib/events";
import { EventCard } from "@/components/event-card";
import { EventsFilter } from "@/components/events-filter";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Every FANCLOUD convention. Filter by category, search by city. Tickets and dates for all 12 cities.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;
  const [categories, results] = await Promise.all([
    getCategories(),
    searchEvents({ query, category }),
  ]);
  const upcoming = results.filter((e) => e.status === "upcoming");
  const past = results.filter((e) => e.status === "past");

  return (
    <div>
      {/* Page header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            The full calendar
          </p>
          <h1 className="mt-4 text-6xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-8xl">
            Every show.
            <br />
            <span className="text-brand">Every city.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Every FANCLOUD convention in one place. Filter by what you love or
            search by where you live.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <Suspense fallback={<div className="h-28" />}>
          <EventsFilter categories={categories} />
        </Suspense>

        {results.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-24 text-center">
            <p className="text-2xl font-bold tracking-tight">No events found.</p>
            <p className="mt-2 text-muted">
              Try a different search or clear your filters.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-16">
            {upcoming.length > 0 && (
              <section>
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Upcoming
                  </h2>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {upcoming.length} show{upcoming.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Past events
                  </h2>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {past.length} show{past.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
