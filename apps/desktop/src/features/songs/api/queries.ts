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

import {
  type QuerySongsParams,
  type SongWithAllRelations,
  type SongWithMainRelations,
  PAGE_SIZE
} from "@repo/api"

export const getSongsWithMainRelationsPaginated = async ({
  limit = PAGE_SIZE,
  offset = 0,
  orderBy,
  filters
}: QuerySongsParams & { limit?: number; offset?: number }) => {
  const whereConditions = buildWhereConditions(filters)

  const songs = await database.query.songs.findMany({
    limit,
    offset,
    where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
    orderBy: orderBy
      ? orderBy.direction === "asc"
        ? asc(schema.songs[orderBy.column])
        : desc(schema.songs[orderBy.column])
      : undefined,
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        }
      },
      playlists: {
        with: {
          playlist: true
        }
      }
    }
  })

  const totalCount = await database
    .select({ count: sql<number>`count(*)` })
    .from(schema.songs)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .then((result) => result[0]?.count ?? 0)

  return {
    songs,
    totalCount,
    hasNextPage: offset + songs.length < totalCount,
    nextOffset: offset + songs.length
  }
}

export const getSongByIdWithMainRelations = async (
  id: number
): Promise<SongWithMainRelations | undefined> => {
  const song = await database.query.songs.findFirst({
    where: eq(schema.songs.id, id),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        }
      },
      playlists: {
        with: {
          playlist: true
        }
      }
    }
  })

  return song
}

export const getSongByIdWithAllRelations = async (
  id: number
): Promise<SongWithAllRelations | undefined> => {
  const song = await database.query.songs.findFirst({
    where: eq(schema.songs.id, id),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        }
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

  return song
}

export const getSongsByIdsWithMainRelations = async (
  ids: number[]
): Promise<SongWithMainRelations[]> => {
  if (ids.length === 0) return []

  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, ids),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        }
      },
      playlists: {
        with: {
          playlist: true
        }
      }
    }
  })

  return songs
}

export const getSongsByArtistIds = async (
  artistIds: number[]
): Promise<SongWithMainRelations[]> => {
  if (artistIds.length === 0) return []

  const songs = await database.query.songs.findMany({
    where: inArray(
      schema.songs.id,
      database
        .select({ songId: schema.songsToArtists.songId })
        .from(schema.songsToArtists)
        .where(inArray(schema.songsToArtists.artistId, artistIds))
    ),
    with: {
      album: true,
      artists: {
        with: {
          artist: true
        }
      },
      playlists: {
        with: {
          playlist: true
        }
      }
    }
  })

  return songs
}

export const getSongIdsOnly = async ({ orderBy, filters }: QuerySongsParams): Promise<number[]> => {
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
