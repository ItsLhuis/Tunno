import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { updateAlbumStatsForSong } from "./stats/album"
import { updateArtistStatsForSong } from "./stats/artist"
import { updatePlaylistStatsForSong } from "./stats/playlist"

import { type InsertSong, type Song, type UpdateSong } from "@repo/api"

export async function insertSong(
  song: Omit<InsertSong, "file" | "thumbnail">,
  artists: number[],
  filePath: string,
  thumbnailPath?: string | null
): Promise<Song> {
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
      .values(
        artists.map((artistId, index) => ({
          songId: createdSong.id,
          artistId,
          artistOrder: index
        }))
      )
      .onConflictDoNothing({
        target: [schema.songsToArtists.songId, schema.songsToArtists.artistId]
      })
  }

  await updateArtistStatsForSong(artists)
  if (song.albumId) {
    await updateAlbumStatsForSong(song.albumId)
  }

  return createdSong
}

export async function updateSong(
  id: number,
  updates: Omit<UpdateSong, "thumbnail">,
  thumbnailAction?: "keep" | "update" | "remove",
  thumbnailPath?: string,
  artists?: number[]
): Promise<Song> {
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
    const oldArtists = await database
      .select({ artistId: schema.songsToArtists.artistId })
      .from(schema.songsToArtists)
      .where(eq(schema.songsToArtists.songId, id))

    const oldArtistIds = oldArtists.map((a) => a.artistId)

    await database.delete(schema.songsToArtists).where(eq(schema.songsToArtists.songId, id))

    if (artists.length > 0) {
      await database.insert(schema.songsToArtists).values(
        artists.map((artistId, index) => ({
          songId: id,
          artistId,
          artistOrder: index
        }))
      )
    }

    await updateArtistStatsForSong(artists, oldArtistIds)
  }

  if (updates.albumId !== undefined) {
    await updateAlbumStatsForSong(updates.albumId, existingSong.albumId)
  }

  return updatedSong
}

export async function toggleSongFavorite(id: number): Promise<Song> {
  const [existingSong] = await database.select().from(schema.songs).where(eq(schema.songs.id, id))

  const [updatedSong] = await database
    .update(schema.songs)
    .set({ isFavorite: !existingSong.isFavorite })
    .where(eq(schema.songs.id, id))
    .returning()

  return updatedSong
}

export async function deleteSong(id: number): Promise<Song> {
  const [songToDelete] = await database
    .select({
      albumId: schema.songs.albumId,
      file: schema.songs.file,
      thumbnail: schema.songs.thumbnail
    })
    .from(schema.songs)
    .where(eq(schema.songs.id, id))

  if (!songToDelete) {
    throw new Error("Song not found")
  }

  const artists = await database
    .select({ artistId: schema.songsToArtists.artistId })
    .from(schema.songsToArtists)
    .where(eq(schema.songsToArtists.songId, id))

  const playlists = await database
    .select({ playlistId: schema.playlistsToSongs.playlistId })
    .from(schema.playlistsToSongs)
    .where(eq(schema.playlistsToSongs.songId, id))

  const artistIds = artists.map((a) => a.artistId)
  const playlistIds = playlists.map((p) => p.playlistId)

  const [deletedSong] = await database
    .delete(schema.songs)
    .where(eq(schema.songs.id, id))
    .returning()

  await updateArtistStatsForSong([], artistIds)
  if (songToDelete.albumId) {
    await updateAlbumStatsForSong(null, songToDelete.albumId)
  }
  if (playlistIds.length > 0) {
    await updatePlaylistStatsForSong([], playlistIds)
  }

  await deleteFile("songs", deletedSong.file)

  if (deletedSong.thumbnail) {
    await deleteFile("thumbnails", deletedSong.thumbnail)
  }

  return deletedSong
}
