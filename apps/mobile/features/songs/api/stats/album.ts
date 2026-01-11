import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

/**
 * Recalculates and updates the total tracks and total duration for a given album.
 *
 * This function queries the database to count all songs associated with the `albumId`
 * and sums their durations. It then updates the corresponding `totalTracks` and
 * `totalDuration` fields in the `albums` table.
 *
 * @param albumId - The ID of the album whose statistics need to be updated.
 * @returns A Promise that resolves when the album statistics have been updated.
 */
export async function updateAlbumStats(albumId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(*)`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.songs)
    .where(eq(schema.songs.albumId, albumId))
    .groupBy(schema.songs.albumId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.albums)
    .set({
      totalTracks,
      totalDuration
    })
    .where(eq(schema.albums.id, albumId))
}

/**
 * Updates album statistics for affected albums when a song's album association changes.
 *
 * This function takes a `newAlbumId` and an `oldAlbumId` (if any), identifies
 * the unique album IDs that need their statistics recalculated, and then
 * calls `updateAlbumStats` for each of them. This is typically used when
 * a song is added, removed, or moved between albums.
 *
 * @param newAlbumId - The ID of the album the song is now associated with (if any).
 * @param oldAlbumId - The ID of the album the song was previously associated with (if any).
 * @returns A Promise that resolves when all affected album statistics have been updated.
 */
export async function updateAlbumStatsForSong(
  newAlbumId?: number | null,
  oldAlbumId?: number | null
): Promise<void> {
  const affectedAlbumIds = [
    ...(oldAlbumId ? [oldAlbumId] : []),
    ...(newAlbumId ? [newAlbumId] : [])
  ].filter((id, index, arr) => arr.indexOf(id) === index)

  await Promise.all(affectedAlbumIds.map((albumId) => updateAlbumStats(albumId)))
}
