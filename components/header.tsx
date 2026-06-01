"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { Logo } from "./logo";

const NAV = [
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Backstage has its own chrome.
  if (pathname.startsWith("/backstage")) return null;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div onClick={() => setOpen(false)}>
          <Logo size="md" />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                isActive(item.href) ? "text-brand" : "text-foreground hover:text-brand"
              }`}
            >
              {item.label}
              <span
                className={`pointer-events-none absolute inset-x-4 -bottom-0.5 h-0.5 bg-brand transition-transform duration-200 ${
                  isActive(item.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
          <Link href="/events" className="btn btn-primary btn-sm ml-3">
            Get tickets
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foreground hover:bg-subtle md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                  isActive(item.href) ? "text-brand" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="btn btn-primary btn-md mt-3 w-full"
            >
              Get tickets
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
