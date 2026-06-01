import Link from "next/link";

export function StarburstMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {/* 8-point starburst — comic-action energy, geometric, clean. */}
      <path d="M16 0 L18.5 12.5 L29.6 5.6 L22.7 16.6 L32 19.4 L19.5 21.9 L26.4 32.9 L16 26 L5.6 32.9 L12.5 21.9 L0 19.4 L9.3 16.6 L2.4 5.6 L13.5 12.5 Z" />
    </svg>
  );
}

export function Logo({
  size = "md",
  href = "/",
  onClick,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  onClick?: () => void;
}) {
  const sizes = {
    sm: { mark: "size-4", text: "text-base" },
    md: { mark: "size-5", text: "text-lg" },
    lg: { mark: "size-7", text: "text-2xl" },
    xl: { mark: "size-10", text: "text-4xl sm:text-5xl" },
  };
  const s = sizes[size];

  const content = (
    <span className="inline-flex items-center gap-2">
      <StarburstMark className={`${s.mark} text-brand`} />
      <span
        className={`${s.text} font-bold uppercase tracking-tight text-foreground`}
      >
        Fancloud
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} onClick={onClick} className="inline-flex items-center">
      {content}
    </Link>
  );
}
