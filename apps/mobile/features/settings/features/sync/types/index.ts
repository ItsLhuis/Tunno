/**
 * Defines the possible states of the sync lifecycle.
 * - `idle`: No sync activity.
 * - `scanning`: QR code scanner is active.
 * - `connecting`: Attempting to reach the desktop server.
 * - `comparing`: Exchanging fingerprints to determine missing items.
 * - `syncing`: Downloading and inserting entities in batches.
 * - `finalizing`: Updating aggregate statistics after all batches complete.
 * - `completed`: Sync finished successfully.
 * - `failed`: An unrecoverable error occurred.
 */
export type SyncState =
  | "idle"
  | "scanning"
  | "connecting"
  | "comparing"
  | "syncing"
  | "finalizing"
  | "completed"
  | "failed"

/**
 * Represents the connection data parsed from the desktop QR code payload.
 */
export type SyncConnectionData = {
  host: string
  port: number
  token: string
  url: string
}

/**
 * Tracks the progress of an ongoing sync session.
 */
export type SyncProgress = {
  totalItems: number
  syncedItems: number
  currentBatch: number
  totalBatches: number
  currentOperation: string | null
}

/**
 * Represents the fingerprints sent from mobile to desktop for library comparison.
 * Each array contains SHA-256 hex strings for the corresponding entity type.
 */
export type SyncCompareRequest = {
  songFingerprints: string[]
  albumFingerprints: string[]
  artistFingerprints: string[]
  playlistFingerprints: string[]
}

/**
 * Represents the desktop's response to a compare request, listing fingerprints
 * of entities that exist on desktop but not on mobile.
 */
export type SyncCompareResponse = {
  missingSongs: string[]
  missingAlbums: string[]
  missingArtists: string[]
  missingPlaylists: string[]
  totals: {
    songs: number
    albums: number
    artists: number
    playlists: number
  }
}

/**
 * Represents an artist's fingerprint alongside their ordering position
 * within a song or album relationship.
 */
export type SyncArtistOrder = {
  fingerprint: string
  artistOrder: number
}

/**
 * Represents the full metadata for a song as returned by the desktop batch API.
 */
export type SyncSongData = {
  fingerprint: string
  name: string
  duration: number
  releaseYear: number | null
  isFavorite: boolean
  lyrics: string | null
  file: string
  thumbnail: string | null
  albumFingerprint: string | null
  artistFingerprints: SyncArtistOrder[]
  playlistFingerprints: string[]
}

/**
 * Represents the full metadata for an album as returned by the desktop batch API.
 */
export type SyncAlbumData = {
  fingerprint: string
  name: string
  albumType: string
  releaseYear: number | null
  isFavorite: boolean
  hasThumbnail: boolean
  thumbnail: string | null
  artistFingerprints: SyncArtistOrder[]
}

/**
 * Represents the full metadata for an artist as returned by the desktop batch API.
 */
export type SyncArtistData = {
  fingerprint: string
  name: string
  isFavorite: boolean
  hasThumbnail: boolean
  thumbnail: string | null
}

/**
 * Represents the full metadata for a playlist as returned by the desktop batch API.
 */
export type SyncPlaylistData = {
  fingerprint: string
  name: string
  isFavorite: boolean
  songFingerprints: string[]
}

/**
 * Represents the request body sent to the desktop batch endpoint,
 * containing fingerprints of entities to retrieve and the current batch index.
 */
export type SyncBatchRequest = {
  songFingerprints: string[]
  albumFingerprints: string[]
  artistFingerprints: string[]
  playlistFingerprints: string[]
  batchIndex: number
}

/**
 * Represents the desktop's response to a batch request, containing
 * full metadata for all requested entities.
 */
export type SyncBatchResponse = {
  songs: SyncSongData[]
  albums: SyncAlbumData[]
  artists: SyncArtistData[]
  playlists: SyncPlaylistData[]
}

/**
 * Represents an error encountered during the sync process.
 */
export type SyncError = {
  type: "network" | "storage" | "database"
  message: string
  timestamp: number
}
