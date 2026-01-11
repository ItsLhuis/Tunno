import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

/**
 * Recalculates and updates the total tracks and total duration for a given playlist.
 *
 * This function queries the database to count all songs associated with the `playlistId`
 * and sums their durations. It then updates the corresponding `totalTracks` and
 * `totalDuration` fields in the `playlists` table.
 *
 * @param playlistId - The ID of the playlist whose statistics need to be updated.
 * @returns A Promise that resolves when the playlist statistics have been updated.
 */
export async function updatePlaylistStats(playlistId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(*)`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.playlistsToSongs)
    .innerJoin(schema.songs, eq(schema.playlistsToSongs.songId, schema.songs.id))
    .where(eq(schema.playlistsToSongs.playlistId, playlistId))
    .groupBy(schema.playlistsToSongs.playlistId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.playlists)
    .set({
      totalTracks,
      totalDuration
    })
    .where(eq(schema.playlists.id, playlistId))
}

/**
 * Updates playlist statistics for affected playlists when a song's playlist associations change.
 *
 * This function takes arrays of `newPlaylistIds` and `oldPlaylistIds` (if any),
 * identifies all unique playlist IDs that need their statistics recalculated,
 * and then calls `updatePlaylistStats` for each of them. This is typically used when
 * a song is added to or removed from a playlist, affecting playlist counts.
 *
 * @param newPlaylistIds - An array of playlist IDs newly associated with the song. Defaults to an empty array.
 * @param oldPlaylistIds - An array of playlist IDs previously associated with the song. Defaults to an empty array.
 * @returns A Promise that resolves when all affected playlist statistics have been updated.
 */
export async function updatePlaylistStatsForSong(
  newPlaylistIds: number[] = [],
  oldPlaylistIds: number[] = []
): Promise<void> {
  const allAffectedPlaylistIds = [...new Set([...oldPlaylistIds, ...newPlaylistIds])]

  await Promise.all(allAffectedPlaylistIds.map((playlistId) => updatePlaylistStats(playlistId)))
}
