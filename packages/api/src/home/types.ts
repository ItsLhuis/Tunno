import { type QueryParams } from "../types"

export type QueryHomeParams = QueryParams<string, Record<string, unknown>>

import { type SongWithMainRelations } from "../songs"

import { type Artist, ArtistWithStats } from "../artists"

import { type Album, type AlbumWithArtists } from "../albums"

import { type Playlist } from "../playlists"

export type UserStats = {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalPlaylists: number
  totalPlayTime: number
  totalPlayCount: number
  averageSessionTime: number
  topArtist?: Artist
  topAlbum?: Album
  topSong?: SongWithMainRelations
  topPlaylist?: Playlist
  recentActivity: {
    songsPlayedToday: number
    songsPlayedThisWeek: number
    songsPlayedThisMonth: number
    timeListenedToday: number
    timeListenedThisWeek: number
    timeListenedThisMonth: number
  }
}

export type JumpBackIn = {
  items: Array<{
    song: SongWithMainRelations
    playedAt: Date
    timeListened: number
    playSource: string
  }>
  totalItems: number
  totalTimeListened: number
  averageTimePerSession: number
}

export type OnRepeat = {
  songs: Array<
    SongWithMainRelations & {
      recentPlayCount: number
      daysActive: number
    }
  >
  totalSongs: number
  totalRecentPlays: number
  averagePlaysPerSong: number
  mostPlayedSong?: SongWithMainRelations & {
    recentPlayCount: number
    daysActive: number
  }
}

export type YourPlaylists = {
  playlists: Playlist[]
  totalPlaylists: number
  totalTracks: number
  totalDuration: number
  favoritePlaylists: number
}

export type NewReleases = {
  albums: AlbumWithArtists[]
  totalAlbums: number
  totalTracks: number
  totalDuration: number
  releaseDateRange: {
    earliest: Date
    latest: Date
  }
}

export type Discover = {
  songs: Array<
    SongWithMainRelations & {
      discoveryScore: number
    }
  >
  totalSongs: number
  totalDuration: number
  averageDiscoveryScore: number
  highestDiscoveryScore: number
}

export type FavoriteArtists = {
  artists: ArtistWithStats[]
  totalArtists: number
  totalRecentPlays: number
  totalPlayTime: number
  topArtist?: ArtistWithStats
}

export type TopAlbums = {
  albums: AlbumWithArtists[]
  totalAlbums: number
  totalRecentPlays: number
  totalPlayTime: number
  topAlbum?: AlbumWithArtists
}

export type HiddenGems = {
  songs: Array<
    SongWithMainRelations & {
      nostalgiaScore: number
    }
  >
  totalSongs: number
  totalDuration: number
  averageNostalgiaScore: number
  highestNostalgiaScore: number
}

export type RecentlyAddedItem =
  | { type: "song"; data: SongWithMainRelations }
  | { type: "album"; data: AlbumWithArtists }
  | { type: "playlist"; data: Playlist }
  | { type: "artist"; data: Artist }

export type RecentlyAdded = {
  items: RecentlyAddedItem[]
  totalItems: number
  totalSongs: number
  totalAlbums: number
  totalPlaylists: number
  totalArtists: number
  totalDuration: number
  addedDateRange: {
    earliest: Date
    latest: Date
  }
}
