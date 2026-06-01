import Link from "next/link";
import type { FanEvent } from "@/lib/types";
import { formatAttendance, formatDateRange, readableText } from "@/lib/format";
import { StarburstMark } from "./logo";

export function EventCard({ event }: { event: FanEvent }) {
  const attendance = formatAttendance(event.attendance);
  const textColor = readableText(event.color);
  const isPast = event.status === "past";

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block border border-border bg-card transition hover:-translate-y-1"
    >
      {/* Colored identity block */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={
          event.heroImage
            ? undefined
            : { backgroundColor: event.color, color: textColor }
        }
      >
        {event.heroImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${event.heroImage}")` }}
            />
            <div className="absolute inset-0 bg-black/35" />
          </>
        )}

        <div
          className="relative flex h-full flex-col justify-between p-5"
          style={event.heroImage ? { color: "#ffffff" } : undefined}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              <StarburstMark className="size-3" />
              Fancloud
            </span>

            <div className="flex flex-col items-end gap-1.5">
              <span
                className="border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ borderColor: "currentColor" }}
              >
                {event.category}
              </span>
              {event.featured && (
                <span className="fc-rotate-2 bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">
                  ★ Featured
                </span>
              )}
              {isPast && (
                <span className="fc-rotate-1 bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Past
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              {event.city}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] opacity-80">
              {event.country}
            </p>
          </div>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="border-t border-border p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {formatDateRange(event.startDate, event.endDate)}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight">{event.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {event.venue}
          {attendance && (
            <>
              {" · "}
              <span className="font-medium text-foreground">{attendance} fans</span>
            </>
          )}
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand">
          {isPast ? "View recap" : "Get tickets"}
          <span aria-hidden className="transition group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
