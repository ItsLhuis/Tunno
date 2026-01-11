import { albums, artists, playlists, sidebar, songs } from "./schema"

/**
 * Represents a selected `Sidebar` entity.
 */
export type Sidebar = typeof sidebar.$inferSelect
/**
 * Represents data for inserting a new `Sidebar` entity.
 */
export type InsertSidebar = typeof sidebar.$inferInsert

/**
 * Represents a selected `Song` entity.
 */
export type Song = typeof songs.$inferSelect
/**
 * Represents data for inserting a new `Song` entity.
 */
export type InsertSong = typeof songs.$inferInsert

/**
 * Represents a selected `Artist` entity.
 */
export type Artist = typeof artists.$inferSelect
/**
 * Represents data for inserting a new `Artist` entity.
 */
export type InsertArtist = typeof artists.$inferInsert

/**
 * Represents a selected `Album` entity.
 */
export type Album = typeof albums.$inferSelect
/**
 * Represents data for inserting a new `Album` entity.
 */
export type InsertAlbum = typeof albums.$inferInsert

/**
 * Represents a selected `Playlist` entity.
 */
export type Playlist = typeof playlists.$inferSelect
/**
 * Represents data for inserting a new `Playlist` entity.
 */
export type InsertPlaylist = typeof playlists.$inferInsert
