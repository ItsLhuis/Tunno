import { type PlaySource } from "@features/player/types/playSource"

/**
 * Represents an active audio playback session for statistics tracking.
 */
export type PlaySession = {
  songId: number
  playSource: PlaySource
  sourceContextId?: number
  startTime: number
  playHistoryId?: number
  totalTimeListened: number
  isPaused: boolean
  playCountRecorded: boolean
  playCountTimer?: ReturnType<typeof setTimeout>
  cachedAlbumId?: number | null
  cachedArtistIds?: number[]
}
