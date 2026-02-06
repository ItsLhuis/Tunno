import { desc, relations, sql } from "drizzle-orm"
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

import { v4 as randomUUID } from "uuid"

/**
 * Schema definition for the `sidebar` table.
 * Stores items added to the user's sidebar, including their type, ID, position, and creation timestamp.
 */
export const sidebar = sqliteTable(
  "sidebar",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    entityType: text("entity_type", { enum: ["album", "artist", "playlist"] }).notNull(),
    entityId: integer("entity_id").notNull(),
    position: integer("position").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    uniqueIndex("sidebar_entity_unique").on(table.entityType, table.entityId),
    index("sidebar_created_idx").on(table.createdAt)
  ]
)

/**
 * Schema definition for the `songs` table.
 * Stores information about individual music tracks.
 */
export const songs = sqliteTable(
  "songs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    uuid: text("uuid", { length: 36 })
      .notNull()
      .unique()
      .$defaultFn(() => randomUUID()),
    name: text("name", { length: 200 }).notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    file: text("file", { length: 50 }).notNull().unique(),
    duration: integer("duration").notNull(),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    releaseYear: integer("release_year"),
    albumId: integer("album_id").references(() => albums.id, { onDelete: "set null" }),
    lyrics: text("lyrics", { mode: "json" })
      .$type<
        {
          text: string
          startTime: number
        }[]
      >()
      .default([]),
    fingerprint: text("fingerprint", { length: 64 }),
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
    index("songs_created_id_idx").on(desc(table.createdAt), table.id),
    index("songs_playcount_id_idx").on(desc(table.playCount), table.id),
    index("songs_lastplayed_id_idx").on(desc(table.lastPlayedAt), table.id),
    index("songs_name_id_idx").on(table.name, table.id),
    index("songs_album_created_id_idx").on(table.albumId, desc(table.createdAt), table.id),
    index("songs_favorite_playcount_id_idx").on(table.isFavorite, desc(table.playCount), table.id),
    uniqueIndex("songs_fingerprint_idx").on(table.fingerprint)
  ]
)

/**
 * Schema definition for the `song_stats` table.
 * Stores statistical data for each song.
 */
export const songStats = sqliteTable(
  "song_stats",
  {
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" })
      .primaryKey(),
    totalPlayTime: integer("total_play_time").notNull().default(0),
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("song_stats_total_play_time_idx").on(table.totalPlayTime),
    index("song_stats_last_calculated_idx").on(table.lastCalculatedAt)
  ]
)

/**
 * Schema definition for the `song_artists` join table.
 * Links songs to their artists, supporting multiple artists per song.
 */
export const songsToArtists = sqliteTable(
  "song_artists",
  {
    songId: integer("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    artistOrder: integer("artist_order").default(0).notNull()
  },
  (table) => [
    primaryKey({ columns: [table.songId, table.artistId] }),
    index("song_artists_artist_idx").on(table.artistId),
    index("song_artists_order_idx").on(table.songId, table.artistOrder)
  ]
)

/**
 * Schema definition for the `artists` table.
 * Stores information about music artists.
 */
export const artists = sqliteTable(
  "artists",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    uuid: text("uuid", { length: 36 })
      .notNull()
      .unique()
      .$defaultFn(() => randomUUID()),
    name: text("name", { length: 100 }).unique().notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    fingerprint: text("fingerprint", { length: 64 }),
    playCount: integer("play_count").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    totalTracks: integer("total_tracks").notNull().default(0),
    totalDuration: integer("total_duration").notNull().default(0),
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
    index("artists_favorite_playcount_idx").on(table.isFavorite, table.playCount),
    index("artists_total_tracks_idx").on(table.totalTracks),
    index("artists_total_duration_idx").on(table.totalDuration),
    index("artists_last_played_idx").on(table.lastPlayedAt),
    index("artists_created_id_idx").on(desc(table.createdAt), table.id),
    index("artists_playcount_id_idx").on(desc(table.playCount), table.id),
    index("artists_lastplayed_id_idx").on(desc(table.lastPlayedAt), table.id),
    index("artists_name_id_idx").on(table.name, table.id),
    index("artists_favorite_playcount_id_idx").on(
      table.isFavorite,
      desc(table.playCount),
      table.id
    ),
    uniqueIndex("artists_fingerprint_idx").on(table.fingerprint)
  ]
)

