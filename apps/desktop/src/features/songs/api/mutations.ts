import { database, schema } from "@database/client"
import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { type CreateSong, type Song, type UpdateSong } from "@repo/api"

export const createSong = async (
  song: Omit<CreateSong, "file" | "thumbnail">,
  filePath: string,
  thumbnailPath?: string
): Promise<Song> => {
  const fileName = await saveFileWithUniqueNameFromPath("songs", filePath)

  const thumbnailName = thumbnailPath
    ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
    : null

  const [createdSong] = await database
    .insert(schema.songs)
    .values({
      ...song,
      file: fileName,
      thumbnail: thumbnailName
    })
    .returning()

  return createdSong
}

export const updateSong = async (
  id: number,
  updates: Omit<UpdateSong, "thumbnail">,
  thumbnailSourcePath?: string
): Promise<Song> => {
  const [existingSong] = await database.select().from(schema.songs).where(eq(schema.songs.id, id))

  let thumbnailName = existingSong.thumbnail

  if (thumbnailSourcePath) {
    thumbnailName = await updateFileWithUniqueNameFromPath(
      "thumbnails",
      existingSong.thumbnail,
      thumbnailSourcePath
    )
  }

  const [updatedSong] = await database
    .update(schema.songs)
    .set({ ...updates, thumbnail: thumbnailName })
    .where(eq(schema.songs.id, id))
    .returning()

  return updatedSong
}

export const deleteSong = async (id: number): Promise<Song> => {
  const [deletedSong] = await database
    .delete(schema.songs)
    .where(eq(schema.songs.id, id))
    .returning()

  await deleteFile("songs", deletedSong.file)
  if (deletedSong.thumbnail) {
    await deleteFile("thumbnails", deletedSong.thumbnail)
  }

  return deletedSong
}
