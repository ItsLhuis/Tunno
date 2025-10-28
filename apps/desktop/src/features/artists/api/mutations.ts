import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import {
  type Artist,
  type InsertArtist,
  type UpdateArtist,
  CustomError,
  ValidationErrorCode
} from "@repo/api"

import { extractConstraintInfo, isUniqueConstraintError } from "@repo/database"

import { type TFunction } from "@repo/i18n"

export const insertArtist = async (
  artist: Omit<InsertArtist, "thumbnail">,
  thumbnailPath?: string | null,
  t?: TFunction
): Promise<Artist> => {
  try {
    const thumbnailName = thumbnailPath
      ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
      : null

    const [createdArtist] = await database
      .insert(schema.artists)
      .values({ ...artist, thumbnail: thumbnailName })
      .returning()

    return createdArtist
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (constraintInfo?.table === "artists" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.artist.duplicate")
          : "An artist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_ARTIST, "name", message, "artist")
      }
    }
    throw error
  }
}

export const updateArtist = async (
  id: number,
  updates: Omit<UpdateArtist, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  t?: TFunction
): Promise<Artist> => {
  const [existingArtist] = await database
    .select()
    .from(schema.artists)
    .where(eq(schema.artists.id, id))

  let thumbnailName = existingArtist.thumbnail

  if (thumbnailAction === "update" && thumbnailPath) {
    thumbnailName = await updateFileWithUniqueNameFromPath(
      "thumbnails",
      existingArtist.thumbnail,
      thumbnailPath
    )
  } else if (thumbnailAction === "remove") {
    if (existingArtist.thumbnail) {
      await deleteFile("thumbnails", existingArtist.thumbnail)
    }
    thumbnailName = null
  }

  try {
    const [updatedArtist] = await database
      .update(schema.artists)
      .set({ ...updates, thumbnail: thumbnailName })
      .where(eq(schema.artists.id, id))
      .returning()

    return updatedArtist
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (constraintInfo?.table === "artists" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.artist.duplicate")
          : "An artist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_ARTIST, "name", message, "artist")
      }
    }
    throw error
  }
}

export const toggleArtistFavorite = async (id: number): Promise<Artist> => {
  const [existingArtist] = await database
    .select()
    .from(schema.artists)
    .where(eq(schema.artists.id, id))

  const [updatedArtist] = await database
    .update(schema.artists)
    .set({ isFavorite: !existingArtist.isFavorite })
    .where(eq(schema.artists.id, id))
    .returning()

  return updatedArtist
}

export const deleteArtist = async (id: number): Promise<Artist> => {
  const [deletedArtist] = await database
    .delete(schema.artists)
    .where(eq(schema.artists.id, id))
    .returning()

  if (deletedArtist.thumbnail) {
    await deleteFile("thumbnails", deletedArtist.thumbnail)
  }

  return deletedArtist
}
