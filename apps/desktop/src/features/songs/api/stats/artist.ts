import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

/**
 * Recalculates and updates the total tracks and total duration for a given artist.
 *
 * This function queries the database to count all unique songs associated with the `artistId`
 * and sums their durations. It then updates the corresponding `totalTracks` and
 * `totalDuration` fields in the `artists` table.
 *
 * @param artistId - The ID of the artist whose statistics need to be updated.
 * @returns A Promise that resolves when the artist statistics have been updated.
 */
export async function updateArtistStats(artistId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(DISTINCT ${schema.songsToArtists.songId})`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.songsToArtists)
    .innerJoin(schema.songs, eq(schema.songsToArtists.songId, schema.songs.id))
    .where(eq(schema.songsToArtists.artistId, artistId))
    .groupBy(schema.songsToArtists.artistId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.artists)
    .set({
      totalTracks,
      totalDuration
    })
    .where(eq(schema.artists.id, artistId))
}

/**
 * Updates artist statistics for affected artists when a song's artist associations change.
 *
 * This function takes arrays of `newArtistIds` and `oldArtistIds` (if any),
 * identifies all unique artist IDs that need their statistics recalculated,
 * and then calls `updateArtistStats` for each of them. This is typically used when
 * a song's artists are updated, or a song is added/deleted, affecting artist counts.
 *
 * @param newArtistIds - An array of artist IDs newly associated with the song. Defaults to an empty array.
 * @param oldArtistIds - An array of artist IDs previously associated with the song. Defaults to an empty array.
 * @returns A Promise that resolves when all affected artist statistics have been updated.
 */
export async function updateArtistStatsForSong(
  newArtistIds: number[] = [],
  oldArtistIds: number[] = []
): Promise<void> {
  const allAffectedArtistIds = [...new Set([...oldArtistIds, ...newArtistIds])]

  await Promise.all(allAffectedArtistIds.map((artistId) => updateArtistStats(artistId)))
}
