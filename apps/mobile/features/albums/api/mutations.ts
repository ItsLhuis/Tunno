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

import { checkAlbumArtistIntegrity } from "@features/songs/api/validations"

import { type TFunction } from "@repo/i18n"

/**
 * Inserts a new album into the database, handling thumbnail storage and artist associations.
 *
 * This function performs the following operations:
 * 1. Saves the album's thumbnail file to storage, generating a unique name if provided.
 * 2. Inserts the album record into the `albums` table in the database.
 * 3. If artists are provided, creates associations between the album and artists in `albumsToArtists` table.
 * 4. Includes error handling for duplicate album names.
 *
 * @param album - An object containing the album data to be inserted, excluding the `thumbnail` property.
 * @param thumbnailPath - (Optional) The path to the album's thumbnail image file.
 * @param artists - (Optional) An array of artist IDs to associate with the album.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the newly created `Album` object.
 * @throws {CustomError} If an album with the same name and type already exists (ValidationErrorCode.DUPLICATE_ALBUM).
 * @throws {Error} For other database or file storage errors.
 */
export async function insertAlbum(
  album: Omit<InsertAlbum, "thumbnail">,
  thumbnailPath?: string | null,
  artists?: number[],
  t?: TFunction
): Promise<Album> {
  try {
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
        .values(
          artists.map((artistId, index) => ({
            albumId: createdAlbum.id,
            artistId,
            artistOrder: index
          }))
        )
        .onConflictDoNothing({
          target: [schema.albumsToArtists.albumId, schema.albumsToArtists.artistId]
        })
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

/**
 * Updates an existing album in the database, handling thumbnail storage,
 * artist associations, and integrity checks.
 *
 * This function performs the following operations:
 * 1. Fetches the existing album to determine current thumbnail.
 * 2. Manages the album's thumbnail file based on `thumbnailAction` (keep, update, remove).
 * 3. If `artists` are provided, it performs an integrity check using `checkAlbumArtistIntegrity`.
 *    If removing artists would break consistency (e.g., songs from those artists are still
 *    in the album), it throws a `CustomError`.
 * 4. Updates the album record in the `albums` table with the provided `updates`.
 * 5. If `artists` are provided and the integrity check passes, it updates the `albumsToArtists`
 *    associations, first deleting old associations and then inserting new ones.
 * 6. Includes error handling for duplicate album names.
 *
 * @param id - The ID of the album to update.
 * @param updates - An object containing the album data to be updated, excluding `thumbnail` property.
 * @param thumbnailAction - (Optional) Specifies how to handle the thumbnail: 'keep', 'update', or 'remove'.
 * @param thumbnailPath - (Optional) The path to the new thumbnail image file if `thumbnailAction` is 'update'.
 * @param artists - (Optional) An array of artist IDs to associate with the album. If provided, replaces existing associations.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the updated `Album` object.
 * @throws {CustomError} If removing artists would violate integrity (ValidationErrorCode.INTEGRITY_ALBUM_ARTIST)
 *                       or if an album with the same name and type already exists (ValidationErrorCode.DUPLICATE_ALBUM).
 * @throws {Error} For other database or file storage errors.
 */
export async function updateAlbum(
  id: number,
  updates: Omit<UpdateAlbum, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  artists?: number[],
  t?: TFunction
): Promise<Album> {
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

    if (Array.isArray(artists)) {
      const currentAlbumArtists = await database
        .select({ artistId: schema.albumsToArtists.artistId })
        .from(schema.albumsToArtists)
        .where(eq(schema.albumsToArtists.albumId, id))

      const currentArtistIds = currentAlbumArtists.map((a) => a.artistId)
      const newArtistIds = artists

      const removedArtistIds = currentArtistIds.filter((id) => !newArtistIds.includes(id))

      if (removedArtistIds.length > 0) {
        const hasConflict = await checkAlbumArtistIntegrity(id, removedArtistIds)
        if (hasConflict) {
          const message = t
            ? t("validation.album.integrity")
            : "Cannot remove artist from album because there are songs that belong to both this album and artist"
          throw new CustomError(
            ValidationErrorCode.INTEGRITY_ALBUM_ARTIST,
            "artists",
            message,
            "album"
          )
        }
      }
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

/**
 * Toggles the `isFavorite` status of an album in the database.
 *
 * This function retrieves the current `isFavorite` status of the specified album
 * and then updates it to the opposite boolean value.
 *
 * @param id - The ID of the album to toggle its favorite status.
 * @returns A Promise that resolves to the updated `Album` object.
 */
export async function toggleAlbumFavorite(id: number): Promise<Album> {
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

/**
 * Deletes an album from the database, including its associated thumbnail file.
 *
 * This function performs the following operations:
 * 1. Deletes the album record from the `albums` table.
 * 2. If a thumbnail is associated, it deletes the thumbnail file from storage.
 *
 * @param id - The ID of the album to delete.
 * @returns A Promise that resolves to the deleted `Album` object.
 */
export async function deleteAlbum(id: number): Promise<Album> {
  const [deletedAlbum] = await database
    .delete(schema.albums)
    .where(eq(schema.albums.id, id))
    .returning()

  if (deletedAlbum.thumbnail) {
    await deleteFile("thumbnails", deletedAlbum.thumbnail)
  }

  return deletedAlbum
}
