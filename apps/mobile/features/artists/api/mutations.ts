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

import { checkArtistDeletionIntegrity } from "@features/songs/api/validations"

/**
 * Inserts a new artist into the database, handling thumbnail storage.
 *
 * This function performs the following operations:
 * 1. Saves the artist's thumbnail file to storage, generating a unique name if provided.
 * 2. Inserts the artist record into the `artists` table in the database.
 * 3. Includes error handling for duplicate artist names.
 *
 * @param artist - An object containing the artist data to be inserted, excluding the `thumbnail` property.
 * @param thumbnailPath - (Optional) The path to the artist's thumbnail image file.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the newly created `Artist` object.
 * @throws {CustomError} If an artist with the same name already exists (ValidationErrorCode.DUPLICATE_ARTIST).
 * @throws {Error} For other database or file storage errors.
 */
export async function insertArtist(
  artist: Omit<InsertArtist, "thumbnail">,
  thumbnailPath?: string | null,
  t?: TFunction
): Promise<Artist> {
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

/**
 * Updates an existing artist in the database, handling thumbnail storage.
 *
 * This function performs the following operations:
 * 1. Fetches the existing artist to determine current thumbnail.
 * 2. Manages the artist's thumbnail file based on `thumbnailAction` (keep, update, remove).
 * 3. Updates the artist record in the `artists` table with the provided `updates`.
 * 4. Includes error handling for duplicate artist names.
 *
 * @param id - The ID of the artist to update.
 * @param updates - An object containing the artist data to be updated, excluding `thumbnail` property.
 * @param thumbnailAction - (Optional) Specifies how to handle the thumbnail: 'keep', 'update', or 'remove'.
 * @param thumbnailPath - (Optional) The path to the new thumbnail image file if `thumbnailAction` is 'update'.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the updated `Artist` object.
 * @throws {CustomError} If an artist with the same name already exists (ValidationErrorCode.DUPLICATE_ARTIST).
 * @throws {Error} For other database or file storage errors.
 */
export async function updateArtist(
  id: number,
  updates: Omit<UpdateArtist, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  t?: TFunction
): Promise<Artist> {
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

/**
 * Toggles the `isFavorite` status of an artist in the database.
 *
 * This function retrieves the current `isFavorite` status of the specified artist
 * and then updates it to the opposite boolean value.
 *
 * @param id - The ID of the artist to toggle its favorite status.
 * @returns A Promise that resolves to the updated `Artist` object.
 */
export async function toggleArtistFavorite(id: number): Promise<Artist> {
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

/**
 * Deletes an artist from the database, including its associated thumbnail file.
 *
 * This function first performs an integrity check using `checkArtistDeletionIntegrity`
 * to ensure the artist can be safely deleted without breaking song-album-artist relationships.
 * If a conflict is found, it throws a `CustomError`.
 *
 * If no conflicts, it performs the following operations:
 * 1. Deletes the artist record from the `artists` table.
 * 2. If a thumbnail is associated, it deletes the thumbnail file from storage.
 *
 * @param id - The ID of the artist to delete.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the deleted `Artist` object.
 * @throws {CustomError} If deleting the artist would violate integrity constraints (ValidationErrorCode.INTEGRITY_ARTIST_DELETION).
 * @throws {Error} For other database or file storage errors.
 */
export async function deleteArtist(id: number, t?: TFunction): Promise<Artist> {
  const hasConflict = await checkArtistDeletionIntegrity(id)
  if (hasConflict) {
    const message = t
      ? t("validation.artist.integrity")
      : "Cannot delete artist because there are songs that belong to both this artist and albums featuring this artist"
    throw new CustomError(ValidationErrorCode.INTEGRITY_ARTIST_DELETION, "id", message, "artist")
  }

  const [deletedArtist] = await database
    .delete(schema.artists)
    .where(eq(schema.artists.id, id))
    .returning()

  if (deletedArtist.thumbnail) {
    await deleteFile("thumbnails", deletedArtist.thumbnail)
  }

  return deletedArtist
}
