ALTER TABLE "feeds" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_name_unique" UNIQUE("name");