/**
 * Schema definition for the `artist_stats` table.
 * Stores statistical data for each artist.
 */
export const artistStats = sqliteTable(
  "artist_stats",
  {
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" })
      .primaryKey(),
    totalPlayTime: integer("total_play_time").notNull().default(0),
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("artist_stats_total_play_time_idx").on(table.totalPlayTime),
    index("artist_stats_last_calculated_idx").on(table.lastCalculatedAt)
  ]
)

/**
 * Schema definition for the `albums` table.
 * Stores information about music albums.
 */
export const albums = sqliteTable(
  "albums",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    uuid: text("uuid", { length: 36 })
      .notNull()
      .unique()
      .$defaultFn(() => randomUUID()),
    name: text("name", { length: 150 }).notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    releaseYear: integer("release_year"),
    playCount: integer("play_count").notNull().default(0),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    albumType: text("album_type", { enum: ["single", "album", "compilation"] }).notNull(),
    fingerprint: text("fingerprint", { length: 64 }),
    totalTracks: integer("total_tracks").notNull().default(0),
    totalDuration: integer("total_duration").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("albums_name_idx").on(table.name),
    index("albums_playcount_idx").on(table.playCount),
    index("albums_release_year_idx").on(table.releaseYear),
    index("albums_favorite_idx").on(table.isFavorite),
    index("albums_album_type_idx").on(table.albumType),
    index("albums_total_tracks_idx").on(table.totalTracks),
    index("albums_total_duration_idx").on(table.totalDuration),
    index("albums_last_played_idx").on(table.lastPlayedAt),
    index("albums_created_id_idx").on(desc(table.createdAt), table.id),
    index("albums_playcount_id_idx").on(desc(table.playCount), table.id),
    index("albums_lastplayed_id_idx").on(desc(table.lastPlayedAt), table.id),
    index("albums_name_id_idx").on(table.name, table.id),
    index("albums_favorite_playcount_id_idx").on(table.isFavorite, desc(table.playCount), table.id),
    uniqueIndex("albums_fingerprint_idx").on(table.fingerprint)
  ]
)

/**
 * Schema definition for the `album_stats` table.
 * Stores statistical data for each album.
 */
export const albumStats = sqliteTable(
  "album_stats",
  {
    albumId: integer("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" })
      .primaryKey(),
    totalPlayTime: integer("total_play_time").notNull().default(0),
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("album_stats_total_play_time_idx").on(table.totalPlayTime),
    index("album_stats_last_calculated_idx").on(table.lastCalculatedAt)
  ]
)

/**
 * Schema definition for the `album_artists` join table.
 * Links albums to their artists, supporting multiple artists per album.
 */
export const albumsToArtists = sqliteTable(
  "album_artists",
  {
    albumId: integer("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    artistOrder: integer("artist_order").default(0).notNull()
  },
  (table) => [
    primaryKey({ columns: [table.albumId, table.artistId] }),
    index("album_artists_artist_idx").on(table.artistId),
    index("album_artists_order_idx").on(table.albumId, table.artistOrder)
  ]
)

/**
 * Schema definition for the `playlists` table.
 * Stores information about user-created music playlists.
 */
export const playlists = sqliteTable(
  "playlists",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    uuid: text("uuid", { length: 36 })
      .notNull()
      .unique()
      .$defaultFn(() => randomUUID()),
    name: text("name", { length: 100 }).unique().notNull(),
    thumbnail: text("thumbnail", { length: 50 }),
    fingerprint: text("fingerprint", { length: 64 }),
    playCount: integer("play_count").notNull().default(0),
    lastPlayedAt: integer("last_played_at", { mode: "timestamp" }),
    isFavorite: integer("is_favorite", { mode: "boolean" }).notNull().default(false),
    totalTracks: integer("total_tracks").notNull().default(0),
    totalDuration: integer("total_duration").notNull().default(0),
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
    index("playlists_total_tracks_idx").on(table.totalTracks),
    index("playlists_total_duration_idx").on(table.totalDuration),
    index("playlists_last_played_idx").on(table.lastPlayedAt),
    index("playlists_created_id_idx").on(desc(table.createdAt), table.id),
    index("playlists_playcount_id_idx").on(desc(table.playCount), table.id),
    index("playlists_lastplayed_id_idx").on(desc(table.lastPlayedAt), table.id),
    index("playlists_name_id_idx").on(table.name, table.id),
    index("playlists_favorite_playcount_id_idx").on(
      table.isFavorite,
      desc(table.playCount),
      table.id
    ),
    uniqueIndex("playlists_fingerprint_idx").on(table.fingerprint)
  ]
)

