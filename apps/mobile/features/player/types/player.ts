import { type Track as BaseTrack } from "react-native-track-player"

import { type SongWithMainRelations } from "@repo/api"

/**
 * Represents a playable track in the music player.
 *
 * This type extends the base `Track` type from `react-native-track-player` and
 * incorporates essential properties from `SongWithMainRelations` for richer metadata,
 * while omitting the `album` property to avoid redundancy or type conflicts.
 */
export type Track = {
  id: number
} & BaseTrack &
  Omit<SongWithMainRelations, "album">
