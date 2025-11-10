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

import { extractConstraintInfo, isUniqueConstraintError } from "@repo/database"

import { type TFunction } from "@repo/i18n"

export async function insertPlaylist(
  playlist: Omit<InsertPlaylist, "thumbnail">,
  thumbnailPath?: string | null,
  t?: TFunction
): Promise<Playlist> {
  try {
    const thumbnailName = thumbnailPath
      ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
      : null

    const [createdPlaylist] = await database
      .insert(schema.playlists)
      .values({ ...playlist, thumbnail: thumbnailName })
      .returning()

    return createdPlaylist
  } catch (error: unknown) {
    if (isUniqueConstraintError(error)) {
      const constraintInfo = extractConstraintInfo(error)
      if (constraintInfo?.table === "playlists" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.playlist.duplicate")
          : "A playlist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_PLAYLIST, "name", message, "playlist")
      }
    }
    throw error
  }
}

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
      if (constraintInfo?.table === "playlists" && constraintInfo?.column?.includes("name")) {
        const message = t
          ? t("validation.playlist.duplicate")
          : "A playlist with this name already exists"
        throw new CustomError(ValidationErrorCode.DUPLICATE_PLAYLIST, "name", message, "playlist")
      }
    }
    throw error
  }
}

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
