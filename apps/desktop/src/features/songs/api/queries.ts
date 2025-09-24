import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, inArray, isNotNull, isNull, like, lte } from "drizzle-orm"

import { type QuerySongsParams, type SongWithMainRelations } from "@repo/api"

export const getAllSongsWithMainRelations = async ({
  limit,
  offset,
  orderBy,
  filters
}: QuerySongsParams = {}): Promise<SongWithMainRelations[]> => {
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
        whereConditions.push(isNotNull(schema.songs.lyrics))
      } else {
        whereConditions.push(isNull(schema.songs.lyrics))
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

  return await database.query.songs.findMany({
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
}

export const getSongByIdWithMainRelations = async (
  id: number
): Promise<SongWithMainRelations | undefined> => {
  return await database.query.songs.findFirst({
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
}

export const getSongsByIdsWithMainRelations = async (
  ids: number[]
): Promise<SongWithMainRelations[]> => {
  if (ids.length === 0) return []

  const rows = await database.query.songs.findMany({
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

  const orderIndex = new Map<number, number>()
  ids.forEach((id, idx) => orderIndex.set(id, idx))

  return rows.sort((a, b) => orderIndex.get(a.id)! - orderIndex.get(b.id)!)
}
