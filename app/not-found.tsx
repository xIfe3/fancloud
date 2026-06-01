import Link from "next/link";
import { StarburstMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <StarburstMark className="size-12 text-brand" />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        404 · Page not found
      </p>
      <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl">
        Wrong aisle.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for moved, wrapped up, or never existed.
        Try the calendar instead.
      </p>
      <Link href="/events" className="btn btn-primary btn-lg mt-8">
        Browse all events →
      </Link>
    </div>
  );
}
