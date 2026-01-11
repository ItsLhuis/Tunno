/**
 * Represents the structure of the manifest file contained within a fast upload bundle.
 * This manifest provides metadata about the entire bundle and its tracks.
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
  tracks: FastUploadTrackMeta[]
}

/**
 * Represents the metadata for a single track within the {@link FastUploadManifest}.
 */
export type FastUploadTrackMeta = {
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
}

/**
 * Represents a single track as it is being processed during the fast upload.
 * This type extends `FastUploadTrackMeta` with additional processing-specific status and data.
 */
export type ProcessingTrack = {
  id: string
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
  status: TrackStatus
  errorMessage: string | null
  createdSongId: number | null
}

/**
 * Defines the possible status states for a single track during the fast upload process.
 * - 'pending': The track is waiting to be processed.
 * - 'processing': The track is currently being processed.
 * - 'success': The track was processed successfully.
 * - 'error': An error occurred during the track's processing.
 * - 'skipped': The track was skipped (e.g., it was a duplicate and no update was needed).
 */
export type TrackStatus = "pending" | "processing" | "success" | "error" | "skipped"

/**
 * Defines the overall status states for the fast upload process.
 * - 'idle': No process is active.
 * - 'validating': The bundle is currently being validated.
 * - 'ready': The bundle is validated and ready for processing.
 * - 'processing': Tracks are currently being imported.
 * - 'completed': All tracks have been processed (successfully, with errors, or skipped).
 * - 'error': An unrecoverable error occurred during the overall process.
 */
export type ProcessStatus = "idle" | "validating" | "ready" | "processing" | "completed" | "error"

/**
 * Represents an error encountered during the processing of a single track.
 */
export type ProcessError = {
  trackId: string
  message: string
  stack?: string
}

/**
 * Represents the outcome of processing a single track.
 */
export type ProcessResult = {
  success: boolean
  skipped: boolean
  reason?: string
  songId?: number
  error?: Error
  thumbnailsUpdated?: boolean
}

/**
 * Represents the structure of a song's metadata as provided by the CLI
 * within the fast upload bundle.
 */
export type CLISong = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: CLIArtist[]
  album: CLIAlbum
  lyrics: { text: string; startTime: number }[] | null
}

/**
 * Represents the structure of an artist's metadata as provided by the CLI
 * within the fast upload bundle.
 */
export type CLIArtist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

/**
 * Represents the structure of an album's metadata as provided by the CLI
 * within the fast upload bundle.
 */
export type CLIAlbum = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: CLIArtist[]
}
