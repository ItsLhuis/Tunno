import { database, schema } from "@database/client"

import { asc, desc, eq, like } from "drizzle-orm"

import { type QueryParams } from "@api/types"

import { type SongColumns, type SongWithRelations } from "@features/songs/api/types"

export type QuerySongsParams = QueryParams<SongColumns>

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
