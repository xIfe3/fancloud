import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export interface TicketOption {
  label: string;
  url: string;
}

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  city: text("city").notNull(),
  venue: text("venue").notNull(),
  country: text("country").notNull().default("USA"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  category: text("category").notNull(),
  eventType: text("event_type").notNull().default("convention"),
  color: text("color").notNull().default("#6d5efc"),
  heroImage: text("hero_image"),
  attendance: integer("attendance"),
  description: text("description").notNull().default(""),
  ticketUrl: text("ticket_url"),
  ticketOptions: jsonb("ticket_options")
    .$type<TicketOption[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  celebrityName: text("celebrity_name"),
  celebrityBio: text("celebrity_bio"),
  celebrityImage: text("celebrity_image"),
  featured: boolean("featured").notNull().default(false),
  status: text("status").notNull().default("upcoming"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
