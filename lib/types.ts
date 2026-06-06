export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: string;
}

export type EventStatus = "upcoming" | "past" | "cancelled";

export const EVENT_TYPES = [
  "convention",
  "meet_greet",
  "tour",
  "panel",
  "signing",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  convention: "Convention",
  meet_greet: "Meet & Greet",
  tour: "Tour",
  panel: "Panel",
  signing: "Signing",
};

export interface TicketOption {
  label: string;
  url: string;
}

export interface FanEvent {
  id: number;
  slug: string;
  title: string;
  city: string;
  venue: string;
  country: string;
  startDate: string; // ISO date: YYYY-MM-DD
  endDate: string; // ISO date: YYYY-MM-DD
  category: string;
  eventType: EventType;
  color: string;
  heroImage: string | null;
  attendance: number | null;
  description: string;
  ticketUrl: string | null;
  ticketOptions: TicketOption[];
  celebrityName: string | null;
  celebrityBio: string | null;
  celebrityImage: string | null;
  featured: boolean;
  status: EventStatus;
  createdAt: string;
}

export interface EventInput {
  title: string;
  city: string;
  venue: string;
  country: string;
  startDate: string;
  endDate: string;
  category: string;
  eventType: EventType;
  color: string;
  heroImage: string | null;
  attendance: number | null;
  description: string;
  ticketUrl: string | null;
  ticketOptions: TicketOption[];
  celebrityName: string | null;
  celebrityBio: string | null;
  celebrityImage: string | null;
  featured: boolean;
  status: EventStatus;
}

export const EVENT_CATEGORIES = [
  "Comic Con",
  "Anime",
  "Gaming",
  "Sci-Fi",
  "Horror",
  "Collectibles",
] as const;

export const DEFAULT_EVENT_COLOR = "#6d5efc";

/** Suggested block colors for the admin picker (all flat, vibrant). */
export const EVENT_COLOR_PRESETS = [
  "#6d5efc", // purple
  "#16a34a", // green
  "#ec4899", // pink
  "#f59e0b", // amber
  "#db2777", // magenta
  "#111827", // near-black
  "#14b8a6", // teal
  "#2563eb", // blue
  "#84cc16", // lime
  "#f97316", // orange
  "#a855f7", // violet
  "#dc2626", // red
] as const;