/**
 * Schema definition for the `playlist_stats` table.
 * Stores statistical data for each playlist.
 */
export const playlistStats = sqliteTable(
  "playlist_stats",
  {
    playlistId: integer("playlist_id")
      .notNull()
      .references(() => playlists.id, { onDelete: "cascade" })
      .primaryKey(),
    totalPlayTime: integer("total_play_time").notNull().default(0),
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("playlist_stats_total_play_time_idx").on(table.totalPlayTime),
    index("playlist_stats_last_calculated_idx").on(table.lastCalculatedAt)
  ]
)

/**
 * Schema definition for the `playlist_songs` join table.
 * Links playlists to their songs, supporting many-to-many relationship.
 */
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
    index("playlist_songs_song_idx").on(table.songId)
  ]
)

/**
 * Schema definition for the `play_history` table.
 * Records individual playback events for songs.
 */
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
    playSource: text("play_source", {
      enum: ["playlist", "album", "artist", "songs", "unknown"]
    })
      .notNull()
      .default("unknown"),
    timeListened: integer("time_listened").notNull().default(0)
  },
  (table) => [
    index("play_history_song_idx").on(table.songId),
    index("play_history_played_at_idx").on(table.playedAt),
    index("play_history_source_idx").on(table.playSource),
    index("play_history_song_date_idx").on(table.songId, table.playedAt),
    index("play_history_time_listened_idx").on(table.timeListened),
    index("play_history_played_song_idx").on(desc(table.playedAt), table.songId)
  ]
)

/**
 * Defines the relationships for the `songs` table.
 */
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

/**
 * Defines the relationships for the `songStats` table.
 */
export const songStatsRelations = relations(songStats, ({ one }) => ({
  song: one(songs, {
    fields: [songStats.songId],
    references: [songs.id]
  })
}))

/**
 * Defines the relationships for the `artists` table.
 */
export const artistsRelations = relations(artists, ({ many, one }) => ({
  songs: many(songsToArtists),
  albums: many(albumsToArtists),
  stats: one(artistStats, {
    fields: [artists.id],
    references: [artistStats.artistId]
  })
}))

/**
 * Defines the relationships for the `artistStats` table.
 */
export const artistStatsRelations = relations(artistStats, ({ one }) => ({
  artist: one(artists, {
    fields: [artistStats.artistId],
    references: [artists.id]
  })
}))

/**
 * Defines the relationships for the `albums` table.
 */
export const albumsRelations = relations(albums, ({ many, one }) => ({
  artists: many(albumsToArtists),
  songs: many(songs),
  stats: one(albumStats, {
    fields: [albums.id],
    references: [albumStats.albumId]
  })
}))

/**
 * Defines the relationships for the `albumStats` table.
 */
export const albumStatsRelations = relations(albumStats, ({ one }) => ({
  album: one(albums, {
    fields: [albumStats.albumId],
    references: [albums.id]
  })
}))

/**
 * Defines the relationships for the `albumsToArtists` join table.
 */
export const albumsToArtistsRelations = relations(albumsToArtists, ({ one }) => ({
  album: one(albums, {
    fields: [albumsToArtists.albumId],
    references: [albums.id]
  }),
  artist: one(artists, {
    fields: [albumsToArtists.artistId],
    references: [artists.id]
  })
}))

/**
 * Defines the relationships for the `songsToArtists` join table.
 */
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

/**
 * Defines the relationships for the `playlists` table.
 */
export const playlistsRelations = relations(playlists, ({ many, one }) => ({
  songs: many(playlistsToSongs),
  stats: one(playlistStats, {
    fields: [playlists.id],
    references: [playlistStats.playlistId]
  })
}))

/**
 * Defines the relationships for the `playlistStats` table.
 */
export const playlistStatsRelations = relations(playlistStats, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistStats.playlistId],
    references: [playlists.id]
  })
}))

/**
 * Defines the relationships for the `playlistsToSongs` join table.
 */
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

/**
 * Defines the relationships for the `playHistory` table.
 */
export const playHistoryRelations = relations(playHistory, ({ one }) => ({
  song: one(songs, {
    fields: [playHistory.songId],
    references: [songs.id]
  })
}))
