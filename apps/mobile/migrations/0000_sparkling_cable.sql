CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`artist_id` integer NOT NULL,
	`thumbnail` text,
	`release_year` integer,
	`play_count` integer DEFAULT 0 NOT NULL,
	`is_favorite` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `albums_name_idx` ON `albums` (`name`);--> statement-breakpoint
CREATE INDEX `albums_artist_idx` ON `albums` (`artist_id`);--> statement-breakpoint
CREATE INDEX `albums_release_year_idx` ON `albums` (`release_year`);--> statement-breakpoint
CREATE INDEX `albums_favorite_idx` ON `albums` (`is_favorite`);--> statement-breakpoint
CREATE INDEX `albums_playcount_idx` ON `albums` (`play_count`);--> statement-breakpoint
CREATE TABLE `artists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`play_count` integer DEFAULT 0 NOT NULL,
	`last_played_at` integer,
	`is_favorite` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `artists_name_unique` ON `artists` (`name`);--> statement-breakpoint
CREATE INDEX `artists_name_idx` ON `artists` (`name`);--> statement-breakpoint
CREATE INDEX `artists_favorite_idx` ON `artists` (`is_favorite`);--> statement-breakpoint
CREATE INDEX `artists_playcount_idx` ON `artists` (`play_count`);--> statement-breakpoint
CREATE TABLE `play_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`song_id` integer NOT NULL,
	`played_at` integer DEFAULT (unixepoch()) NOT NULL,
	`play_duration` integer,
	`was_skipped` integer DEFAULT false NOT NULL,
	`play_source` text,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `play_history_song_idx` ON `play_history` (`song_id`);--> statement-breakpoint
CREATE INDEX `play_history_played_at_idx` ON `play_history` (`played_at`);--> statement-breakpoint
CREATE INDEX `play_history_source_idx` ON `play_history` (`play_source`);--> statement-breakpoint
CREATE INDEX `play_history_song_date_idx` ON `play_history` (`song_id`,`played_at`);--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`description` text,
	`play_count` integer DEFAULT 0 NOT NULL,
	`last_played_at` integer,
	`is_favorite` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `playlists_name_idx` ON `playlists` (`name`);--> statement-breakpoint
CREATE INDEX `playlists_favorite_idx` ON `playlists` (`is_favorite`);--> statement-breakpoint
CREATE INDEX `playlists_playcount_idx` ON `playlists` (`play_count`);--> statement-breakpoint
CREATE TABLE `playlist_songs` (
	`playlist_id` integer NOT NULL,
	`song_id` integer NOT NULL,
	`added_at` integer DEFAULT (unixepoch()) NOT NULL,
	PRIMARY KEY(`playlist_id`, `song_id`),
	FOREIGN KEY (`playlist_id`) REFERENCES `playlists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `playlist_songs_playlist_idx` ON `playlist_songs` (`playlist_id`);--> statement-breakpoint
CREATE INDEX `playlist_songs_song_idx` ON `playlist_songs` (`song_id`);--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`file_name` text NOT NULL,
	`duration` integer NOT NULL,
	`is_favorite` integer DEFAULT false NOT NULL,
	`release_year` integer,
	`album_id` integer,
	`play_count` integer DEFAULT 0 NOT NULL,
	`last_played_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `songs_file_name_unique` ON `songs` (`file_name`);--> statement-breakpoint
CREATE INDEX `songs_name_idx` ON `songs` (`name`);--> statement-breakpoint
CREATE INDEX `songs_album_idx` ON `songs` (`album_id`);--> statement-breakpoint
CREATE INDEX `songs_favorite_idx` ON `songs` (`is_favorite`);--> statement-breakpoint
CREATE INDEX `songs_playcount_idx` ON `songs` (`play_count`);--> statement-breakpoint
CREATE INDEX `songs_last_played_idx` ON `songs` (`last_played_at`);--> statement-breakpoint
CREATE INDEX `songs_album_year_idx` ON `songs` (`album_id`,`release_year`);--> statement-breakpoint
CREATE TABLE `song_artists` (
	`song_id` integer NOT NULL,
	`artist_id` integer NOT NULL,
	PRIMARY KEY(`song_id`, `artist_id`),
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `song_artists_song_idx` ON `song_artists` (`song_id`);--> statement-breakpoint
CREATE INDEX `song_artists_artist_idx` ON `song_artists` (`artist_id`);