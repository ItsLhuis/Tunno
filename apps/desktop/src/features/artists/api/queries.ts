import { database, schema } from "@database/client"

import { asc, desc, like } from "drizzle-orm"

import { type Artist, type QueryArtistParams } from "@repo/api"

export const getAllArtists = async ({
  limit,
  offset,
  orderBy,
  filters
}: QueryArtistParams = {}): Promise<Artist[]> => {
  return await database.query.artists.findMany({
    limit,
    offset,
    where: filters?.search ? like(schema.artists.name, `%${filters.search}%`) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.artists[orderBy.column])
        : desc(schema.artists[orderBy.column])
      : asc(schema.artists.name)
  })
}
