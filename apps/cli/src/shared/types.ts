/**
 * Represents an artist with their name, an optional thumbnail, and genres.
 */
export type Artist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

/**
 * Represents an album with its name, thumbnail, release year, type, and associated artists.
 */
export type Album = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: Artist[]
}

/**
 * Represents synchronized lyrics for a song, including metadata about the lyrics.
 */
export type Lyrics = {
  id: number
  name: string
  trackName: string
  artistName: string
  albumName: string
  duration: number
  instrumental: boolean
  lyrics: { text: string; startTime: number }[]
}

/**
 * Represents a complete song object with its audio file, metadata, and lyrics.
 */
export type Song = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: Artist[]
  album: Album
  lyrics: { text: string; startTime: number }[] | null
}

/**
 * Represents the manifest file for a Fast Upload bundle.
 * This manifest contains metadata about the bundle itself and a list of tracks included.
 */
export type FastUploadManifest = {
  version: number
  createdAt: string
  source: {
    type: "cli" | "desktop"
    version: string
    os: string
  }
  stats: {
    totalTracks: number
  }
  tracks: FastUploadTrack[]
}

/**
 * Represents a single track entry within the `FastUploadManifest`.
 */
export type FastUploadTrack = {
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
}
