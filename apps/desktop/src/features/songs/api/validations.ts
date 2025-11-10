import { database, schema } from "@database/client"

import { and, eq, exists, inArray, isNotNull } from "drizzle-orm"

export async function checkAlbumArtistIntegrity(
  albumId: number,
  artistIds: number[]
): Promise<boolean> {
  if (artistIds.length === 0) return false

  const conflictingSong = await database
    .select({ id: schema.songs.id })
    .from(schema.songs)
    .where(
      and(
        eq(schema.songs.albumId, albumId),
        isNotNull(schema.songs.albumId),
        exists(
          database
            .select()
            .from(schema.songsToArtists)
            .where(
              and(
                eq(schema.songsToArtists.songId, schema.songs.id),
                inArray(schema.songsToArtists.artistId, artistIds)
              )
            )
        )
      )
    )
    .limit(1)

  return conflictingSong.length > 0
}

export async function checkArtistDeletionIntegrity(artistId: number): Promise<boolean> {
  const conflictingSong = await database
    .select({ id: schema.songs.id })
    .from(schema.songs)
    .where(
      and(
        isNotNull(schema.songs.albumId),
        exists(
          database
            .select()
            .from(schema.songsToArtists)
            .where(
              and(
                eq(schema.songsToArtists.songId, schema.songs.id),
                eq(schema.songsToArtists.artistId, artistId)
              )
            )
        ),
        exists(
          database
            .select()
            .from(schema.albumsToArtists)
            .where(
              and(
                eq(schema.albumsToArtists.albumId, schema.songs.albumId),
                eq(schema.albumsToArtists.artistId, artistId)
              )
            )
        )
      )
    )
    .limit(1)

  return conflictingSong.length > 0
}
