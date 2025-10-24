import { database, schema } from "@database/client"

import { and, eq, inArray } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { updatePlaylistStats } from "@features/songs/api/stats/playlist"

import { type InsertPlaylist, type Playlist, type UpdatePlaylist } from "@repo/api"

export const insertPlaylist = async (
  playlist: Omit<InsertPlaylist, "thumbnail">,
  thumbnailPath?: string | null
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

export const updateSongsToPlaylists = async (
  songIds: number[],
  playlistIds: number[]
): Promise<void> => {
  const currentAssociations = await database
    .select({
      songId: schema.playlistsToSongs.songId,
      playlistId: schema.playlistsToSongs.playlistId
    })
    .from(schema.playlistsToSongs)
    .where(inArray(schema.playlistsToSongs.songId, songIds))

  const affectedPlaylistIds = new Set<number>()

  currentAssociations.forEach((assoc) => affectedPlaylistIds.add(assoc.playlistId))

  playlistIds.forEach((id) => affectedPlaylistIds.add(id))

  await database
    .delete(schema.playlistsToSongs)
    .where(inArray(schema.playlistsToSongs.songId, songIds))

  if (playlistIds.length > 0) {
    const newAssociations = songIds.flatMap((songId) =>
      playlistIds.map((playlistId) => ({
        songId,
        playlistId
      }))
    )

    await database.insert(schema.playlistsToSongs).values(newAssociations)
  }

  await Promise.all(
    Array.from(affectedPlaylistIds).map((playlistId) => updatePlaylistStats(playlistId))
  )
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

  await updatePlaylistStats(playlistId)
}
