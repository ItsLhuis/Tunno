import { database, schema } from "@database/client"

import { and, eq, exists, inArray, isNotNull } from "drizzle-orm"

/**
 * Checks the integrity between an album and a set of artists.
 *
 * This function determines if there's an existing song in the database that belongs
 * to the given `albumId` and is also associated with any of the provided `artistIds`.
 * This is typically used to ensure that songs are not being assigned to an album
 * whose artists do not include the song's artists.
 *
 * @param albumId - The ID of the album to check against.
 * @param artistIds - An array of artist IDs to check for association with songs in the album.
 * @returns A Promise that resolves to `true` if a conflicting song is found (i.e., a song in the album
 *          also associated with one of the artists), `false` otherwise. Returns `false` immediately
 *          if `artistIds` is empty.
 */
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

/**
 * Checks if an artist can be safely deleted without breaking song-album-artist relationships.
 *
 * This function determines if there's any song in the database that:
 * 1. Is associated with the given `artistId`.
 * 2. Belongs to an album.
 * 3. The album itself is also associated with the same `artistId`.
 * If such a song exists, deleting the artist would leave a song associated with an album
 * that no longer has a linked artist, potentially leading to data inconsistency.
 *
 * @param artistId - The ID of the artist to check for deletion integrity.
 * @returns A Promise that resolves to `true` if a conflicting song (as described above) is found,
 *          indicating the artist cannot be safely deleted without further action; `false` otherwise.
 */
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
