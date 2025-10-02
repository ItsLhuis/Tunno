import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

export const updatePlaylistStats = async (playlistId: number): Promise<void> => {
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

export const updatePlaylistStatsForSong = async (
  newPlaylistIds: number[] = [],
  oldPlaylistIds: number[] = []
): Promise<void> => {
  const allAffectedPlaylistIds = [...new Set([...oldPlaylistIds, ...newPlaylistIds])]

  await Promise.all(allAffectedPlaylistIds.map((playlistId) => updatePlaylistStats(playlistId)))
}
