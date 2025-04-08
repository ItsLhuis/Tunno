import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { type Song } from "@features/songs/api/types"

export const addSong = async (song: Song): Promise<Song> => {
  const [newSong] = await database.insert(schema.songs).values(song).returning()
  return newSong
}

export const updateSong = async (
  id: number,
  updates: Partial<Omit<Song, "id" | "createdAt">>
): Promise<Song | undefined> => {
  const [updatedSong] = await database
    .update(schema.songs)
    .set(updates)
    .where(eq(schema.songs.id, id))
    .returning()
  return updatedSong
}

export const deleteSong = async (id: number): Promise<boolean> => {
  const result = await database.delete(schema.songs).where(eq(schema.songs.id, id))
  return result.changes > 0
}
