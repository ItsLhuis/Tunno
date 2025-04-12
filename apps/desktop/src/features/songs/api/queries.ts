import { database, schema } from "@database/client"

import { and, asc, desc, eq, like, SQL } from "drizzle-orm"

import { LIMIT } from "@api/constants"

import { type PaginatedParams } from "@api/types"

import { type Song } from "@features/songs/api/types"

export type PaginatedSongsParams = PaginatedParams<keyof Song>

export const getAllSongs = async ({
  limit = LIMIT,
  offset = 0,
  orderBy,
  filters
}: PaginatedSongsParams = {}): Promise<Song[]> => {
  const orderClauses: SQL[] = orderBy
    ? [
        orderBy.direction === "asc"
          ? asc(schema.songs[orderBy.column])
          : desc(schema.songs[orderBy.column])
      ]
    : []

  const whereClauses = filters?.search ? like(schema.songs.name, `%${filters.search}%`) : undefined

  return await database
    .select()
    .from(schema.songs)
    .where(whereClauses ? and(whereClauses) : undefined)
    .orderBy(...orderClauses)
    .limit(limit)
    .offset(offset)
}

export const getSongById = async (id: number): Promise<Song | undefined> => {
  return await database
    .select()
    .from(schema.songs)
    .where(eq(schema.songs.id, id))
    .then((results) => results[0])
}
