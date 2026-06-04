ALTER TABLE "events" ADD COLUMN "event_type" text DEFAULT 'convention' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "ticket_options" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "celebrity_name" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "celebrity_bio" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "celebrity_image" text;