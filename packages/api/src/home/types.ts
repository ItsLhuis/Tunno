import { type QueryParams } from "../types"

import { type SongWithMainRelations } from "../songs"

import { type Artist, ArtistWithStats } from "../artists"

import { type Album, type AlbumWithArtists } from "../albums"

import { type Playlist } from "../playlists"

/**
 * Parameters for querying home screen data.
 */
export type QueryHomeParams = QueryParams<string, Record<string, unknown>>

/**
 * Represents various statistics about the user's music library and listening habits.
 */
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

/**
 * Represents data for the "Jump Back In" section, showing recently played songs.
 */
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

/**
 * Represents data for the "On Repeat" section, highlighting frequently played songs.
 */
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

/**
 * Represents data for the "Your Playlists" section.
 */
export type YourPlaylists = {
  playlists: Playlist[]
  totalPlaylists: number
  totalTracks: number
  totalDuration: number
  favoritePlaylists: number
}

/**
 * Represents data for the "New Releases" section.
 */
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

/**
 * Represents data for the "Discover" section, offering new music recommendations.
 */
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

/**
 * Represents data for the "Favorite Artists" section.
 */
export type FavoriteArtists = {
  artists: ArtistWithStats[]
  totalArtists: number
  totalRecentPlays: number
  totalPlayTime: number
  topArtist?: ArtistWithStats
}

/**
 * Represents data for the "Top Albums" section.
 */
export type TopAlbums = {
  albums: AlbumWithArtists[]
  totalAlbums: number
  totalRecentPlays: number
  totalPlayTime: number
  topAlbum?: AlbumWithArtists
}

/**
 * Represents data for the "Hidden Gems" section, suggesting lesser-known tracks.
 */
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

/**
 * Represents a single item recently added to the library, which can be a song, album, playlist, or artist.
 */
export type RecentlyAddedItem =
  | { type: "song"; data: SongWithMainRelations }
  | { type: "album"; data: AlbumWithArtists }
  | { type: "playlist"; data: Playlist }
  | { type: "artist"; data: Artist }

/**
 * Represents data for the "Recently Added" section, listing newly added items.
 */
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
