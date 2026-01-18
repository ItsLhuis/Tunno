import { database, schema } from "@database/client"

import { and, asc, desc, eq, exists, gte, inArray, like, lte, sql } from "drizzle-orm"

import { buildCursorCondition, type CursorValue, getOrderByFromColumn } from "@repo/database"

import { decodeCursor, encodeCursor } from "@database/helpers"

import {
  type Album,
  type AlbumWithAllRelations,
  type AlbumWithArtists,
  type AlbumWithMainRelations,
  type AlbumWithSongsAndArtists,
  PAGE_SIZE,
  type PaginatedResponse,
  type QueryAlbumParams
} from "@repo/api"

/**
 * Retrieves a list of albums filtered by a set of artist IDs, including their main relations (songs and artists).
 *
 * This function queries the database for albums that are associated with any of the provided
 * `artistIds`, applying additional filtering and ordering as specified in `params`.
 * Each returned album object will include its associated songs and artists.
 *
 * @param artistIds - An array of artist IDs to filter the albums by.
 * @param params - Optional query parameters including `limit`, `orderBy`, and `filters`.
 * @returns A Promise that resolves to an array of `AlbumWithMainRelations` objects.
 */
export async function getAlbumsFilteredByArtistsWithMainRelations(
  artistIds: number[],
  params: QueryAlbumParams = {}
): Promise<AlbumWithMainRelations[]> {
  const { limit, orderBy, filters } = params
  return await database.query.albums.findMany({
    limit,
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
      : undefined,
    with: {
      songs: true,
      artists: {
        with: {
          artist: true
        }
      }
    }
  })
}

/**
 * Retrieves a list of albums filtered by a set of artist IDs, including their associated artists.
 *
 * This function queries the database for albums that are associated with any of the provided
 * `artistIds`, applying additional filtering and ordering as specified in `params`.
 * Each returned album object will include its associated artists.
 *
 * @param artistIds - An array of artist IDs to filter the albums by.
 * @param params - Optional query parameters including `limit`, `orderBy`, and `filters`.
 * @returns A Promise that resolves to an array of `AlbumWithArtists` objects.
 */
export async function getAlbumsFilteredByArtistsWithArtists(
  artistIds: number[],
  params: QueryAlbumParams = {}
): Promise<AlbumWithArtists[]> {
  const { limit, orderBy, filters } = params
  return await database.query.albums.findMany({
    limit,
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
      : undefined,
    with: {
      artists: {
        with: {
          artist: true
        }
      }
    }
  })
}

/**
 * Retrieves a paginated list of albums based on provided query parameters, order, and filters.
 *
 * This function handles cursor-based pagination, allowing for efficient fetching
 * of large datasets. It also applies various filters and sorting options.
 *
 * @param params - An object containing query parameters, including:
 *   - `limit`: The maximum number of items to return per page (defaults to `PAGE_SIZE`).
 *   - `cursor`: An optional cursor string for pagination (used to fetch the next/previous page).
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the albums (e.g., search, isFavorite, releaseYear).
 * @returns A Promise that resolves to a `PaginatedResponse` object containing
 *          an array of `Album` items, `nextCursor`, `prevCursor`,
 *          `hasNextPage`, and `hasPrevPage`.
 */
