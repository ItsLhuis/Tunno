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

export async function getPlaylistById(id: number): Promise<Playlist | null> {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id)
  })

  return playlist || null
}

export async function getPlaylistByIdWithAllRelations(
  id: number
): Promise<PlaylistWithAllRelations | undefined> {
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

  return playlist
}

export async function getPlaylistByIdWithSongs(id: number): Promise<PlaylistWithSongs | undefined> {
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

  return playlist
}

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
