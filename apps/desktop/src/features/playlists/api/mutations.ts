import { database, schema } from "@database/client"

import { and, eq, inArray } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { updatePlaylistStats } from "@features/songs/api/stats/playlist"

import {
  type InsertPlaylist,
  type Playlist,
  type UpdatePlaylist,
  CustomError,
  ValidationErrorCode
} from "@repo/api"

import {
  extractConstraintInfo,
  generatePlaylistFingerprint,
  isUniqueConstraintError
} from "@repo/database"

import { type TFunction } from "@repo/i18n"

/**
 * Inserts a new playlist into the database, handling thumbnail storage.
 *
 * This function performs the following operations:
 * 1. Saves the playlist's thumbnail file to storage, generating a unique name if provided.
 * 2. Inserts the playlist record into the `playlists` table in the database.
 * 3. Includes error handling for duplicate playlist names.
 *
 * @param playlist - An object containing the playlist data to be inserted, excluding the `thumbnail` property.
 * @param thumbnailPath - (Optional) The path to the playlist's thumbnail image file.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the newly created `Playlist` object.
 * @throws {CustomError} If a playlist with the same name already exists (ValidationErrorCode.DUPLICATE_PLAYLIST).
 * @throws {Error} For other database or file storage errors.
 */
export async function insertPlaylist(
  playlist: Omit<InsertPlaylist, "thumbnail">,
  thumbnailPath?: string | null,
  t?: TFunction
): Promise<Playlist> {
  try {
    const thumbnailName = thumbnailPath
      ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
      : null

    const fingerprint = await generatePlaylistFingerprint(playlist.name)

    const [createdPlaylist] = await database
      .insert(schema.playlists)
      .values({ ...playlist, thumbnail: thumbnailName, fingerprint })
      .returning()

    return createdPlaylist
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (
        constraintInfo?.table === "playlists" &&
        (constraintInfo?.column?.includes("name") ||
          constraintInfo?.column?.includes("fingerprint"))
      ) {
        const message = t
          ? t("validation.playlist.duplicate")
          : "A playlist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_PLAYLIST, "name", message, "playlist")
      }
    }
    throw error
  }
}

/**
 * Updates an existing playlist in the database, handling thumbnail storage.
 *
 * This function performs the following operations:
 * 1. Fetches the existing playlist to determine current thumbnail.
 * 2. Manages the playlist's thumbnail file based on `thumbnailAction` (keep, update, remove).
 * 3. Updates the playlist record in the `playlists` table with the provided `updates`.
 * 4. Includes error handling for duplicate playlist names.
 *
 * @param id - The ID of the playlist to update.
 * @param updates - An object containing the playlist data to be updated, excluding `thumbnail` property.
 * @param thumbnailAction - (Optional) Specifies how to handle the thumbnail: 'keep', 'update', or 'remove'.
 * @param thumbnailPath - (Optional) The path to the new thumbnail image file if `thumbnailAction` is 'update'.
 * @param t - (Optional) The i18n translation function for error messages.
 * @returns A Promise that resolves to the updated `Playlist` object.
 * @throws {CustomError} If a playlist with the same name already exists (ValidationErrorCode.DUPLICATE_PLAYLIST).
 * @throws {Error} For other database or file storage errors.
 */
export async function updatePlaylist(
  id: number,
  updates: Omit<UpdatePlaylist, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  t?: TFunction
): Promise<Playlist> {
  const [existingPlaylist] = await database
    .select()
    .from(schema.playlists)
    .where(eq(schema.playlists.id, id))

  let thumbnailName = existingPlaylist.thumbnail

  if (thumbnailAction === "update" && thumbnailPath) {
    thumbnailName = await updateFileWithUniqueNameFromPath(
      "thumbnails",
      existingPlaylist.thumbnail,
      thumbnailPath
    )
  } else if (thumbnailAction === "remove") {
    if (existingPlaylist.thumbnail) {
      await deleteFile("thumbnails", existingPlaylist.thumbnail)
    }
    thumbnailName = null
  }

  try {
    const [updatedPlaylist] = await database
      .update(schema.playlists)
      .set({ ...updates, thumbnail: thumbnailName })
      .where(eq(schema.playlists.id, id))
      .returning()

    return updatedPlaylist
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (
        constraintInfo?.table === "playlists" &&
        (constraintInfo?.column?.includes("name") ||
          constraintInfo?.column?.includes("fingerprint"))
      ) {
        const message = t
          ? t("validation.playlist.duplicate")
          : "A playlist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_PLAYLIST, "name", message, "playlist")
      }
    }
    throw error
  }
}

