import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, like, lte } from "drizzle-orm"

import { buildCursorCondition, type CursorValue, getOrderByFromColumn } from "@repo/database"

import { decodeCursor, encodeCursor } from "@database/helpers"

import {
  PAGE_SIZE,
  type PaginatedResponse,
  type Playlist,
  type PlaylistWithAllRelations,
  type PlaylistWithSongs,
  type QueryPlaylistParams
} from "@repo/api"

/**
 * Retrieves a paginated list of playlists based on provided query parameters, order, and filters.
 *
 * This function handles cursor-based pagination, allowing for efficient fetching
 * of large datasets. It also applies various filters and sorting options.
 *
 * @param params - An object containing query parameters, including:
 *   - `limit`: The maximum number of items to return per page (defaults to `PAGE_SIZE`).
 *   - `cursor`: An optional cursor string for pagination (used to fetch the next/previous page).
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the playlists (e.g., search, isFavorite).
 * @returns A Promise that resolves to a `PaginatedResponse` object containing
 *          an array of `Playlist` items, `nextCursor`, `prevCursor`,
 *          `hasNextPage`, and `hasPrevPage`.
 */
export async function getPlaylistsPaginated({
  limit = PAGE_SIZE,
  cursor,
  orderBy,
  filters
}: QueryPlaylistParams): Promise<PaginatedResponse<Playlist>> {
  const whereConditions = buildWhereConditions(filters)
  const orderColumn = orderBy?.column || "createdAt"
  const orderDirection = orderBy?.direction || "desc"

  const cursorValues = cursor ? decodeCursor(cursor) : []
  const cursorCondition =
    cursorValues.length > 0
      ? buildCursorCondition({
          cursorValues,
          columns: [schema.playlists[orderColumn], schema.playlists.id],
          direction: orderDirection
        })
      : undefined

  const allConditions = [
    ...(whereConditions.length > 0 ? [and(...whereConditions)] : []),
    ...(cursorCondition ? [cursorCondition] : [])
  ].filter(Boolean)

  const playlists = await database.query.playlists.findMany({
    limit: limit + 1,
    where: allConditions.length > 0 ? and(...allConditions) : undefined,
    orderBy: [
      getOrderByFromColumn(schema.playlists[orderColumn], orderDirection),
      asc(schema.playlists.id)
    ]
  })

  const hasNextPage = playlists.length > limit
  const items = hasNextPage ? playlists.slice(0, limit) : playlists

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
 * Retrieves a list of all playlists, optionally applying a limit, order-by clause, and filters.
 *
 * @param params - Optional query parameters including `limit`, `orderBy`, and `filters`.
 *   - `limit`: The maximum number of playlists to return.
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the playlists (e.g., search, isFavorite).
 * @returns A Promise that resolves to an array of `Playlist` objects.
 */
export async function getAllPlaylists({
  limit,
  orderBy,
  filters
}: QueryPlaylistParams = {}): Promise<Playlist[]> {
  const whereConditions = buildWhereConditions(filters)

  const playlists = await database.query.playlists.findMany({
    limit,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.playlists[orderBy.column])
        : desc(schema.playlists[orderBy.column])
      : asc(schema.playlists.name)
  })

  return playlists
}

/**
 * Retrieves a single playlist from the database by its ID without any relations.
 *
 * @param id - The ID of the playlist to retrieve.
 * @returns A Promise that resolves to the `Playlist` object if found, otherwise `null`.
 */
export async function getPlaylistById(id: number): Promise<Playlist | null> {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id)
  })

  return playlist || null
}

/**
 * Retrieves a single playlist from the database by its ID, including all its relations
 * (songs, stats).
 *
 * @param id - The ID of the playlist to retrieve.
 * @returns A Promise that resolves to the `PlaylistWithAllRelations` object.
 * @throws Error if the playlist is not found.
 */
export async function getPlaylistByIdWithAllRelations(
  id: number
): Promise<PlaylistWithAllRelations> {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id),
    with: {
      songs: {
        with: {
          song: true
        }
      },
      stats: true
    }
  })

  if (!playlist) {
    throw new Error(`Playlist with id ${id} not found`)
  }

  return playlist
}

