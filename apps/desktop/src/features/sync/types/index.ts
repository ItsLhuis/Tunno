export type SyncStatus = "idle" | "preparing" | "exporting" | "completed" | "error"

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

export type SyncTrackMeta = {
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
}

export type SyncArtist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

export type SyncAlbum = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: SyncArtist[]
}

export type SyncSongMetadata = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: SyncArtist[]
  album: SyncAlbum
  lyrics: { text: string; startTime: number }[] | null
}

export type TrackExportData = {
  dirName: string
  audioFile: string
  thumbnails: string[]
  metadataJson: string
}
