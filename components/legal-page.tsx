import Link from "next/link";

/**
 * Splits a body into renderable blocks. Each "block" is a paragraph chunk
 * separated by blank lines. If a chunk's first line looks like a heading
 * (short, no trailing period, has more text below it), it's promoted to an h3.
 */
function renderBody(text: string) {
  const chunks = text.split(/\n\n+/);
  return chunks.map((chunk, i) => {
    const lines = chunk.split("\n");
    const first = lines[0]?.trim() ?? "";
    const looksLikeHeading =
      first.length > 0 &&
      first.length < 80 &&
      !first.endsWith(".") &&
      lines.length > 1;

    if (looksLikeHeading) {
      return (
        <section key={i} className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {first}
          </h2>
          <p className="whitespace-pre-line text-foreground/90">
            {lines.slice(1).join("\n")}
          </p>
        </section>
      );
    }
    return (
      <p
        key={i}
        className="whitespace-pre-line text-base text-foreground/90 sm:text-lg"
      >
        {chunk}
      </p>
    );
  });
}

export function LegalPage({
  kicker,
  headline,
  updated,
  body,
}: {
  kicker: string;
  headline: string;
  updated: string;
  body: string;
}) {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            {kicker}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            {updated}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 sm:py-20">
        {renderBody(body)}

        <footer className="border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted">
          {updated} ·{" "}
          <Link href="/contact" className="text-brand hover:text-brand-dark">
            Contact us
          </Link>
        </footer>
      </article>
    </div>
  );
}
