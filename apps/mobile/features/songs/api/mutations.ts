import { database, schema } from "@database/client"

import { eq, inArray } from "drizzle-orm"

import {
  deleteFile,
  saveFileWithUniqueNameFromPath,
  updateFileWithUniqueNameFromPath
} from "@services/storage"

import { updateAlbumStatsForSong } from "./stats/album"
import { updateArtistStatsForSong } from "./stats/artist"
import { updatePlaylistStatsForSong } from "./stats/playlist"

import { type InsertSong, type Song, type UpdateSong } from "@repo/api"

import { generateSongFingerprint } from "@repo/database"

/**
 * Inserts a new song into the database, handling file storage and related artist/album statistics.
 *
 * This function performs the following operations:
 * 1. Saves the song file and an optional thumbnail file to storage, generating unique names.
 * 2. Inserts the song record into the `songs` table in the database.
 * 3. If artists are provided, creates associations between the song and artists in `songsToArtists` table.
 * 4. Updates statistics for associated artists and the album (if `albumId` is provided).
 *
 * @param song - An object containing the song data to be inserted, excluding `file` and `thumbnail` properties.
 * @param artists - An array of artist IDs to associate with the song.
 * @param filePath - The path to the song's audio file.
 * @param thumbnailPath - (Optional) The path to the song's thumbnail image file.
 * @returns A Promise that resolves to the newly created `Song` object.
 */
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

  const artistNames =
    artists.length > 0
      ? (
          await database
            .select({ name: schema.artists.name })
            .from(schema.artists)
            .where(inArray(schema.artists.id, artists))
        ).map((a) => a.name)
      : []

  let albumName: string | null = null
  if (song.albumId) {
    const [album] = await database
      .select({ name: schema.albums.name })
      .from(schema.albums)
      .where(eq(schema.albums.id, song.albumId))
    albumName = album?.name ?? null
  }

  const fingerprint = await generateSongFingerprint(
    song.name,
    song.duration,
    artistNames,
    albumName
  )

  const [createdSong] = await database
    .insert(schema.songs)
    .values({
      ...song,
      file: fileName,
      thumbnail: thumbnailName,
      fingerprint
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

/**
 * Updates an existing song in the database, handling file storage for thumbnails,
 * artist associations, and related album/artist statistics.
 *
 * This function performs the following operations:
 * 1. Fetches the existing song to determine current thumbnail and album associations.
 * 2. Manages the song's thumbnail file based on `thumbnailAction` (keep, update, remove).
 * 3. Updates the song record in the `songs` table with the provided `updates`.
 * 4. If `artists` are provided, it updates the `songsToArtists` associations, first deleting
 *    old associations and then inserting new ones.
 * 5. Updates statistics for affected artists and albums.
 *
 * @param id - The ID of the song to update.
 * @param updates - An object containing the song data to be updated, excluding `thumbnail` property.
 * @param thumbnailAction - (Optional) Specifies how to handle the thumbnail: 'keep', 'update', or 'remove'.
 * @param thumbnailPath - (Optional) The path to the new thumbnail image file if `thumbnailAction` is 'update'.
 * @param artists - (Optional) An array of artist IDs to associate with the song. If provided, replaces existing associations.
 * @returns A Promise that resolves to the updated `Song` object.
 */
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

/**
 * Toggles the `isFavorite` status of a song in the database.
 *
 * This function retrieves the current `isFavorite` status of the specified song
 * and then updates it to the opposite boolean value.
 *
 * @param id - The ID of the song to toggle its favorite status.
 * @returns A Promise that resolves to the updated `Song` object.
 */
export async function toggleSongFavorite(id: number): Promise<Song> {
  const [existingSong] = await database.select().from(schema.songs).where(eq(schema.songs.id, id))

  const [updatedSong] = await database
    .update(schema.songs)
    .set({ isFavorite: !existingSong.isFavorite })
    .where(eq(schema.songs.id, id))
    .returning()

  return updatedSong
}

/**
 * Deletes a song from the database, including its associated files and updating related statistics.
 *
 * This function performs the following operations:
 * 1. Fetches the song's `albumId`, `file`, and `thumbnail` for subsequent cleanup and stat updates.
 * 2. Fetches associated artists and playlists to update their statistics.
 * 3. Deletes the song record from the `songs` table.
 * 4. Updates statistics for associated artists, the album (if applicable), and playlists.
 * 5. Deletes the song's audio file and its thumbnail file from storage.
 *
 * @param id - The ID of the song to delete.
 * @returns A Promise that resolves to the deleted `Song` object.
 * @throws {Error} If the song with the given ID is not found.
 */
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
