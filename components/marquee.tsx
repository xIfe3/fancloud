import { StarburstMark } from "./logo";

export function Marquee({
  items,
  className = "",
  invert = false,
}: {
  items: string[];
  className?: string;
  invert?: boolean;
}) {
  // Duplicate the list so the loop is seamless when translated -50%.
  const loop = [...items, ...items];
  const bg = invert ? "bg-brand text-black" : "bg-background text-foreground";

  return (
    <div
      className={`relative overflow-hidden border-y border-border ${bg} ${className}`}
    >
      <div className="fc-marquee flex w-max items-center gap-10 py-4">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-2xl font-bold uppercase tracking-tight whitespace-nowrap sm:text-3xl"
          >
            {item}
            <StarburstMark
              className={`size-4 ${invert ? "text-black/70" : "text-brand"}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
