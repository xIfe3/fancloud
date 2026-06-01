const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parts(iso: string) {
  // iso is YYYY-MM-DD; parse without timezone surprises.
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** "Jul 10–12, 2026", "Feb 28 – Mar 2, 2027", "Dec 30, 2026 – Jan 1, 2027" */
export function formatDateRange(startIso: string, endIso: string): string {
  const s = parts(startIso);
  const e = parts(endIso);

  if (s.y === e.y && s.m === e.m && s.d === e.d) {
    return `${MONTHS[s.m]} ${s.d}, ${s.y}`;
  }
  if (s.y === e.y && s.m === e.m) {
    return `${MONTHS[s.m]} ${s.d}–${e.d}, ${s.y}`;
  }
  if (s.y === e.y) {
    return `${MONTHS[s.m]} ${s.d} – ${MONTHS[e.m]} ${e.d}, ${s.y}`;
  }
  return `${MONTHS[s.m]} ${s.d}, ${s.y} – ${MONTHS[e.m]} ${e.d}, ${e.y}`;
}

export function formatMonthYear(iso: string): string {
  const { y, m } = parts(iso);
  return `${MONTHS[m]} ${y}`;
}

export function formatAttendance(n: number | null): string | null {
  if (!n) return null;
  return `${n.toLocaleString("en-US")}+`;
}

/** Returns black or white depending on which reads better on `hex`. */
export function readableText(hex: string): "#000000" | "#ffffff" {
  const m = /^#?([a-f\d]{6})$/i.exec(hex.trim());
  if (!m) return "#ffffff";
  const int = parseInt(m[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  // Perceived luminance (sRGB approximation).
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#ffffff";
}
