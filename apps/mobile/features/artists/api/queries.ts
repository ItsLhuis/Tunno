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

/**
 * Retrieves a paginated list of artists based on provided query parameters, order, and filters.
 *
 * This function handles cursor-based pagination, allowing for efficient fetching
 * of large datasets. It also applies various filters and sorting options.
 *
 * @param params - An object containing query parameters, including:
 *   - `limit`: The maximum number of items to return per page (defaults to `PAGE_SIZE`).
 *   - `cursor`: An optional cursor string for pagination (used to fetch the next/previous page).
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the artists (e.g., search, isFavorite).
 * @returns A Promise that resolves to a `PaginatedResponse` object containing
 *          an array of `Artist` items, `nextCursor`, `prevCursor`,
 *          `hasNextPage`, and `hasPrevPage`.
 */
export async function getArtistsPaginated({
  limit = PAGE_SIZE,
  cursor,
  orderBy,
  filters
}: QueryArtistParams): Promise<PaginatedResponse<Artist>> {
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

/**
 * Retrieves a list of all artists, optionally applying a limit, order-by clause, and filters.
 *
 * @param params - Optional query parameters including `limit`, `orderBy`, and `filters`.
 *   - `limit`: The maximum number of artists to return.
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the artists (e.g., search, isFavorite).
 * @returns A Promise that resolves to an array of `Artist` objects.
 */
export async function getAllArtists({ limit, orderBy, filters }: QueryArtistParams = {}): Promise<
  Artist[]
> {
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

/**
 * Retrieves a single artist from the database by its ID without any relations.
 *
 * @param id - The ID of the artist to retrieve.
 * @returns A Promise that resolves to the `Artist` object if found, otherwise `null`.
 */
export async function getArtistById(id: number): Promise<Artist | null> {
  const artist = await database.query.artists.findFirst({
    where: eq(schema.artists.id, id)
  })

  return artist || null
}

/**
 * Retrieves a single artist from the database by its ID, including all its relations
 * (songs, albums, stats).
 *
 * @param id - The ID of the artist to retrieve.
 * @returns A Promise that resolves to the `ArtistWithAllRelations` object.
 * @throws Error if the artist is not found.
 */
export async function getArtistByIdWithAllRelations(id: number): Promise<ArtistWithAllRelations> {
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

  if (!artist) {
    throw new Error(`Artist with id ${id} not found`)
  }

  return artist
}

/**
 * Retrieves a single artist from the database by its ID, including its associated songs.
 *
 * @param id - The ID of the artist to retrieve.
 * @returns A Promise that resolves to the `ArtistWithSongs` object.
 * @throws Error if the artist is not found.
 */
export async function getArtistByIdWithSongs(id: number): Promise<ArtistWithSongs> {
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

  if (!artist) {
    throw new Error(`Artist with id ${id} not found`)
  }

  return artist
}

/**
 * Retrieves a list of all artist IDs, optionally filtered and ordered.
 *
 * This function is used to fetch just the IDs of artists based on various criteria,
 * without fetching their full details or relations.
 *
 * @param params - An optional object containing `orderBy` and `filters` for the query.
 *   - `orderBy`: Specifies the column and direction for sorting.
 *   - `filters`: An object containing various criteria to filter the artist IDs (e.g., search, isFavorite).
 * @returns A Promise that resolves to an array of artist IDs.
 */
export async function getArtistIdsOnly(params?: QueryArtistParams): Promise<number[]> {
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

/**
 * Retrieves a list of song IDs that are associated with a specific artist.
 *
 * @param id - The ID of the artist for which to retrieve song IDs.
 * @returns A Promise that resolves to an array of song IDs.
 */
export async function getSongIdsByArtistId(id: number): Promise<number[]> {
  const result = await database
    .select({ songId: schema.songsToArtists.songId })
    .from(schema.songsToArtists)
    .where(eq(schema.songsToArtists.artistId, id))

  return result.map((row) => row.songId)
}

/**
 * Constructs an array of Drizzle ORM `where` conditions based on the provided artist filters.
 *
 * This helper function dynamically builds database query conditions for filtering artists
 * by various properties such as search term, favorite status, play count range,
 * last played date range, total tracks range, and total duration range.
 *
 * @param filters - An optional object containing various filtering criteria for artists.
 * @returns An array of Drizzle ORM `SQL` or `Column` conditions to be used in a `where` clause.
 */
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