/**
 * Toggles the `isFavorite` status of a playlist in the database.
 *
 * This function retrieves the current `isFavorite` status of the specified playlist
 * and then updates it to the opposite boolean value.
 *
 * @param id - The ID of the playlist to toggle its favorite status.
 * @returns A Promise that resolves to the updated `Playlist` object.
 */
export async function togglePlaylistFavorite(id: number): Promise<Playlist> {
  const [existingPlaylist] = await database
    .select()
    .from(schema.playlists)
    .where(eq(schema.playlists.id, id))

  const [updatedPlaylist] = await database
    .update(schema.playlists)
    .set({ isFavorite: !existingPlaylist.isFavorite })
    .where(eq(schema.playlists.id, id))
    .returning()

  return updatedPlaylist
}

/**
 * Deletes a playlist from the database, including its associated thumbnail file.
 *
 * This function performs the following operations:
 * 1. Deletes the playlist record from the `playlists` table.
 * 2. If a thumbnail is associated, it deletes the thumbnail file from storage.
 *
 * @param id - The ID of the playlist to delete.
 * @returns A Promise that resolves to the deleted `Playlist` object.
 */
export async function deletePlaylist(id: number): Promise<Playlist> {
  const [deletedPlaylist] = await database
    .delete(schema.playlists)
    .where(eq(schema.playlists.id, id))
    .returning()

  if (deletedPlaylist.thumbnail) {
    await deleteFile("thumbnails", deletedPlaylist.thumbnail)
  }

  return deletedPlaylist
}

/**
 * Adds multiple songs to multiple playlists.
 *
 * This function creates associations between a list of song IDs and a list of playlist IDs
 * in the `playlistsToSongs` table. It uses `onConflictDoNothing` to prevent duplicate entries
 * if an association already exists. After adding, it updates the statistics for all affected playlists.
 *
 * @param songIds - An array of song IDs to add.
 * @param playlistIds - An array of playlist IDs to add the songs to.
 * @returns A Promise that resolves when the associations are created and playlist statistics are updated.
 */
export async function updateSongsToPlaylists(
  songIds: number[],
  playlistIds: number[]
): Promise<void> {
  if (songIds.length === 0 || playlistIds.length === 0) {
    return
  }

  const associations = songIds.flatMap((songId) =>
    playlistIds.map((playlistId) => ({
      songId,
      playlistId
    }))
  )

  if (associations.length > 0) {
    await database
      .insert(schema.playlistsToSongs)
      .values(associations)
      .onConflictDoNothing({
        target: [schema.playlistsToSongs.playlistId, schema.playlistsToSongs.songId]
      })
  }

  await Promise.all(playlistIds.map((playlistId) => updatePlaylistStats(playlistId)))
}

/**
 * Removes multiple songs from a specific playlist.
 *
 * This function deletes the associations between a list of song IDs and a given
 * playlist ID in the `playlistsToSongs` table. After removal, it updates the
 * statistics for the affected playlist.
 *
 * @param playlistId - The ID of the playlist from which to remove songs.
 * @param songIds - An array of song IDs to remove from the playlist.
 * @returns A Promise that resolves when the associations are deleted and playlist statistics are updated.
 */
export async function removeSongsFromPlaylist(
  playlistId: number,
  songIds: number[]
): Promise<void> {
  await database
    .delete(schema.playlistsToSongs)
    .where(
      and(
        eq(schema.playlistsToSongs.playlistId, playlistId),
        inArray(schema.playlistsToSongs.songId, songIds)
      )
    )

  await updatePlaylistStats(playlistId)
}
