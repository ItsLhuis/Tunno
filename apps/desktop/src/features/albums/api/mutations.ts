import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import {
  type Album,
  type InsertAlbum,
  type UpdateAlbum,
  CustomError,
  ValidationErrorCode
} from "@repo/api"

import { extractConstraintInfo, isUniqueConstraintError } from "@repo/database"

import { type TFunction } from "@repo/i18n"

export const insertAlbum = async (
  album: Omit<InsertAlbum, "thumbnail">,
  thumbnailPath?: string | null,
  artists?: number[],
  t?: TFunction
): Promise<Album> => {
  try {
    const thumbnailName = thumbnailPath
      ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
      : null

    const [createdAlbum] = await database
      .insert(schema.albums)
      .values({ ...album, thumbnail: thumbnailName })
      .returning()

    if (artists && artists.length > 0) {
      await database.insert(schema.albumsToArtists).values(
        artists.map((artistId, index) => ({
          albumId: createdAlbum.id,
          artistId,
          artistOrder: index
        }))
      )
    }

    return createdAlbum
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      console.log(constraintInfo)
      if (constraintInfo?.table === "albums" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.album.duplicate")
          : "An album with this name and type already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_ALBUM, "name", message, "album")
      }
    }
    throw error
  }
}

export const updateAlbum = async (
  id: number,
  updates: Omit<UpdateAlbum, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  artists?: number[],
  t?: TFunction
): Promise<Album> => {
  try {
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
        await database.insert(schema.albumsToArtists).values(
          artists.map((artistId, index) => ({
            albumId: id,
            artistId,
            artistOrder: index
          }))
        )
      }
    }

    return updatedAlbum
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (constraintInfo?.table === "albums" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.album.duplicate")
          : "An album with this name and type already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_ALBUM, "name", message, "album")
      }
    }
    throw error
  }
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
