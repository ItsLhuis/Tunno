import { schema } from "@repo/database"

/**
 * Represents the source or context from which a track was initiated for playback.
 *
 * This type is derived directly from the `playSource` column of the `playHistory` schema,
 * ensuring consistency with the database definition.
 *
 * @example
 * ```typescript
 * type MyPlaySource = PlaySource; // e.g., "album", "artist", "playlist", "songs", "unknown"
 * ```
 */
export type PlaySource = (typeof schema.playHistory.$inferInsert)["playSource"]
