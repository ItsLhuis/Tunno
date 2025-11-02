import { type PlaySource } from "@features/player/types/playSource"

export type PlaySession = {
  songId: number
  playSource: PlaySource
  sourceContextId?: number
  startTime: number
  playHistoryId?: number
  totalTimeListened: number
  isPaused: boolean
  playCountRecorded: boolean
  playCountTimer?: NodeJS.Timeout
}
