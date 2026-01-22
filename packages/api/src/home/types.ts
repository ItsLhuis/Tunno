import { type SongWithMainRelations } from "../songs"

import { type Artist } from "../artists"

import { type Album } from "../albums"

import { type Playlist } from "../playlists"

/**
 * Represents a single quick access item, which can be a playlist, album, or artist.
 */
export type QuickAccessItem =
  | { type: "playlist"; data: Playlist }
  | { type: "album"; data: Album }
  | { type: "artist"; data: Artist }

/**
 * Represents data for the "Quick access" section, showing recently played
 * playlists, albums, and artists for quick navigation.
 */
export type QuickAccess = {
  items: QuickAccessItem[]
  totalItems: number
}

/**
 * Represents data for the "Jump back in" section, showing recently played songs.
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
 * Represents data for the "New releases" section, showing recently added albums.
 */
export type NewReleases = {
  albums: Album[]
  totalAlbums: number
  totalTracks: number
  totalDuration: number
  releaseDateRange: {
    earliest: Date
    latest: Date
  }
}

/**
 * Represents data for the "On repeat" section, highlighting frequently played songs.
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
 * Represents data for the "Discover" section, showing new music recommendations.
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
 * Represents data for the "Favorite artists" section, showing most played artists.
 */
export type FavoriteArtists = {
  artists: Artist[]
  totalArtists: number
  totalPlayCount: number
  topArtist?: Artist
}

/**
 * Represents data for the "Your playlists" section, showing user's playlists.
 */
export type YourPlaylists = {
  playlists: Playlist[]
  totalPlaylists: number
  totalTracks: number
  totalDuration: number
  favoritePlaylists: number
}

/**
 * Represents data for the "Top albums" section, showing most played albums.
 */
export type TopAlbums = {
  albums: Album[]
  totalAlbums: number
  totalTracks: number
  totalDuration: number
  totalPlayCount: number
}

/**
 * Represents a single recently added item, which can be a song, album, artist, or playlist.
 */
export type RecentlyAddedItem =
  | { type: "song"; data: SongWithMainRelations }
  | { type: "album"; data: Album }
  | { type: "artist"; data: Artist }
  | { type: "playlist"; data: Playlist }

/**
 * Represents data for the "Recently added" section, showing newly added
 * songs, albums, artists, and playlists.
 */
export type RecentlyAdded = {
  items: RecentlyAddedItem[]
  totalItems: number
  addedDateRange: {
    earliest: Date
    latest: Date
  }
}
