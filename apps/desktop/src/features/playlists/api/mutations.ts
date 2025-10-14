import { database, schema } from "@database/client"

import { and, eq, inArray } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { type Playlist, type InsertPlaylist, type UpdatePlaylist } from "@repo/api"

export const insertPlaylist = async (
  playlist: Omit<InsertPlaylist, "thumbnail">,
  thumbnailPath?: string
): Promise<Playlist> => {
  const thumbnailName = thumbnailPath
    ? await saveFileWithUniqueNameFromPath("thumbnails", thumbnailPath)
    : null

  const [createdPlaylist] = await database
    .insert(schema.playlists)
    .values({ ...playlist, thumbnail: thumbnailName })
    .returning()

  return createdPlaylist
}

export const updatePlaylist = async (
  id: number,
  updates: Omit<UpdatePlaylist, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string
): Promise<Playlist> => {
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

  const [updatedPlaylist] = await database
    .update(schema.playlists)
    .set({ ...updates, thumbnail: thumbnailName })
    .where(eq(schema.playlists.id, id))
    .returning()

  return updatedPlaylist
}

export const togglePlaylistFavorite = async (id: number): Promise<Playlist> => {
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

export const deletePlaylist = async (id: number): Promise<Playlist> => {
  const [deletedPlaylist] = await database
    .delete(schema.playlists)
    .where(eq(schema.playlists.id, id))
    .returning()

  if (deletedPlaylist.thumbnail) {
    await deleteFile("thumbnails", deletedPlaylist.thumbnail)
  }

  return deletedPlaylist
}

export const addSongsToPlaylist = async (playlistId: number, songIds: number[]): Promise<void> => {
  const playlistSongs = songIds.map((songId) => ({
    playlistId,
    songId
  }))

  await database.insert(schema.playlistsToSongs).values(playlistSongs)
}

export const removeSongsFromPlaylist = async (
  playlistId: number,
  songIds: number[]
): Promise<void> => {
  await database
    .delete(schema.playlistsToSongs)
    .where(
      and(
        eq(schema.playlistsToSongs.playlistId, playlistId),
        inArray(schema.playlistsToSongs.songId, songIds)
      )
    )
}
