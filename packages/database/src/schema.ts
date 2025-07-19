import { relations, sql } from "drizzle-orm"
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const songs = sqliteTable(
  "songs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 200 }).notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    fileName: text("file_name", { length: 50 }).notNull().unique(),
    duration: integer("duration").notNull(),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    isSingle: integer("is_single", { mode: "boolean" }).notNull().default(false),
    releaseYear: integer("release_year"),
    albumId: integer("album_id").references(() => albums.id, { onDelete: "set null" }),
    lyrics: text("lyrics", { mode: "json" }).$type<{
      plainLyrics?: Array<{ text: string }>
      syncedLyrics?: Array<{ text: string; startTime: number }>
    }>(),
    playCount: integer("play_count").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("songs_name_idx").on(table.name),
    index("songs_album_idx").on(table.albumId),
    index("songs_favorite_idx").on(table.isFavorite),
    index("songs_playcount_idx").on(table.playCount),
    index("songs_last_played_idx").on(table.lastPlayedAt),
    index("songs_album_year_idx").on(table.albumId, table.releaseYear),
    index("songs_favorite_playcount_idx").on(table.isFavorite, table.playCount),
    index("songs_filename_idx").on(table.fileName),
    index("songs_single_idx").on(table.isSingle)
  ]
)

export const artists = sqliteTable(
  "artists",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 100 }).unique().notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    playCount: integer("play_count").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("artists_name_idx").on(table.name),
    index("artists_favorite_idx").on(table.isFavorite),
    index("artists_playcount_idx").on(table.playCount),
    index("artists_favorite_playcount_idx").on(table.isFavorite, table.playCount)
  ]
)

export const albums = sqliteTable(
  "albums",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 150 }).notNull(),
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    thumbnail: text("thumbnail", { length: 50 }),
    releaseYear: integer("release_year"),
    playCount: integer("play_count").notNull().default(0),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("albums_name_idx").on(table.name),
    index("albums_artist_idx").on(table.artistId),
    index("albums_release_year_idx").on(table.releaseYear),
    index("albums_favorite_idx").on(table.isFavorite),
    index("albums_playcount_idx").on(table.playCount),
    index("albums_artist_year_idx").on(table.artistId, table.releaseYear),
    uniqueIndex("albums_artist_name_unique_idx").on(table.artistId, table.name)
  ]
)

export const playlists = sqliteTable(
  "playlists",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 100 }).notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    playCount: integer("play_count").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("playlists_name_idx").on(table.name),
    index("playlists_favorite_idx").on(table.isFavorite),
    index("playlists_playcount_idx").on(table.playCount),
    index("playlists_last_played_idx").on(table.lastPlayedAt)
  ]
)

export const playHistory = sqliteTable(
  "play_history",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    playedAt: integer("played_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    playDuration: integer("play_duration"),
    wasSkipped: integer("was_skipped", { mode: "boolean" }).notNull().default(false),
    playSource: text("play_source", { length: 30 })
  },
  (table) => [
    index("play_history_song_idx").on(table.songId),
    index("play_history_played_at_idx").on(table.playedAt),
    index("play_history_source_idx").on(table.playSource),
    index("play_history_song_date_idx").on(table.songId, table.playedAt),
    index("play_history_skipped_idx").on(table.wasSkipped, table.playedAt)
  ]
)

export const songsToArtists = sqliteTable(
  "song_artists",
  {
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" })
  },
  (table) => [
    primaryKey({ columns: [table.songId, table.artistId] }),
    index("song_artists_song_idx").on(table.songId),
    index("song_artists_artist_idx").on(table.artistId)
  ]
)

export const playlistsToSongs = sqliteTable(
  "playlist_songs",
  {
    playlistId: integer("playlist_id")
      .notNull()
      .references(() => playlists.id, { onDelete: "cascade" }),
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    addedAt: integer("added_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    primaryKey({ columns: [table.playlistId, table.songId] }),
    index("playlist_songs_playlist_idx").on(table.playlistId),
    index("playlist_songs_song_idx").on(table.songId)
  ]
)

export const songStats = sqliteTable(
  "song_stats",
  {
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" })
      .primaryKey(),
    totalPlayTime: integer("total_play_time").notNull().default(0),
    averagePlayDuration: integer("average_play_duration").notNull().default(0),
    skipRate: integer("skip_rate").notNull().default(0),
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("song_stats_total_play_time_idx").on(table.totalPlayTime),
    index("song_stats_skip_rate_idx").on(table.skipRate),
    index("song_stats_last_calculated_idx").on(table.lastCalculatedAt)
  ]
)

export const songsRelations = relations(songs, ({ one, many }) => ({
  album: one(albums, {
    fields: [songs.albumId],
    references: [albums.id]
  }),
  artists: many(songsToArtists),
  playlists: many(playlistsToSongs),
  playHistory: many(playHistory),
  stats: one(songStats, {
    fields: [songs.id],
    references: [songStats.songId]
  })
}))

export const artistsRelations = relations(artists, ({ many }) => ({
  songs: many(songsToArtists),
  albums: many(albums)
}))

export const albumsRelations = relations(albums, ({ one, many }) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id]
  }),
  songs: many(songs)
}))

export const playlistsRelations = relations(playlists, ({ many }) => ({
  songs: many(playlistsToSongs)
}))

export const playHistoryRelations = relations(playHistory, ({ one }) => ({
  song: one(songs, {
    fields: [playHistory.songId],
    references: [songs.id]
  })
}))

export const songsToArtistsRelations = relations(songsToArtists, ({ one }) => ({
  song: one(songs, {
    fields: [songsToArtists.songId],
    references: [songs.id]
  }),
  artist: one(artists, {
    fields: [songsToArtists.artistId],
    references: [artists.id]
  })
}))

export const playlistsToSongsRelations = relations(playlistsToSongs, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistsToSongs.playlistId],
    references: [playlists.id]
  }),
  song: one(songs, {
    fields: [playlistsToSongs.songId],
    references: [songs.id]
  })
}))

export const songStatsRelations = relations(songStats, ({ one }) => ({
  song: one(songs, {
    fields: [songStats.songId],
    references: [songs.id]
  })
}))
