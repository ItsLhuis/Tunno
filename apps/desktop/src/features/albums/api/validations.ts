import { database, schema } from "@database/client"

import { and, eq, ne } from "drizzle-orm"

/**
 * Checks if a duplicate album exists with the same name, type, and artists.
 *
 * An album is considered a duplicate if it has:
 * - The same name (case-sensitive)
 * - The same albumType (single/album/compilation)
 * - The exact same set of artists (regardless of order)
 *
 * This allows different artists to have albums with the same name and type,
 * while preventing the same artist(s) from having duplicate albums.
 *
 * @param name - The album name to check.
 * @param albumType - The album type to check.
 * @param artistIds - The array of artist IDs to check against.
 * @param excludeId - (Optional) Album ID to exclude from the check (used for updates).
 * @returns A Promise that resolves to `true` if a duplicate album exists, `false` otherwise.
 */
export async function checkDuplicateAlbum(
  name: string,
  albumType: "single" | "album" | "compilation",
  artistIds: number[],
  excludeId?: number
): Promise<boolean> {
  const baseCondition = and(eq(schema.albums.name, name), eq(schema.albums.albumType, albumType))

  const whereCondition = excludeId
    ? and(baseCondition, ne(schema.albums.id, excludeId))
    : baseCondition

  const candidates = await database
    .select({ id: schema.albums.id })
    .from(schema.albums)
    .where(whereCondition)

  if (candidates.length === 0) return false

  const sortedNewArtists = [...artistIds].sort((a, b) => a - b)

  for (const candidate of candidates) {
    const existingArtists = await database
      .select({ artistId: schema.albumsToArtists.artistId })
      .from(schema.albumsToArtists)
      .where(eq(schema.albumsToArtists.albumId, candidate.id))
      .orderBy(schema.albumsToArtists.artistId)

    const sortedExistingArtists = existingArtists.map((a) => a.artistId)

    if (
      sortedNewArtists.length === sortedExistingArtists.length &&
      sortedNewArtists.every((id, idx) => id === sortedExistingArtists[idx])
    ) {
      return true
    }
  }

  return false
}
