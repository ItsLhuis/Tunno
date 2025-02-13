CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`release_year` integer,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `albums_name_idx` ON `albums` (`name`);--> statement-breakpoint
CREATE TABLE `artists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `artists_name_idx` ON `artists` (`name`);--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `playlists_name_idx` ON `playlists` (`name`);--> statement-breakpoint
CREATE TABLE `playlist_songs` (
	`playlist_id` integer NOT NULL,
	`song_id` integer NOT NULL,
	FOREIGN KEY (`playlist_id`) REFERENCES `playlists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `playlist_songs_playlistId_idx` ON `playlist_songs` (`playlist_id`);--> statement-breakpoint
CREATE INDEX `playlist_songs_songId_idx` ON `playlist_songs` (`song_id`);--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text,
	`duration` integer,
	`is_favorite` integer,
	`release_year` integer,
	`album_id` integer,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `songs_name_idx` ON `songs` (`name`);--> statement-breakpoint
CREATE INDEX `songs_albumId_idx` ON `songs` (`album_id`);--> statement-breakpoint
CREATE TABLE `song_artists` (
	`song_id` integer NOT NULL,
	`artist_id` integer NOT NULL,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `song_artists_songId_idx` ON `song_artists` (`song_id`);--> statement-breakpoint
CREATE INDEX `song_artists_artistId_idx` ON `song_artists` (`artist_id`);