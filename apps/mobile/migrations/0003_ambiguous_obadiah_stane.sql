ALTER TABLE `albums` ADD `fingerprint` text(64);--> statement-breakpoint
CREATE UNIQUE INDEX `albums_fingerprint_idx` ON `albums` (`fingerprint`);--> statement-breakpoint
ALTER TABLE `artists` ADD `fingerprint` text(64);--> statement-breakpoint
CREATE UNIQUE INDEX `artists_fingerprint_idx` ON `artists` (`fingerprint`);--> statement-breakpoint
ALTER TABLE `playlists` ADD `fingerprint` text(64);--> statement-breakpoint
CREATE UNIQUE INDEX `playlists_fingerprint_idx` ON `playlists` (`fingerprint`);--> statement-breakpoint
ALTER TABLE `songs` ADD `fingerprint` text(64);--> statement-breakpoint
CREATE UNIQUE INDEX `songs_fingerprint_idx` ON `songs` (`fingerprint`);