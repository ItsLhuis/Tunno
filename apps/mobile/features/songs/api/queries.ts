import { database } from "@database/client"

import { type Song, type SongWithRelations } from "@features/songs/api/types"

import { type PaginatedParams } from "@api/types"

export type PaginatedSongsParams = PaginatedParams<keyof Song>

export const getAllSongs = async ({
  limit = 20,
  offset = 0,
  orderBy,
  filters
}: PaginatedSongsParams = {}): Promise<SongWithRelations[]> => {
  return await database.query.songs.findMany({
    limit,
    offset,
    orderBy: orderBy
      ? (songs, { asc, desc }) => [
          orderBy.direction === "asc" ? asc(songs[orderBy.column]) : desc(songs[orderBy.column])
        ]
      : undefined,
    where: (songs, { and, like }) =>
      and(filters?.search ? like(songs.name, `%${filters.search}%`) : undefined),
    with: {
      album: true,
      artists: { with: { artist: true }, columns: { songId: false, artistId: false } },
      playlists: { with: { playlist: true }, columns: { songId: false, playlistId: false } }
    }
  })
}

export const getSongById = async (id: number): Promise<SongWithRelations | undefined> => {
  return await database.query.songs.findFirst({
    where: (songs, { eq }) => eq(songs.id, id),
    with: {
      album: true,
      artists: { with: { artist: true }, columns: { songId: false, artistId: false } },
      playlists: { with: { playlist: true }, columns: { songId: false, playlistId: false } }
    }
  })
}
