import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, like, lte } from "drizzle-orm"

import { buildCursorCondition, type CursorValue, getOrderByFromColumn } from "@repo/database"

import { decodeCursor, encodeCursor } from "@database/helpers"

import {
  type Artist,
  type ArtistWithAllRelations,
  type ArtistWithSongs,
  PAGE_SIZE,
  type PaginatedResponse,
  type QueryArtistParams
} from "@repo/api"

export const getArtistsPaginated = async ({
  limit = PAGE_SIZE,
  cursor,
  orderBy,
  filters
}: QueryArtistParams): Promise<PaginatedResponse<Artist>> => {
  const whereConditions = buildWhereConditions(filters)
  const orderColumn = orderBy?.column || "createdAt"
  const orderDirection = orderBy?.direction || "desc"

  const cursorValues = cursor ? decodeCursor(cursor) : []
  const cursorCondition =
    cursorValues.length > 0
      ? buildCursorCondition({
          cursorValues,
          columns: [schema.artists[orderColumn], schema.artists.id],
          direction: orderDirection
        })
      : undefined

  const allConditions = [
    ...(whereConditions.length > 0 ? [and(...whereConditions)] : []),
    ...(cursorCondition ? [cursorCondition] : [])
  ].filter(Boolean)

  const artists = await database.query.artists.findMany({
    limit: limit + 1,
    where: allConditions.length > 0 ? and(...allConditions) : undefined,
    orderBy: [
      getOrderByFromColumn(schema.artists[orderColumn], orderDirection),
      asc(schema.artists.id)
    ]
  })

  const hasNextPage = artists.length > limit
  const items = hasNextPage ? artists.slice(0, limit) : artists

  const nextCursor =
    hasNextPage && items.length > 0
      ? encodeCursor([
          items[items.length - 1][orderColumn] as CursorValue,
          items[items.length - 1].id
        ])
      : undefined

  const prevCursor =
    items.length > 0 && cursor
      ? encodeCursor([items[0][orderColumn] as CursorValue, items[0].id])
      : undefined

  return {
    items,
    nextCursor,
    prevCursor,
    hasNextPage,
    hasPrevPage: !!cursor
  }
}

export const getAllArtists = async ({ limit, orderBy, filters }: QueryArtistParams = {}): Promise<
  Artist[]
> => {
  const whereConditions = buildWhereConditions(filters)

  const artists = await database.query.artists.findMany({
    limit,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.artists[orderBy.column])
        : desc(schema.artists[orderBy.column])
      : asc(schema.artists.name)
  })

  return artists
}

export const getArtistById = async (id: number): Promise<Artist | null> => {
  const artist = await database.query.artists.findFirst({
    where: eq(schema.artists.id, id)
  })

  return artist || null
}

export const getArtistByIdWithAllRelations = async (
  id: number
): Promise<ArtistWithAllRelations | undefined> => {
  const artist = await database.query.artists.findFirst({
    where: eq(schema.artists.id, id),
    with: {
      songs: {
        with: {
          song: true
        }
      },
      albums: {
        with: {
          album: true
        }
      },
      stats: true
    }
  })

  return artist
}

export const getArtistByIdWithSongs = async (id: number): Promise<ArtistWithSongs | undefined> => {
  const artist = await database.query.artists.findFirst({
    where: eq(schema.artists.id, id),
    with: {
      songs: {
        with: {
          song: true
        }
      }
    }
  })

  return artist
}

export const getArtistIdsOnly = async (params?: QueryArtistParams): Promise<number[]> => {
  const whereConditions = buildWhereConditions(params?.filters)

  const baseQuery = database.select({ id: schema.artists.id }).from(schema.artists)

  const whereQuery =
    whereConditions.length > 0 ? baseQuery.where(and(...whereConditions)) : baseQuery

  const finalQuery = params?.orderBy
    ? whereQuery.orderBy(
        params.orderBy.direction === "asc"
          ? asc(schema.artists[params.orderBy.column])
          : desc(schema.artists[params.orderBy.column])
      )
    : whereQuery.orderBy(asc(schema.artists.name))

  const artists = await finalQuery

  return artists.map((row) => row.id)
}

export const getSongIdsByArtistId = async (id: number): Promise<number[]> => {
  const result = await database
    .select({ songId: schema.songsToArtists.songId })
    .from(schema.songsToArtists)
    .where(eq(schema.songsToArtists.artistId, id))

  return result.map((row) => row.songId)
}

function buildWhereConditions(filters?: QueryArtistParams["filters"]) {
  const whereConditions = []

  if (filters) {
    if (filters.search) {
      whereConditions.push(like(schema.artists.name, `%${filters.search}%`))
    }

    if (filters.isFavorite !== undefined) {
      whereConditions.push(eq(schema.artists.isFavorite, filters.isFavorite))
    }

    if (filters.minPlayCount !== undefined || filters.maxPlayCount !== undefined) {
      const playCountConditions = []
      if (filters.minPlayCount !== undefined) {
        playCountConditions.push(gte(schema.artists.playCount, filters.minPlayCount))
      }
      if (filters.maxPlayCount !== undefined) {
        playCountConditions.push(lte(schema.artists.playCount, filters.maxPlayCount))
      }
      whereConditions.push(and(...playCountConditions))
    }

    if (filters.playedAfter !== undefined) {
      whereConditions.push(gte(schema.artists.lastPlayedAt, filters.playedAfter))
    }

    if (filters.playedBefore !== undefined) {
      whereConditions.push(lte(schema.artists.lastPlayedAt, filters.playedBefore))
    }

    if (filters.minTotalTracks !== undefined || filters.maxTotalTracks !== undefined) {
      const totalTracksConditions = []
      if (filters.minTotalTracks !== undefined) {
        totalTracksConditions.push(gte(schema.artists.totalTracks, filters.minTotalTracks))
      }
      if (filters.maxTotalTracks !== undefined) {
        totalTracksConditions.push(lte(schema.artists.totalTracks, filters.maxTotalTracks))
      }
      whereConditions.push(and(...totalTracksConditions))
    }

    if (filters.minTotalDuration !== undefined || filters.maxTotalDuration !== undefined) {
      const totalDurationConditions = []
      if (filters.minTotalDuration !== undefined) {
        totalDurationConditions.push(gte(schema.artists.totalDuration, filters.minTotalDuration))
      }
      if (filters.maxTotalDuration !== undefined) {
        totalDurationConditions.push(lte(schema.artists.totalDuration, filters.maxTotalDuration))
      }
      whereConditions.push(and(...totalDurationConditions))
    }
  }

  return whereConditions
}
