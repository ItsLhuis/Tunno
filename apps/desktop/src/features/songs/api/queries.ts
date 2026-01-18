import { database, schema } from "@database/client"

import {
  and,
  asc,
  desc,
  eq,
  gte,
  inArray,
  isNotNull,
  isNull,
  like,
  lte,
  ne,
  or,
  sql
} from "drizzle-orm"

import { buildCursorCondition, type CursorValue, getOrderByFromColumn } from "@repo/database"

import { decodeCursor, encodeCursor } from "@database/helpers"

import {
  PAGE_SIZE,
  type PaginatedResponse,
  type QuerySongsParams,
  type Song,
  type SongWithAllRelations,
  type SongWithMainRelations
} from "@repo/api"

/**
 * Retrieves a paginated list of songs, including their main relations (album and artists),
 * based on provided query parameters, order, and filters.
 *
 * This function handles cursor-based pagination, allowing for efficient fetching
 * of large datasets. It also applies various filters and sorting options.
 *
 * @param params - An object containing query parameters, including:
 *   - `limit`: The maximum number of items to return per page (defaults to `PAGE_SIZE`).
 *   - `cursor`: An optional cursor string for pagination (used to fetch the next/previous page).
 *   - `orderBy`: An object specifying the column to order by and the direction ('asc' or 'desc').
 *   - `filters`: An object containing various criteria to filter the songs (e.g., search, isFavorite, releaseYear).
 * @returns A Promise that resolves to a `PaginatedResponse` object containing
 *          an array of `SongWithMainRelations` items, `nextCursor`, `prevCursor`,
 *          `hasNextPage`, and `hasPrevPage`.
 */
export async function getSongsWithMainRelationsPaginated({
  limit = PAGE_SIZE,
  cursor,
  orderBy,
  filters
}: QuerySongsParams): Promise<PaginatedResponse<SongWithMainRelations>> {
  const whereConditions = buildWhereConditions(filters)
  const orderColumn = orderBy?.column || "createdAt"
  const orderDirection = orderBy?.direction || "desc"

  const cursorValues = cursor ? decodeCursor(cursor) : []
  const cursorCondition =
    cursorValues.length > 0
      ? buildCursorCondition({
          cursorValues,
          columns: [schema.songs[orderColumn], schema.songs.id],
          direction: orderDirection
        })
      : undefined

  const allConditions = [
    ...(whereConditions.length > 0 ? [and(...whereConditions)] : []),
    ...(cursorCondition ? [cursorCondition] : [])
  ].filter(Boolean)

  const songs = await database.query.songs.findMany({
    limit: limit + 1,
    where: allConditions.length > 0 ? and(...allConditions) : undefined,
    orderBy: [
      getOrderByFromColumn(schema.songs[orderColumn], orderDirection),
      asc(schema.songs.id)
    ],
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        },
        orderBy: asc(schema.songsToArtists.artistOrder)
      }
    }
  })

  const hasNextPage = songs.length > limit
  const items = hasNextPage ? songs.slice(0, limit) : songs

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
 * Retrieves a single song from the database by its ID without any relations.
 *
 * @param id - The ID of the song to retrieve.
 * @returns A Promise that resolves to the `Song` object if found, otherwise `null`.
 */
export async function getSongById(id: number): Promise<Song | null> {
  const song = await database.query.songs.findFirst({
    where: eq(schema.songs.id, id)
  })

  return song || null
}

/**
 * Retrieves a single song from the database by its ID, including its main relations (album and artists).
 *
 * @param id - The ID of the song to retrieve.
 * @returns A Promise that resolves to the `SongWithMainRelations` object.
 * @throws Error if the song is not found.
 */
export async function getSongByIdWithMainRelations(id: number): Promise<SongWithMainRelations> {
  const song = await database.query.songs.findFirst({
    where: eq(schema.songs.id, id),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        },
        orderBy: asc(schema.songsToArtists.artistOrder)
      }
    }
  })

  if (!song) {
    throw new Error(`Song with id ${id} not found`)
  }

  return song
}

