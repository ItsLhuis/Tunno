CREATE TABLE `sidebar` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` integer NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sidebar_entity_unique` ON `sidebar` (`entity_type`,`entity_id`);--> statement-breakpoint
CREATE INDEX `sidebar_created_idx` ON `sidebar` (`created_at`);