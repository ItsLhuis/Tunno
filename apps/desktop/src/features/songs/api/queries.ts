import { database, schema } from "@database/client"

import { asc, desc, eq, inArray, like } from "drizzle-orm"

import { type QuerySongsParams, type SongWithRelations } from "@repo/api"

export const getAllSongsWithRelations = async ({
  limit,
  offset,
  orderBy,
  filters
}: QuerySongsParams = {}): Promise<SongWithRelations[]> => {
  return await database.query.songs.findMany({
    limit,
    offset,
    where: filters?.search ? like(schema.songs.name, `%${filters.search}%`) : undefined,
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

export const getSongByIdWithRelations = async (
  id: number
): Promise<SongWithRelations | undefined> => {
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

export const getSongsByIdsWithRelations = async (ids: number[]): Promise<SongWithRelations[]> => {
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
