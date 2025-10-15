import { schema } from "@repo/database"

import { type QueryParams } from "../types"

export type QueryHomeParams = QueryParams<string, Record<string, unknown>>

import type { Song, SongWithMainRelations } from "../songs"

import type { Artist, ArtistWithStats } from "../artists"

import type { Album, AlbumWithArtists } from "../albums"

export type PlayHistory = typeof schema.playHistory.$inferSelect

export type JumpBackIn = {
  song: SongWithMainRelations
  playedAt: Date
  timeListened: number
  playSource: string
}

export type TopMix = SongWithMainRelations & {
  recentPlayCount: number
  totalPlayTime: number
}

export type OnRepeat = SongWithMainRelations & {
  recentPlayCount: number
  daysActive: number
}

export type FavoriteArtist = ArtistWithStats & {
  recentPlayCount: number
  totalPlayTime: number
}

export type TopAlbum = AlbumWithArtists & {
  recentPlayCount: number
  totalPlayTime: number
}

export type RecentlyAdded = SongWithMainRelations & {
  addedAt: Date
}

export type Discover = SongWithMainRelations & {
  discoveryScore: number
}

export type HiddenGems = SongWithMainRelations & {
  nostalgiaScore: number
}

export type UserStats = {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalPlaylists: number
  totalPlayTime: number
  totalPlayCount: number
  averageSessionTime: number
  mostPlayedGenre?: string
  topArtist?: Artist
  topAlbum?: Album
  topSong?: Song
}

export type PlaylistWithComputed = typeof schema.playlists.$inferSelect & {
  songCount: number
  totalDuration: number
}

export type AlbumRelease = AlbumWithArtists & {
  songCount: number
  totalDuration: number
}