export async function getAlbumsPaginated({
  limit = PAGE_SIZE,
  cursor,
  orderBy,
  filters
}: QueryAlbumParams): Promise<PaginatedResponse<Album>> {
  const whereConditions = buildWhereConditions(filters)
  const orderColumn = orderBy?.column || "createdAt"
  const orderDirection = orderBy?.direction || "desc"

  const cursorValues = cursor ? decodeCursor(cursor) : []
  const cursorCondition =
    cursorValues.length > 0
      ? buildCursorCondition({
          cursorValues,
          columns: [schema.albums[orderColumn], schema.albums.id],
          direction: orderDirection
        })
      : undefined

  const allConditions = [
    ...(whereConditions.length > 0 ? [and(...whereConditions)] : []),
    ...(cursorCondition ? [cursorCondition] : [])
  ].filter(Boolean)

  const albums = await database.query.albums.findMany({
    limit: limit + 1,
    where: allConditions.length > 0 ? and(...allConditions) : undefined,
    orderBy: [
      getOrderByFromColumn(schema.albums[orderColumn], orderDirection),
      asc(schema.albums.id)
    ]
  })

  const hasNextPage = albums.length > limit
  const items = hasNextPage ? albums.slice(0, limit) : albums

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
 * Retrieves a list of all albums, optionally applying a limit, order-by clause, and filters.
 *
 * @param params - Optional query parameters including `limit`, `orderBy`, and `filters`.
 *   - `limit`: The maximum number of albums to return.
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the albums (e.g., search, isFavorite, releaseYear).
 * @returns A Promise that resolves to an array of `Album` objects.
 */
export async function getAllAlbums({ limit, orderBy, filters }: QueryAlbumParams = {}): Promise<
  Album[]
> {
  const whereConditions = buildWhereConditions(filters)

  const albums = await database.query.albums.findMany({
    limit,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.albums[orderBy.column])
        : desc(schema.albums[orderBy.column])
      : asc(schema.albums.name)
  })

  return albums
}

/**
 * Retrieves a single album from the database by its ID without any relations.
 *
 * @param id - The ID of the album to retrieve.
 * @returns A Promise that resolves to the `Album` object if found, otherwise `null`.
 */
export async function getAlbumById(id: number): Promise<Album | null> {
  const album = await database.query.albums.findFirst({
    where: eq(schema.albums.id, id)
  })

  return album || null
}

/**
 * Retrieves a single album from the database by its ID, including all its relations
 * (songs, artists, stats).
 *
 * @param id - The ID of the album to retrieve.
 * @returns A Promise that resolves to the `AlbumWithAllRelations` object.
 * @throws Error if the album is not found.
 */
export async function getAlbumByIdWithAllRelations(id: number): Promise<AlbumWithAllRelations> {
  const album = await database.query.albums.findFirst({
    where: eq(schema.albums.id, id),
    with: {
      songs: true,
      artists: {
        with: {
          artist: true
        }
      },
      stats: true
    }
  })

  if (!album) {
    throw new Error(`Album with id ${id} not found`)
  }

  return album
}

/**
 * Retrieves a single album from the database by its ID, including its associated artists.
 *
 * @param id - The ID of the album to retrieve.
 * @returns A Promise that resolves to the `AlbumWithArtists` object.
 * @throws Error if the album is not found.
 */
export async function getAlbumByIdWithArtists(id: number): Promise<AlbumWithArtists> {
  const album = await database.query.albums.findFirst({
    where: eq(schema.albums.id, id),
    with: {
      artists: {
        with: {
          artist: true
        }
      }
    }
  })

  if (!album) {
    throw new Error(`Album with id ${id} not found`)
  }

  return album
}

/**
 * Retrieves a single album from the database by its ID, including its associated songs and artists.
 *
 * @param id - The ID of the album to retrieve.
 * @returns A Promise that resolves to the `AlbumWithSongsAndArtists` object.
 * @throws Error if the album is not found.
 */
export async function getAlbumByIdWithSongsAndArtists(
  id: number
): Promise<AlbumWithSongsAndArtists> {
  const album = await database.query.albums.findFirst({
    where: eq(schema.albums.id, id),
    with: {
      songs: true,
      artists: {
        with: {
          artist: true
        }
      }
    }
  })

  if (!album) {
    throw new Error(`Album with id ${id} not found`)
  }

  return album
}

/**
 * Retrieves a list of all album IDs, optionally filtered and ordered.
 *
 * This function is used to fetch just the IDs of albums based on various criteria,
 * without fetching their full details or relations.
 *
 * @param params - An optional object containing `orderBy` and `filters` for the query.
 *   - `orderBy`: Specifies the column and direction for sorting.
 *   - `filters`: An object containing various criteria to filter the album IDs (e.g., search, isFavorite, releaseYear).
 * @returns A Promise that resolves to an array of album IDs.
 */
