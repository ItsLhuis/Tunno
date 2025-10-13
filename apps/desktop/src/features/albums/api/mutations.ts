import { database, schema } from "@database/client"
import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { type Album, type InsertAlbum, type UpdateAlbum } from "@repo/api"

export const insertAlbum = async (
  album: Omit<InsertAlbum, "thumbnail">,
  thumbnailPath?: string,
  artists?: number[]
): Promise<Album> => {
  const thumbnailName = thumbnailPath
    ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
    : null

  const [createdAlbum] = await database
    .insert(schema.albums)
    .values({ ...album, thumbnail: thumbnailName })
    .returning()

  if (artists && artists.length > 0) {
    await database
      .insert(schema.albumsToArtists)
      .values(artists.map((artistId) => ({ albumId: createdAlbum.id, artistId })))
  }

  return createdAlbum
}

export const updateAlbum = async (
  id: number,
  updates: Omit<UpdateAlbum, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  artists?: number[]
): Promise<Album> => {
  const [existingAlbum] = await database
    .select()
    .from(schema.albums)
    .where(eq(schema.albums.id, id))

  let thumbnailName = existingAlbum.thumbnail

  if (thumbnailAction === "update" && thumbnailPath) {
    thumbnailName = await updateFileWithUniqueNameFromPath(
      "thumbnails",
      existingAlbum.thumbnail,
      thumbnailPath
    )
  } else if (thumbnailAction === "remove") {
    if (existingAlbum.thumbnail) {
      await deleteFile("thumbnails", existingAlbum.thumbnail)
    }
    thumbnailName = null
  }

  const [updatedAlbum] = await database
    .update(schema.albums)
    .set({ ...updates, thumbnail: thumbnailName })
    .where(eq(schema.albums.id, id))
    .returning()

  if (Array.isArray(artists)) {
    await database.delete(schema.albumsToArtists).where(eq(schema.albumsToArtists.albumId, id))

    if (artists.length > 0) {
      await database
        .insert(schema.albumsToArtists)
        .values(artists.map((artistId) => ({ albumId: id, artistId })))
    }
  }

  return updatedAlbum
}

export const toggleAlbumFavorite = async (id: number): Promise<Album> => {
  const [existingAlbum] = await database
    .select()
    .from(schema.albums)
    .where(eq(schema.albums.id, id))

  const [updatedAlbum] = await database
    .update(schema.albums)
    .set({ isFavorite: !existingAlbum.isFavorite })
    .where(eq(schema.albums.id, id))
    .returning()

  return updatedAlbum
}

export const deleteAlbum = async (id: number): Promise<Album> => {
  const [deletedAlbum] = await database
    .delete(schema.albums)
    .where(eq(schema.albums.id, id))
    .returning()

  if (deletedAlbum.thumbnail) {
    await deleteFile("thumbnails", deletedAlbum.thumbnail)
  }

  return deletedAlbum
}
