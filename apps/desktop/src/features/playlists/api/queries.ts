import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, like, lte, sql } from "drizzle-orm"

import {
  type QueryPlaylistParams,
  type Playlist,
  type PlaylistWithAllRelations,
  type PlaylistWithSongs,
  PAGE_SIZE
} from "@repo/api"

export const getPlaylistsPaginated = async ({
  limit = PAGE_SIZE,
  offset = 0,
  orderBy,
  filters
}: QueryPlaylistParams & { limit?: number; offset?: number }) => {
  const whereConditions = buildWhereConditions(filters)

  const playlists = await database.query.playlists.findMany({
    limit,
    offset,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.playlists[orderBy.column])
        : desc(schema.playlists[orderBy.column])
      : undefined
  })

  const totalCount = await database
    .select({ count: sql<number>`count(*)` })
    .from(schema.playlists)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .then((result) => result[0]?.count ?? 0)

  return {
    playlists,
    totalCount,
    hasNextPage: offset + playlists.length < totalCount,
    nextOffset: offset + playlists.length
  }
}

export const getAllPlaylists = async ({
  limit,
  offset,
  orderBy,
  filters
}: QueryPlaylistParams = {}): Promise<Playlist[]> => {
  const whereConditions = buildWhereConditions(filters)

  const playlists = await database.query.playlists.findMany({
    limit,
    offset,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.playlists[orderBy.column])
        : desc(schema.playlists[orderBy.column])
      : asc(schema.playlists.name)
  })

  return playlists
}

export const getPlaylistById = async (id: number): Promise<Playlist | null> => {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id)
  })

  return playlist || null
}

export const getPlaylistByIdWithAllRelations = async (
  id: number
): Promise<PlaylistWithAllRelations | undefined> => {
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

export const getPlaylistByIdWithSongs = async (
  id: number
): Promise<PlaylistWithSongs | undefined> => {
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

export const getPlaylistIdsOnly = async (params?: QueryPlaylistParams): Promise<number[]> => {
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

export const getSongIdsByPlaylistId = async (id: number): Promise<number[]> => {
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
