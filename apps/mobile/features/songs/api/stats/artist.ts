import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

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

export async function updateArtistStatsForSong(
  newArtistIds: number[] = [],
  oldArtistIds: number[] = []
): Promise<void> {
  const allAffectedArtistIds = [...new Set([...oldArtistIds, ...newArtistIds])]

  await Promise.all(allAffectedArtistIds.map((artistId) => updateArtistStats(artistId)))
}