export async function getAlbumIdsOnly(params?: QueryAlbumParams): Promise<number[]> {
  const whereConditions = buildWhereConditions(params?.filters)

  const baseQuery = database.select({ id: schema.albums.id }).from(schema.albums)

  const whereQuery =
    whereConditions.length > 0 ? baseQuery.where(and(...whereConditions)) : baseQuery

  const finalQuery = params?.orderBy
    ? whereQuery.orderBy(
        params.orderBy.direction === "asc"
          ? asc(schema.albums[params.orderBy.column])
          : desc(schema.albums[params.orderBy.column])
      )
    : whereQuery.orderBy(asc(schema.albums.name))

  const albums = await finalQuery

  return albums.map((row) => row.id)
}

/**
 * Retrieves a list of song IDs that belong to a specific album.
 *
 * @param id - The ID of the album for which to retrieve song IDs.
 * @returns A Promise that resolves to an array of song IDs.
 */
export async function getSongIdsByAlbumId(id: number): Promise<number[]> {
  const result = await database
    .select({ songId: schema.songs.id })
    .from(schema.songs)
    .where(eq(schema.songs.albumId, id))

  return result.map((row) => row.songId)
}

/**
 * Constructs an array of Drizzle ORM `where` conditions based on the provided album filters.
 *
 * This helper function dynamically builds database query conditions for filtering albums
 * by various properties such as search term, favorite status, album type, release year,
 * play count range, last played date range, total tracks range, and total duration range.
 *
 * @param filters - An optional object containing various filtering criteria for albums.
 * @returns An array of Drizzle ORM `SQL` or `Column` conditions to be used in a `where` clause.
 */
function buildWhereConditions(filters?: QueryAlbumParams["filters"]) {
  const whereConditions = []

  if (filters) {
    if (filters.search) {
      whereConditions.push(like(schema.albums.name, `%${filters.search}%`))
    }

    if (filters.isFavorite !== undefined) {
      whereConditions.push(eq(schema.albums.isFavorite, filters.isFavorite))
    }

    if (filters.albumType) {
      if (Array.isArray(filters.albumType)) {
        whereConditions.push(sql`${schema.albums.albumType} IN (${filters.albumType.join(",")})`)
      } else {
        whereConditions.push(eq(schema.albums.albumType, filters.albumType))
      }
    }

    if (filters.releaseYear) {
      if (Array.isArray(filters.releaseYear)) {
        whereConditions.push(
          sql`${schema.albums.releaseYear} IN (${filters.releaseYear.join(",")})`
        )
      } else {
        whereConditions.push(eq(schema.albums.releaseYear, filters.releaseYear))
      }
    }

    if (filters.minPlayCount !== undefined || filters.maxPlayCount !== undefined) {
      const playCountConditions = []
      if (filters.minPlayCount !== undefined) {
        playCountConditions.push(gte(schema.albums.playCount, filters.minPlayCount))
      }
      if (filters.maxPlayCount !== undefined) {
        playCountConditions.push(lte(schema.albums.playCount, filters.maxPlayCount))
      }
      whereConditions.push(and(...playCountConditions))
    }

    if (filters.playedAfter !== undefined) {
      whereConditions.push(gte(schema.albums.lastPlayedAt, filters.playedAfter))
    }

    if (filters.playedBefore !== undefined) {
      whereConditions.push(lte(schema.albums.lastPlayedAt, filters.playedBefore))
    }

    if (filters.minTotalTracks !== undefined || filters.maxTotalTracks !== undefined) {
      const totalTracksConditions = []
      if (filters.minTotalTracks !== undefined) {
        totalTracksConditions.push(gte(schema.albums.totalTracks, filters.minTotalTracks))
      }
      if (filters.maxTotalTracks !== undefined) {
        totalTracksConditions.push(lte(schema.albums.totalTracks, filters.maxTotalTracks))
      }
      whereConditions.push(and(...totalTracksConditions))
    }

    if (filters.minTotalDuration !== undefined || filters.maxTotalDuration !== undefined) {
      const totalDurationConditions = []
      if (filters.minTotalDuration !== undefined) {
        totalDurationConditions.push(gte(schema.albums.totalDuration, filters.minTotalDuration))
      }
      if (filters.maxTotalDuration !== undefined) {
        totalDurationConditions.push(lte(schema.albums.totalDuration, filters.maxTotalDuration))
      }
      whereConditions.push(and(...totalDurationConditions))
    }
  }

  return whereConditions
}
