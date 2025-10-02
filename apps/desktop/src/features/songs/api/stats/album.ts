import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

export const updateAlbumStats = async (albumId: number): Promise<void> => {
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

export const updateAlbumStatsForSong = async (
  newAlbumId?: number | null,
  oldAlbumId?: number | null
): Promise<void> => {
  const affectedAlbumIds = [
    ...(oldAlbumId ? [oldAlbumId] : []),
    ...(newAlbumId ? [newAlbumId] : [])
  ].filter((id, index, arr) => arr.indexOf(id) === index)

  await Promise.all(affectedAlbumIds.map((albumId) => updateAlbumStats(albumId)))
}
