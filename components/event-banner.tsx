import { readableText } from "@/lib/format";

export function EventBanner({
  color,
  image,
  className = "",
  children,
}: {
  color: string;
  image?: string | null;
  className?: string;
  children?: React.ReactNode;
}) {
  if (image) {
    return (
      <div
        className={`relative bg-cover bg-center text-white ${className}`}
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: color, color: readableText(color) }}
    >
      {children}
    </div>
  );
}
