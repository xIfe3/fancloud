"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "./icons";

export function EventsFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const [query, setQuery] = useState(currentQuery);

  function pushParams(next: { query?: string; category?: string }) {
    const params = new URLSearchParams(searchParams.toString());

    const q = next.query ?? query;
    if (q.trim()) params.set("query", q.trim());
    else params.delete("query");

    if (next.category !== undefined) {
      if (next.category) params.set("category", next.category);
      else params.delete("category");
    }

    const qs = params.toString();
    router.push(qs ? `/events?${qs}` : "/events");
  }

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushParams({ query });
        }}
        className="relative"
      >
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by event, city, or venue…"
          className="w-full border border-border bg-card py-3.5 pl-12 pr-32 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand"
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm absolute right-2 top-1/2 -translate-y-1/2"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 font-mono text-xs uppercase tracking-widest text-muted">
          Filter ·
        </span>
        <FilterPill
          active={!currentCategory}
          label="All"
          onClick={() => pushParams({ category: "" })}
        />
        {categories.map((cat) => (
          <FilterPill
            key={cat}
            active={currentCategory === cat}
            label={cat}
            onClick={() => pushParams({ category: cat })}
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
        active
          ? "border-brand bg-brand text-black"
          : "border-border bg-card text-foreground hover:border-foreground"
      }`}
    >
      {label}
    </button>
  );
}
