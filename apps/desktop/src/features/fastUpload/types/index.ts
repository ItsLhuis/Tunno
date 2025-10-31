export type FastUploadManifest = {
  version: number
  createdAt: string
  source: {
    cliVersion: string
    os: string
  }
  stats: {
    totalTracks: number
  }
  tracks: FastUploadTrackMeta[]
}

export type FastUploadTrackMeta = {
  dirName: string
  title: string
  artists: string[]
  album: string
  thumbnail: string | null
}

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

export type TrackStatus = "pending" | "processing" | "success" | "error" | "skipped"

export type ProcessStatus = "idle" | "validating" | "ready" | "processing" | "completed" | "error"

export type ProcessError = {
  trackId: string
  message: string
  stack?: string
}

export type ProcessResult = {
  success: boolean
  skipped: boolean
  reason?: string
  songId?: number
  error?: Error
  thumbnailsUpdated?: boolean
}

export type CLISong = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: CLIArtist[]
  album: CLIAlbum
  lyrics: { text: string; startTime: number }[] | null
}

export type CLIArtist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

export type CLIAlbum = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: CLIArtist[]
}
