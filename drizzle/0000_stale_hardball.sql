CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"city" text NOT NULL,
	"venue" text NOT NULL,
	"country" text DEFAULT 'USA' NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"category" text NOT NULL,
	"color" text DEFAULT '#6d5efc' NOT NULL,
	"hero_image" text,
	"attendance" integer,
	"description" text DEFAULT '' NOT NULL,
	"ticket_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'upcoming' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