/**
 * Retrieves a single song from the database by its ID, including all its relations
 * (album, artists, playlists, stats, playHistory).
 *
 * @param id - The ID of the song to retrieve.
 * @returns A Promise that resolves to the `SongWithAllRelations` object.
 * @throws Error if the song is not found.
 */
export async function getSongByIdWithAllRelations(id: number): Promise<SongWithAllRelations> {
  const song = await database.query.songs.findFirst({
    where: eq(schema.songs.id, id),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        },
        orderBy: asc(schema.songsToArtists.artistOrder)
      },
      playlists: {
        with: {
          playlist: true
        }
      },
      stats: true,
      playHistory: true
    }
  })

  if (!song) {
    throw new Error(`Song with id ${id} not found`)
  }

  return song
}

/**
 * Retrieves multiple songs from the database by their IDs, including their main relations (album and artists).
 *
 * @param ids - An array of song IDs to retrieve.
 * @returns A Promise that resolves to an array of `SongWithMainRelations` objects. Returns an empty array if `ids` is empty.
 */
export async function getSongsByIdsWithMainRelations(
  ids: number[]
): Promise<SongWithMainRelations[]> {
  if (ids.length === 0) return []

  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, ids),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        },
        orderBy: asc(schema.songsToArtists.artistOrder)
      }
    }
  })

  return songs
}

/**
 * Retrieves a list of song IDs associated with specific playlist IDs.
 *
 * @param playlistIds - An array of playlist IDs for which to find associated song IDs.
 * @returns A Promise that resolves to an array of song IDs. Returns an empty array if `playlistIds` is empty.
 */
export async function getSongIdsByPlaylistIds(playlistIds: number[]): Promise<number[]> {
  if (playlistIds.length === 0) return []

  const result = await database
    .select({ songId: schema.playlistsToSongs.songId })
    .from(schema.playlistsToSongs)
    .where(inArray(schema.playlistsToSongs.playlistId, playlistIds))

  return result.map((row) => row.songId)
}

/**
 * Retrieves a list of song IDs associated with specific artist IDs.
 *
 * @param artistIds - An array of artist IDs for which to find associated song IDs.
 * @returns A Promise that resolves to an array of song IDs. Returns an empty array if `artistIds` is empty.
 */
export async function getSongIdsByArtistIds(artistIds: number[]): Promise<number[]> {
  if (artistIds.length === 0) return []

  const result = await database
    .select({ songId: schema.songsToArtists.songId })
    .from(schema.songsToArtists)
    .where(inArray(schema.songsToArtists.artistId, artistIds))

  return result.map((row) => row.songId)
}

/**
 * Retrieves a list of song IDs associated with specific album IDs.
 *
 * @param albumIds - An array of album IDs for which to find associated song IDs.
 * @returns A Promise that resolves to an array of song IDs. Returns an empty array if `albumIds` is empty.
 */
export async function getSongIdsByAlbumIds(albumIds: number[]): Promise<number[]> {
  if (albumIds.length === 0) return []

  const result = await database
    .select({ songId: schema.songs.id })
    .from(schema.songs)
    .where(inArray(schema.songs.albumId, albumIds))

  return result.map((row) => row.songId)
}

/**
 * Retrieves a list of all song IDs, optionally filtered and ordered.
 *
 * This function is used to fetch just the IDs of songs based on various criteria,
 * without fetching their full details or relations.
 *
 * @param params - An object containing optional `orderBy` and `filters` for the query.
 *   - `orderBy`: Specifies the column and direction for sorting.
 *   - `filters`: An object containing various criteria to filter the song IDs (e.g., search, isFavorite, releaseYear).
 * @returns A Promise that resolves to an array of song IDs.
 */
