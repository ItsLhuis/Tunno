import { type PlaySource } from "@features/songs/types/playSource"

export type PlaySession = {
  songId: number
  playSource: PlaySource
  sourceContextId?: number
  startTime: number
  playHistoryId?: number
  totalTimeListened: number
  isPaused: boolean
}
