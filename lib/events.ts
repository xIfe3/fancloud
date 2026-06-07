import "server-only";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "./db";
import { events as eventsTable } from "./schema";
import type { EventInput, EventStatus, EventType, FanEvent } from "./types";

type EventRow = typeof eventsTable.$inferSelect;

function mapRow(row: EventRow): FanEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    city: row.city,
    venue: row.venue,
    country: row.country,
    startDate: row.startDate,
    endDate: row.endDate,
    category: row.category,
    eventType: row.eventType as EventType,
    color: row.color,
    heroImage: row.heroImage,
    attendance: row.attendance,
    description: row.description,
    ticketUrl: row.ticketUrl,
    ticketOptions: Array.isArray(row.ticketOptions) ? row.ticketOptions : [],
    celebrityName: row.celebrityName,
    celebrityBio: row.celebrityBio,
    celebrityImage: row.celebrityImage,
    featured: row.featured,
    status: row.status as EventStatus,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : String(row.createdAt),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  const root = slugify(base) || "event";
  let candidate = root;
  let n = 2;
  for (;;) {
    const rows = await db
      .select({ id: eventsTable.id })
      .from(eventsTable)
      .where(eq(eventsTable.slug, candidate));
    const taken = rows.some((r) => r.id !== excludeId);
    if (!taken) return candidate;
    candidate = `${root}-${n}`;
    n += 1;
  }
}

export async function getAllEvents(): Promise<FanEvent[]> {
  const rows = await db
    .select()
    .from(eventsTable)
    .orderBy(asc(eventsTable.startDate));
  return rows.map(mapRow);
}

export async function getUpcomingEvents(limit?: number): Promise<FanEvent[]> {
  const base = db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.status, "upcoming"))
    .orderBy(asc(eventsTable.startDate));
  const rows = await (limit ? base.limit(limit) : base);
  return rows.map(mapRow);
}

export async function getFeaturedEvents(limit = 3): Promise<FanEvent[]> {
  const rows = await db
    .select()
    .from(eventsTable)
    .where(and(eq(eventsTable.featured, true), eq(eventsTable.status, "upcoming")))
    .orderBy(asc(eventsTable.startDate))
    .limit(limit);
  return rows.map(mapRow);
}

export async function getPastEvents(): Promise<FanEvent[]> {
  const rows = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.status, "past"))
    .orderBy(desc(eventsTable.startDate));
  return rows.map(mapRow);
}

export async function getEventBySlug(slug: string): Promise<FanEvent | null> {
  const rows = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.slug, slug))
    .limit(1);
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getEventById(id: number): Promise<FanEvent | null> {
  const rows = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, id))
    .limit(1);
  return rows[0] ? mapRow(rows[0]) : null;
}

export interface EventQuery {
  query?: string;
  category?: string;
  status?: EventStatus;
}

export async function searchEvents({
  query,
  category,
  status,
}: EventQuery): Promise<FanEvent[]> {
  const conditions = [];

  if (query && query.trim()) {
    const like = `%${query.trim()}%`;
    conditions.push(
      or(
        ilike(eventsTable.title, like),
        ilike(eventsTable.city, like),
        ilike(eventsTable.venue, like),
      ),
    );
  }
  if (category) conditions.push(eq(eventsTable.category, category));
  if (status) conditions.push(eq(eventsTable.status, status));

  const rows = await db
    .select()
    .from(eventsTable)
    .where(conditions.length ? and(...conditions) : undefined)
    // Upcoming first, then by date ascending.
    .orderBy(sql`(${eventsTable.status} = 'upcoming') desc`, asc(eventsTable.startDate));
  return rows.map(mapRow);
}

export async function getCategories(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ category: eventsTable.category })
    .from(eventsTable)
    .orderBy(asc(eventsTable.category));
  return rows.map((r) => r.category);
}

export async function createEvent(input: EventInput): Promise<FanEvent> {
  const slug = await uniqueSlug(`${input.title}-${input.city}`);
  const [row] = await db
    .insert(eventsTable)
    .values({ ...input, slug })
    .returning();
  return mapRow(row);
}

export async function updateEvent(
  id: number,
  input: EventInput,
): Promise<FanEvent | null> {
  const [row] = await db
    .update(eventsTable)
    .set({ ...input })
    .where(eq(eventsTable.id, id))
    .returning();
  return row ? mapRow(row) : null;
}

export async function deleteEvent(id: number): Promise<boolean> {
  const rows = await db
    .delete(eventsTable)
    .where(eq(eventsTable.id, id))
    .returning({ id: eventsTable.id });
  return rows.length > 0;
}