/**
 * Retrieves a single playlist from the database by its ID, including its associated songs.
 *
 * @param id - The ID of the playlist to retrieve.
 * @returns A Promise that resolves to the `PlaylistWithSongs` object.
 * @throws Error if the playlist is not found.
 */
export async function getPlaylistByIdWithSongs(id: number): Promise<PlaylistWithSongs> {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id),
    with: {
      songs: {
        with: {
          song: true
        }
      }
    }
  })

  if (!playlist) {
    throw new Error(`Playlist with id ${id} not found`)
  }

  return playlist
}

/**
 * Retrieves a list of all playlist IDs, optionally filtered and ordered.
 *
 * This function is used to fetch just the IDs of playlists based on various criteria,
 * without fetching their full details or relations.
 *
 * @param params - An optional object containing `orderBy` and `filters` for the query.
 *   - `orderBy`: Specifies the column and direction for sorting.
 *   - `filters`: An object containing various criteria to filter the playlist IDs (e.g., search, isFavorite).
 * @returns A Promise that resolves to an array of playlist IDs.
 */
export async function getPlaylistIdsOnly(params?: QueryPlaylistParams): Promise<number[]> {
  const whereConditions = buildWhereConditions(params?.filters)

  const baseQuery = database.select({ id: schema.playlists.id }).from(schema.playlists)

  const whereQuery =
    whereConditions.length > 0 ? baseQuery.where(and(...whereConditions)) : baseQuery

  const finalQuery = params?.orderBy
    ? whereQuery.orderBy(
        params.orderBy.direction === "asc"
          ? asc(schema.playlists[params.orderBy.column])
          : desc(schema.playlists[params.orderBy.column])
      )
    : whereQuery.orderBy(asc(schema.playlists.name))

  const playlists = await finalQuery

  return playlists.map((row) => row.id)
}

export async function getSongIdsByPlaylistId(id: number): Promise<number[]> {
  const result = await database
    .select({ songId: schema.playlistsToSongs.songId })
    .from(schema.playlistsToSongs)
    .where(eq(schema.playlistsToSongs.playlistId, id))

  return result.map((row) => row.songId)
}

function buildWhereConditions(filters?: QueryPlaylistParams["filters"]) {
  const whereConditions = []

  if (filters) {
    if (filters.search) {
      whereConditions.push(like(schema.playlists.name, `%${filters.search}%`))
    }

    if (filters.isFavorite !== undefined) {
      whereConditions.push(eq(schema.playlists.isFavorite, filters.isFavorite))
    }

    if (filters.minPlayCount !== undefined || filters.maxPlayCount !== undefined) {
      const playCountConditions = []
      if (filters.minPlayCount !== undefined) {
        playCountConditions.push(gte(schema.playlists.playCount, filters.minPlayCount))
      }
      if (filters.maxPlayCount !== undefined) {
        playCountConditions.push(lte(schema.playlists.playCount, filters.maxPlayCount))
      }
      whereConditions.push(and(...playCountConditions))
    }

    if (filters.minTotalTracks !== undefined || filters.maxTotalTracks !== undefined) {
      const totalTracksConditions = []
      if (filters.minTotalTracks !== undefined) {
        totalTracksConditions.push(gte(schema.playlists.totalTracks, filters.minTotalTracks))
      }
      if (filters.maxTotalTracks !== undefined) {
        totalTracksConditions.push(lte(schema.playlists.totalTracks, filters.maxTotalTracks))
      }
      whereConditions.push(and(...totalTracksConditions))
    }

    if (filters.minTotalDuration !== undefined || filters.maxTotalDuration !== undefined) {
      const totalDurationConditions = []
      if (filters.minTotalDuration !== undefined) {
        totalDurationConditions.push(gte(schema.playlists.totalDuration, filters.minTotalDuration))
      }
      if (filters.maxTotalDuration !== undefined) {
        totalDurationConditions.push(lte(schema.playlists.totalDuration, filters.maxTotalDuration))
      }
      whereConditions.push(and(...totalDurationConditions))
    }

    if (filters.playedAfter !== undefined) {
      whereConditions.push(gte(schema.playlists.lastPlayedAt, filters.playedAfter))
    }

    if (filters.playedBefore !== undefined) {
      whereConditions.push(lte(schema.playlists.lastPlayedAt, filters.playedBefore))
    }
  }

  return whereConditions
}
