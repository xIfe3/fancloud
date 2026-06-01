"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, StarburstMark } from "./logo";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/events", label: "All events" },
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Attend",
    links: [
      { href: "/events", label: "Buy tickets" },
      { href: "/events", label: "Upcoming shows" },
      { href: "/contact", label: "Exhibitor info" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/contact", label: "Press" },
      { href: "/contact", label: "Careers" },
    ],
  },
];

export function Footer({
  bigTagline,
  smallTagline,
}: {
  bigTagline: string;
  smallTagline: string;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/backstage")) return null;

  return (
    <footer className="border-t border-border bg-background">
      {/* Mega wordmark band */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-4">
            <StarburstMark className="size-12 text-brand sm:size-16" />
            <span className="text-5xl font-bold uppercase tracking-tight sm:text-7xl">
              Fancloud
            </span>
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted">{bigTagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm text-muted">{smallTagline}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-foreground transition hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-widest text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FANCLOUD · All rights reserved</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand">
              Terms
            </Link>
            <Link href="/" className="hover:text-brand">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
