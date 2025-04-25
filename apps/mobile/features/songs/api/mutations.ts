import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { type CreateSong, type Song, type UpdateSong } from "@features/songs/api/types"

export const createSong = async (song: CreateSong): Promise<Song> => {
  const [createdSong] = await database.insert(schema.songs).values(song).returning()
  return createdSong
}

export const updateSong = async (id: number, updates: UpdateSong): Promise<Song> => {
  const [updatedSong] = await database
    .update(schema.songs)
    .set(updates)
    .where(eq(schema.songs.id, id))
    .returning()
  return updatedSong
}

export const deleteSong = async (id: number): Promise<Song> => {
  const [deletedSong] = await database
    .delete(schema.songs)
    .where(eq(schema.songs.id, id))
    .returning()
  return deletedSong
}
