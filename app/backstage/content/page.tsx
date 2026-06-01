import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ContentForm } from "./content-form";

export const metadata: Metadata = {
  title: "Content",
  robots: { index: false },
};

export default async function ContentPage() {
  const map = await getAllContent();
  const current: Record<string, string> = {};
  for (const [k, v] of map) current[k] = v;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Backstage · Content
      </p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
        Page content
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Edit the copy on the home page, about page, and footer. Changes go live
        the moment you hit save.
      </p>

      <div className="mt-10">
        <ContentForm current={current} />
      </div>
    </div>
  );
}
