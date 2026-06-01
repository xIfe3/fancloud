import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";
import { EventForm } from "@/components/event-form";

export const metadata: Metadata = {
  title: "Edit event",
  robots: { index: false },
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(Number(id));
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/backstage"
        className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
      >
        ← Back to events
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Backstage · Edit
      </p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
        Edit event
      </h1>
      <p className="mt-2 text-muted">{event.title}</p>

      <div className="mt-10">
        <EventForm event={event} />
      </div>
    </div>
  );
}
