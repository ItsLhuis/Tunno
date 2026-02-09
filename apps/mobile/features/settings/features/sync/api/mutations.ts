import { database, schema } from "@database/client"

import { eq, sql } from "drizzle-orm"

import {
  type SyncAlbumData,
  type SyncArtistData,
  type SyncPlaylistData,
  type SyncSongData
} from "../types"

/**
 * Inserts a synced artist into the local database.
 *
 * @param data - The artist metadata received from the desktop batch API.
 * @param thumbnailFilename - The locally saved thumbnail filename, or `null` if no thumbnail.
 * @returns A Promise that resolves to the newly inserted artist's database ID.
 */
export async function insertSyncedArtist(
  data: SyncArtistData,
  thumbnailFilename: string | null
): Promise<number> {
  const [artist] = await database
    .insert(schema.artists)
    .values({
      name: data.name,
      isFavorite: data.isFavorite,
      thumbnail: thumbnailFilename,
      fingerprint: data.fingerprint
    })
    .returning({ id: schema.artists.id })

  return artist.id
}

/**
 * Inserts a synced album into the local database.
 *
 * @param data - The album metadata received from the desktop batch API.
 * @param thumbnailFilename - The locally saved thumbnail filename, or `null` if no thumbnail.
 * @returns A Promise that resolves to the newly inserted album's database ID.
 */
export async function insertSyncedAlbum(
  data: SyncAlbumData,
  thumbnailFilename: string | null
): Promise<number> {
  const [album] = await database
    .insert(schema.albums)
    .values({
      name: data.name,
      albumType: data.albumType as "single" | "album" | "compilation",
      releaseYear: data.releaseYear,
      isFavorite: data.isFavorite,
      thumbnail: thumbnailFilename,
      fingerprint: data.fingerprint
    })
    .returning({ id: schema.albums.id })

  return album.id
}

/**
 * Inserts a synced playlist into the local database.
 *
 * @param data - The playlist metadata received from the desktop batch API.
 * @returns A Promise that resolves to the newly inserted playlist's database ID.
 */
export async function insertSyncedPlaylist(
  data: SyncPlaylistData,
  thumbnailFilename: string | null
): Promise<number> {
  const [playlist] = await database
    .insert(schema.playlists)
    .values({
      name: data.name,
      isFavorite: data.isFavorite,
      thumbnail: thumbnailFilename,
      fingerprint: data.fingerprint
    })
    .returning({ id: schema.playlists.id })

  return playlist.id
}

/**
 * Inserts a synced song into the local database.
 *
 * Parses the JSON lyrics string from the desktop response into the expected
 * `{ text: string; startTime: number }[]` format.
 *
 * @param data - The song metadata received from the desktop batch API.
 * @param audioFilename - The locally saved audio filename.
 * @param thumbnailFilename - The locally saved thumbnail filename, or `null` if no thumbnail.
 * @param albumId - The local database ID of the song's album, or `null` if unassigned.
 * @returns A Promise that resolves to the newly inserted song's database ID.
 */
export async function insertSyncedSong(
  data: SyncSongData,
  audioFilename: string,
  thumbnailFilename: string | null,
  albumId: number | null
): Promise<number> {
  const lyricsValue =
    data.lyrics !== null ? (JSON.parse(data.lyrics) as { text: string; startTime: number }[]) : []

  const [song] = await database
    .insert(schema.songs)
    .values({
      name: data.name,
      duration: data.duration,
      releaseYear: data.releaseYear,
      isFavorite: data.isFavorite,
      lyrics: lyricsValue,
      file: audioFilename,
      thumbnail: thumbnailFilename,
      albumId,
      fingerprint: data.fingerprint
    })
    .returning({ id: schema.songs.id })

  return song.id
}

/**
 * Creates associations between a song and its artists in the `song_artists` join table.
 *
 * Uses `onConflictDoNothing` to safely handle cases where the association already exists.
 *
 * @param songId - The local database ID of the song.
 * @param artistIds - An array of local artist database IDs to associate.
 * @param artistOrders - An array of ordering values corresponding to each artist.
 * @returns A Promise that resolves when all associations have been created.
 */
export async function linkSongToArtists(
  songId: number,
  artistIds: number[],
  artistOrders: number[]
): Promise<void> {
  if (artistIds.length === 0) return

  await database
    .insert(schema.songsToArtists)
    .values(
      artistIds.map((artistId, index) => ({
        songId,
        artistId,
        artistOrder: artistOrders[index] ?? index
      }))
    )
    .onConflictDoNothing({
      target: [schema.songsToArtists.songId, schema.songsToArtists.artistId]
    })
}

