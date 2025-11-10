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

export async function getAlbumById(id: number): Promise<Album | null> {
  const album = await database.query.albums.findFirst({
    where: eq(schema.albums.id, id)
  })

  return album || null
}

export async function getAlbumByIdWithAllRelations(
  id: number
): Promise<AlbumWithAllRelations | undefined> {
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

  return album
}

export async function getAlbumByIdWithArtists(id: number): Promise<AlbumWithArtists | undefined> {
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

  return album
}

export async function getAlbumByIdWithSongsAndArtists(
  id: number
): Promise<AlbumWithSongsAndArtists | undefined> {
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

  return album
}

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

export async function getSongIdsByAlbumId(id: number): Promise<number[]> {
  const result = await database
    .select({ songId: schema.songs.id })
    .from(schema.songs)
    .where(eq(schema.songs.albumId, id))

  return result.map((row) => row.songId)
}

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
