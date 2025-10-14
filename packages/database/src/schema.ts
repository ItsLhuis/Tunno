import { relations, sql } from "drizzle-orm"
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

import { v4 as randomUUID } from "uuid"

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
    lyrics: text("lyrics", { mode: "json" }).$type<
      {
        text: string
        startTime: number
      }[]
    >(),
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
    index("songs_file_idx").on(table.file)
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
    lastCalculatedAt: integer("last_calculated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
  },
  (table) => [
    index("song_stats_total_play_time_idx").on(table.totalPlayTime),
    index("song_stats_last_calculated_idx").on(table.lastCalculatedAt)
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
      .references(() => artists.id, { onDelete: "cascade" }),
    artistOrder: integer("artist_order").default(0).notNull()
  },
  (table) => [
    primaryKey({ columns: [table.songId, table.artistId] }),
    index("song_artists_song_idx").on(table.songId),
    index("song_artists_artist_idx").on(table.artistId),
    index("song_artists_order_idx").on(table.songId, table.artistOrder)
  ]
)

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
    index("artists_last_played_idx").on(table.lastPlayedAt)
  ]
)

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
    uniqueIndex("albums_name_type_unique_idx").on(table.name, table.albumType),
    index("albums_last_played_idx").on(table.lastPlayedAt)
  ]
)

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
    index("album_artists_album_idx").on(table.albumId),
    index("album_artists_artist_idx").on(table.artistId),
    index("album_artists_order_idx").on(table.albumId, table.artistOrder)
  ]
)

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
    index("playlists_last_played_idx").on(table.lastPlayedAt)
  ]
)

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
    index("play_history_time_listened_idx").on(table.timeListened)
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

export const songStatsRelations = relations(songStats, ({ one }) => ({
  song: one(songs, {
    fields: [songStats.songId],
    references: [songs.id]
  })
}))

export const artistsRelations = relations(artists, ({ many, one }) => ({
  songs: many(songsToArtists),
  albums: many(albumsToArtists),
  stats: one(artistStats, {
    fields: [artists.id],
    references: [artistStats.artistId]
  })
}))

export const artistStatsRelations = relations(artistStats, ({ one }) => ({
  artist: one(artists, {
    fields: [artistStats.artistId],
    references: [artists.id]
  })
}))

export const albumsRelations = relations(albums, ({ many, one }) => ({
  artists: many(albumsToArtists),
  songs: many(songs),
  stats: one(albumStats, {
    fields: [albums.id],
    references: [albumStats.albumId]
  })
}))

export const albumStatsRelations = relations(albumStats, ({ one }) => ({
  album: one(albums, {
    fields: [albumStats.albumId],
    references: [albums.id]
  })
}))

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

export const playlistsRelations = relations(playlists, ({ many, one }) => ({
  songs: many(playlistsToSongs),
  stats: one(playlistStats, {
    fields: [playlists.id],
    references: [playlistStats.playlistId]
  })
}))

export const playlistStatsRelations = relations(playlistStats, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistStats.playlistId],
    references: [playlists.id]
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

export const playHistoryRelations = relations(playHistory, ({ one }) => ({
  song: one(songs, {
    fields: [playHistory.songId],
    references: [songs.id]
  })
}))
