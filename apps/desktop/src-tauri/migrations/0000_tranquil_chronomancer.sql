CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(150) NOT NULL,
	`artist_id` integer NOT NULL,
	`thumbnail` text(50),
	`release_year` integer,
	`play_count` integer DEFAULT 0 NOT NULL,
	`is_favorite` integer DEFAULT false NOT NULL,
	`is_auto_generated` integer DEFAULT false NOT NULL,
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
CREATE INDEX `albums_artist_year_idx` ON `albums` (`artist_id`,`release_year`);--> statement-breakpoint
CREATE UNIQUE INDEX `albums_artist_name_unique_idx` ON `albums` (`artist_id`,`name`);--> statement-breakpoint
CREATE INDEX `albums_auto_generated_idx` ON `albums` (`is_auto_generated`);--> statement-breakpoint
CREATE TABLE `artists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`thumbnail` text(50),
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
CREATE INDEX `artists_favorite_playcount_idx` ON `artists` (`is_favorite`,`play_count`);--> statement-breakpoint
CREATE TABLE `play_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`song_id` integer NOT NULL,
	`played_at` integer DEFAULT (unixepoch()) NOT NULL,
	`play_duration` integer,
	`was_skipped` integer DEFAULT false NOT NULL,
	`play_source` text(30),
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `play_history_song_idx` ON `play_history` (`song_id`);--> statement-breakpoint
CREATE INDEX `play_history_played_at_idx` ON `play_history` (`played_at`);--> statement-breakpoint
CREATE INDEX `play_history_source_idx` ON `play_history` (`play_source`);--> statement-breakpoint
CREATE INDEX `play_history_song_date_idx` ON `play_history` (`song_id`,`played_at`);--> statement-breakpoint
CREATE INDEX `play_history_skipped_idx` ON `play_history` (`was_skipped`,`played_at`);--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100) NOT NULL,
	`thumbnail` text(50),
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
CREATE INDEX `playlists_last_played_idx` ON `playlists` (`last_played_at`);--> statement-breakpoint
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
CREATE TABLE `song_stats` (
	`song_id` integer PRIMARY KEY NOT NULL,
	`total_play_time` integer DEFAULT 0 NOT NULL,
	`average_play_duration` integer DEFAULT 0 NOT NULL,
	`skip_rate` integer DEFAULT 0 NOT NULL,
	`last_calculated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `song_stats_total_play_time_idx` ON `song_stats` (`total_play_time`);--> statement-breakpoint
CREATE INDEX `song_stats_skip_rate_idx` ON `song_stats` (`skip_rate`);--> statement-breakpoint
CREATE INDEX `song_stats_last_calculated_idx` ON `song_stats` (`last_calculated_at`);--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(200) NOT NULL,
	`thumbnail` text(50),
	`file` text(50) NOT NULL,
	`duration` integer NOT NULL,
	`is_favorite` integer DEFAULT false NOT NULL,
	`is_single` integer DEFAULT false NOT NULL,
	`release_year` integer,
	`album_id` integer,
	`lyrics` text,
	`play_count` integer DEFAULT 0 NOT NULL,
	`last_played_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `songs_file_unique` ON `songs` (`file`);--> statement-breakpoint
CREATE INDEX `songs_name_idx` ON `songs` (`name`);--> statement-breakpoint
CREATE INDEX `songs_album_idx` ON `songs` (`album_id`);--> statement-breakpoint
CREATE INDEX `songs_favorite_idx` ON `songs` (`is_favorite`);--> statement-breakpoint
CREATE INDEX `songs_playcount_idx` ON `songs` (`play_count`);--> statement-breakpoint
CREATE INDEX `songs_last_played_idx` ON `songs` (`last_played_at`);--> statement-breakpoint
CREATE INDEX `songs_album_year_idx` ON `songs` (`album_id`,`release_year`);--> statement-breakpoint
CREATE INDEX `songs_favorite_playcount_idx` ON `songs` (`is_favorite`,`play_count`);--> statement-breakpoint
CREATE INDEX `songs_file_idx` ON `songs` (`file`);--> statement-breakpoint
CREATE INDEX `songs_single_idx` ON `songs` (`is_single`);--> statement-breakpoint
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