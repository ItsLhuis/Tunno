import { type Track as BaseTrack } from "react-track-player-web"

import { type SongWithRelations } from "@repo/api"

export type Track = {
  id: number
} & BaseTrack &
  Omit<SongWithRelations, "album">
