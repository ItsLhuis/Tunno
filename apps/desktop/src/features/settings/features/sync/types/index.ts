/**
 * Represents the possible states of the library export process.
 */
export type SyncStatus = "idle" | "preparing" | "exporting" | "completed" | "error"

/**
 * Represents the overall state of a library synchronization or export process.
 */
export type SyncState = {
  status: SyncStatus
  outputPath: string | null
  totalSongs: number
  currentSongIndex: number
  exportedCount: number
  errorCount: number
  error: string | null
  startedAt: string | null
  completedAt: string | null
  bundlePath: string | null
}

/**
 * Represents the manifest file structure included in the exported bundle.
 * Contains metadata about the export source and all exported tracks.
 */
export type SyncManifest = {
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
  tracks: SyncTrackMeta[]
}

/**
 * Represents a simplified metadata structure for a track within the sync manifest.
 */
export type SyncTrackMeta = {
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
}

/**
 * Represents the metadata for an artist within the synchronization context.
 */
export type SyncArtist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

/**
 * Represents the metadata for an album within the synchronization context.
 */
export type SyncAlbum = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: SyncArtist[]
}

/**
 * Represents the detailed metadata for a song, embedded within the exported track bundle.
 */
export type SyncSongMetadata = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: SyncArtist[]
  album: SyncAlbum
  lyrics: { text: string; startTime: number }[] | null
}

/**
 * Represents the raw data for a single track passed to the native Tauri export function.
 */
export type TrackExportData = {
  dirName: string
  audioFile: string
  thumbnails: string[]
  metadataJson: string
}
