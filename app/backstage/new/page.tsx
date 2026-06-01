import type { Metadata } from "next";
import Link from "next/link";
import { EventForm } from "@/components/event-form";

export const metadata: Metadata = {
  title: "New event",
  robots: { index: false },
};

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/backstage"
        className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
      >
        ← Back to events
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Backstage · New
      </p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
        New event
      </h1>
      <p className="mt-2 text-muted">
        Add a convention to the FANCLOUD calendar.
      </p>

      <div className="mt-10">
        <EventForm />
      </div>
    </div>
  );
}
