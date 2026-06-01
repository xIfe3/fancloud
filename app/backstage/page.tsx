import type { Metadata } from "next";
import Link from "next/link";
import { getAllEvents } from "@/lib/events";
import { formatDateRange } from "@/lib/format";
import { DeleteEventButton } from "@/components/delete-event-button";
import { PlusIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Backstage",
  robots: { index: false },
};

const STATUS_STYLES: Record<string, string> = {
  upcoming: "border-emerald-500/40 text-emerald-300",
  past: "border-border text-muted",
  cancelled: "border-red-500/40 text-red-300",
};

export default async function AdminPage() {
  const events = await getAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Backstage · Events
          </p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Manage events
          </h1>
          <p className="mt-2 text-muted">
            {events.length} event{events.length === 1 ? "" : "s"} · changes go
            live immediately.
          </p>
        </div>
        <Link href="/backstage/new" className="btn btn-primary btn-md">
          <PlusIcon className="size-4" />
          New event
        </Link>
      </div>

      <div className="mt-10 overflow-hidden border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-subtle font-mono text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Event</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                Dates
              </th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">
                Category
              </th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event) => (
              <tr key={event.id} className="transition hover:bg-subtle/60">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="block size-6 shrink-0 border border-border"
                      style={{ backgroundColor: event.color }}
                      aria-hidden
                    />
                    <div>
                      <div className="font-bold">{event.title}</div>
                      <div className="text-xs text-muted">
                        {event.city}, {event.country}
                        {event.featured && (
                          <span className="ml-2 border border-brand bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-4 font-mono text-xs uppercase tracking-widest text-muted sm:table-cell">
                  {formatDateRange(event.startDate, event.endDate)}
                </td>
                <td className="hidden px-4 py-4 text-muted md:table-cell">
                  {event.category}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${STATUS_STYLES[event.status] ?? STATUS_STYLES.past}`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/backstage/${event.id}/edit`}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand transition hover:bg-brand-soft"
                    >
                      Edit
                    </Link>
                    <DeleteEventButton id={event.id} title={event.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