/**
 * Creates associations between an album and its artists in the `album_artists` join table.
 *
 * Uses `onConflictDoNothing` to safely handle cases where the association already exists.
 *
 * @param albumId - The local database ID of the album.
 * @param artistIds - An array of local artist database IDs to associate.
 * @param artistOrders - An array of ordering values corresponding to each artist.
 * @returns A Promise that resolves when all associations have been created.
 */
export async function linkAlbumToArtists(
  albumId: number,
  artistIds: number[],
  artistOrders: number[]
): Promise<void> {
  if (artistIds.length === 0) return

  await database
    .insert(schema.albumsToArtists)
    .values(
      artistIds.map((artistId, index) => ({
        albumId,
        artistId,
        artistOrder: artistOrders[index] ?? index
      }))
    )
    .onConflictDoNothing({
      target: [schema.albumsToArtists.albumId, schema.albumsToArtists.artistId]
    })
}

/**
 * Creates associations between a song and its playlists in the `playlist_songs` join table.
 *
 * Uses `onConflictDoNothing` to safely handle cases where the association already exists.
 *
 * @param songId - The local database ID of the song.
 * @param playlistIds - An array of local playlist database IDs to associate.
 * @returns A Promise that resolves when all associations have been created.
 */
export async function linkSongToPlaylists(songId: number, playlistIds: number[]): Promise<void> {
  if (playlistIds.length === 0) return

  await database
    .insert(schema.playlistsToSongs)
    .values(playlistIds.map((playlistId) => ({ playlistId, songId })))
    .onConflictDoNothing({
      target: [schema.playlistsToSongs.playlistId, schema.playlistsToSongs.songId]
    })
}

/**
 * Recalculates and updates the `totalTracks` and `totalDuration` fields for all
 * artists, albums, and playlists affected by the sync.
 *
 * Deduplicates IDs before processing to avoid redundant queries.
 *
 * @param artistIds - An array of artist IDs that need stats recalculated.
 * @param albumIds - An array of album IDs that need stats recalculated.
 * @param playlistIds - An array of playlist IDs that need stats recalculated.
 * @returns A Promise that resolves when all statistics have been updated.
 */
export async function updateAggregateStats(
  artistIds: number[],
  albumIds: number[],
  playlistIds: number[]
): Promise<void> {
  const uniqueArtistIds = [...new Set(artistIds)]
  const uniqueAlbumIds = [...new Set(albumIds)]
  const uniquePlaylistIds = [...new Set(playlistIds)]

  await Promise.all([
    ...uniqueArtistIds.map((artistId) => updateArtistStats(artistId)),
    ...uniqueAlbumIds.map((albumId) => updateAlbumStats(albumId)),
    ...uniquePlaylistIds.map((playlistId) => updatePlaylistStats(playlistId))
  ])
}

/**
 * Recalculates and updates the total tracks and total duration for a given artist.
 * @param artistId - The ID of the artist whose statistics need to be updated.
 * @returns A Promise that resolves when the artist statistics have been updated.
 */
async function updateArtistStats(artistId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(DISTINCT ${schema.songsToArtists.songId})`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.songsToArtists)
    .innerJoin(schema.songs, eq(schema.songsToArtists.songId, schema.songs.id))
    .where(eq(schema.songsToArtists.artistId, artistId))
    .groupBy(schema.songsToArtists.artistId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.artists)
    .set({ totalTracks, totalDuration })
    .where(eq(schema.artists.id, artistId))
}

/**
 * Recalculates and updates the total tracks and total duration for a given album.
 * @param albumId - The ID of the album whose statistics need to be updated.
 * @returns A Promise that resolves when the album statistics have been updated.
 */
async function updateAlbumStats(albumId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(*)`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.songs)
    .where(eq(schema.songs.albumId, albumId))
    .groupBy(schema.songs.albumId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.albums)
    .set({ totalTracks, totalDuration })
    .where(eq(schema.albums.id, albumId))
}

/**
 * Recalculates and updates the total tracks and total duration for a given playlist.
 * @param playlistId - The ID of the playlist whose statistics need to be updated.
 * @returns A Promise that resolves when the playlist statistics have been updated.
 */
async function updatePlaylistStats(playlistId: number): Promise<void> {
  const stats = await database
    .select({
      totalTracks: sql<number>`COUNT(*)`,
      totalDuration: sql<number>`COALESCE(SUM(${schema.songs.duration}), 0)`
    })
    .from(schema.playlistsToSongs)
    .innerJoin(schema.songs, eq(schema.playlistsToSongs.songId, schema.songs.id))
    .where(eq(schema.playlistsToSongs.playlistId, playlistId))
    .groupBy(schema.playlistsToSongs.playlistId)

  const { totalTracks = 0, totalDuration = 0 } = stats[0] || {}

  await database
    .update(schema.playlists)
    .set({ totalTracks, totalDuration })
    .where(eq(schema.playlists.id, playlistId))
}
