import { database, schema } from "@database/client"

import { and, asc, desc, eq, exists, inArray, like } from "drizzle-orm"

import { type Album, type QueryAlbumParams } from "@repo/api"

export const getAlbumsFilteredByArtists = async (
  artistIds: number[],
  params: QueryAlbumParams = {}
): Promise<Album[]> => {
  const { limit, offset, orderBy, filters } = params

  return await database.query.albums.findMany({
    limit,
    offset,
    where: and(
      exists(
        database
          .select()
          .from(schema.albumsToArtists)
          .where(
            and(
              eq(schema.albumsToArtists.albumId, schema.albums.id),
              inArray(schema.albumsToArtists.artistId, artistIds)
            )
          )
      ),
      filters?.search ? like(schema.albums.name, `%${filters.search}%`) : undefined
    ),
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.albums[orderBy.column])
        : desc(schema.albums[orderBy.column])
      : asc(schema.albums.name)
  })
}