export async function getSongIdsOnly({ orderBy, filters }: QuerySongsParams): Promise<number[]> {
  const whereConditions = buildWhereConditions(filters)

  const baseQuery = database.select({ id: schema.songs.id }).from(schema.songs)

  const whereQuery =
    whereConditions.length > 0 ? baseQuery.where(and(...whereConditions)) : baseQuery

  const finalQuery = orderBy
    ? whereQuery.orderBy(
        orderBy.direction === "asc"
          ? asc(schema.songs[orderBy.column])
          : desc(schema.songs[orderBy.column])
      )
    : whereQuery

  const songs = await finalQuery

  return songs.map((row) => row.id)
}

/**
 * Constructs an array of Drizzle ORM `where` conditions based on the provided song filters.
 *
 * This helper function dynamically builds database query conditions for filtering songs
 * by various properties such as search term, favorite status, release year, album ID,
 * presence of lyrics, duration range, play count range, and last played date range.
 *
 * @param filters - An optional object containing various filtering criteria for songs.
 * @returns An array of Drizzle ORM `SQL` or `Column` conditions to be used in a `where` clause.
 */
function buildWhereConditions(filters?: QuerySongsParams["filters"]) {
  const whereConditions = []

  if (filters) {
    if (filters.search) {
      whereConditions.push(like(schema.songs.name, `%${filters.search}%`))
    }

    if (filters.isFavorite !== undefined) {
      whereConditions.push(eq(schema.songs.isFavorite, filters.isFavorite))
    }

    if (filters.releaseYear !== undefined) {
      if (Array.isArray(filters.releaseYear)) {
        const validYears = filters.releaseYear.filter((year) => year !== null) as number[]
        if (validYears.length > 0) {
          whereConditions.push(inArray(schema.songs.releaseYear, validYears))
        }
      } else if (filters.releaseYear !== null) {
        whereConditions.push(eq(schema.songs.releaseYear, filters.releaseYear))
      }
    }

    if (filters.albumId !== undefined) {
      if (Array.isArray(filters.albumId)) {
        whereConditions.push(inArray(schema.songs.albumId, filters.albumId))
      } else {
        whereConditions.push(eq(schema.songs.albumId, filters.albumId))
      }
    }

    if (filters.hasLyrics !== undefined) {
      if (filters.hasLyrics) {
        whereConditions.push(
          and(isNotNull(schema.songs.lyrics), ne(schema.songs.lyrics, sql`'[]'`))
        )
      } else {
        whereConditions.push(or(isNull(schema.songs.lyrics), eq(schema.songs.lyrics, sql`'[]'`)))
      }
    }

    if (filters.minDuration !== undefined || filters.maxDuration !== undefined) {
      const durationConditions = []
      if (filters.minDuration !== undefined) {
        durationConditions.push(gte(schema.songs.duration, filters.minDuration))
      }
      if (filters.maxDuration !== undefined) {
        durationConditions.push(lte(schema.songs.duration, filters.maxDuration))
      }
      whereConditions.push(and(...durationConditions))
    }

    if (filters.minPlayCount !== undefined || filters.maxPlayCount !== undefined) {
      const playCountConditions = []
      if (filters.minPlayCount !== undefined) {
        playCountConditions.push(gte(schema.songs.playCount, filters.minPlayCount))
      }
      if (filters.maxPlayCount !== undefined) {
        playCountConditions.push(lte(schema.songs.playCount, filters.maxPlayCount))
      }
      whereConditions.push(and(...playCountConditions))
    }

    if (filters.playedAfter !== undefined || filters.playedBefore !== undefined) {
      const playedDateConditions = []
      if (filters.playedAfter !== undefined) {
        playedDateConditions.push(gte(schema.songs.lastPlayedAt, filters.playedAfter))
      }
      if (filters.playedBefore !== undefined) {
        playedDateConditions.push(lte(schema.songs.lastPlayedAt, filters.playedBefore))
      }
      whereConditions.push(and(...playedDateConditions))
    }
  }

  return whereConditions
}
