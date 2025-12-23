import { albums, artists, playlists, sidebar, songs } from "./schema"

export type Sidebar = typeof sidebar.$inferSelect
export type InsertSidebar = typeof sidebar.$inferInsert

export type Song = typeof songs.$inferSelect
export type InsertSong = typeof songs.$inferInsert

export type Artist = typeof artists.$inferSelect
export type InsertArtist = typeof artists.$inferInsert

export type Album = typeof albums.$inferSelect
export type InsertAlbum = typeof albums.$inferInsert

export type Playlist = typeof playlists.$inferSelect
export type InsertPlaylist = typeof playlists.$inferInsert
