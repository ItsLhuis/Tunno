import { database, schema } from "@database/client"
import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { type InsertSong, type Song, type UpdateSong } from "@repo/api"

export const insertSong = async (
  song: Omit<InsertSong, "file" | "thumbnail">,
  artists: number[],
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

  if (artists.length > 0) {
    await database
      .insert(schema.songsToArtists)
      .values(artists.map((artistId) => ({ songId: createdSong.id, artistId })))
  }

  return createdSong
}

export const updateSong = async (
  id: number,
  updates: Omit<UpdateSong, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  artists?: number[]
): Promise<Song> => {
  const [existingSong] = await database.select().from(schema.songs).where(eq(schema.songs.id, id))

  let thumbnailName = existingSong.thumbnail

  if (thumbnailAction === "update" && thumbnailPath) {
    thumbnailName = await updateFileWithUniqueNameFromPath(
      "thumbnails",
      existingSong.thumbnail,
      thumbnailPath
    )
  } else if (thumbnailAction === "remove") {
    if (existingSong.thumbnail) {
      await deleteFile("thumbnails", existingSong.thumbnail)
    }
    thumbnailName = null
  }

  const [updatedSong] = await database
    .update(schema.songs)
    .set({ ...updates, thumbnail: thumbnailName })
    .where(eq(schema.songs.id, id))
    .returning()

  if (Array.isArray(artists)) {
    await database.delete(schema.songsToArtists).where(eq(schema.songsToArtists.songId, id))

    if (artists.length > 0) {
      await database
        .insert(schema.songsToArtists)
        .values(artists.map((artistId) => ({ songId: id, artistId })))
    }
  }

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
