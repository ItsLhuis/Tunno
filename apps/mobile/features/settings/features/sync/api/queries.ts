import { database, schema } from "@database/client"

import { eq, isNotNull } from "drizzle-orm"

import type { SyncCompareRequest } from "../types"

/**
 * Retrieves all non-null fingerprints from the local database, grouped by entity type.
 *
 * This function queries only the `fingerprint` column from each table for performance,
 * avoiding loading full entity data. The result is sent to the desktop's compare endpoint
 * to determine which entities are missing on mobile.
 *
 * @returns A Promise that resolves to a {@link SyncCompareRequest} containing fingerprint arrays
 *          for songs, albums, artists, and playlists.
 */
export async function getAllLocalFingerprints(): Promise<SyncCompareRequest> {
  const [songRows, albumRows, artistRows, playlistRows] = await Promise.all([
    database
      .select({ fingerprint: schema.songs.fingerprint })
      .from(schema.songs)
      .where(isNotNull(schema.songs.fingerprint)),
    database
      .select({ fingerprint: schema.albums.fingerprint })
      .from(schema.albums)
      .where(isNotNull(schema.albums.fingerprint)),
    database
      .select({ fingerprint: schema.artists.fingerprint })
      .from(schema.artists)
      .where(isNotNull(schema.artists.fingerprint)),
    database
      .select({ fingerprint: schema.playlists.fingerprint })
      .from(schema.playlists)
      .where(isNotNull(schema.playlists.fingerprint))
  ])

  return {
    songFingerprints: songRows.map((r) => r.fingerprint!),
    albumFingerprints: albumRows.map((r) => r.fingerprint!),
    artistFingerprints: artistRows.map((r) => r.fingerprint!),
    playlistFingerprints: playlistRows.map((r) => r.fingerprint!)
  }
}

/**
 * Looks up an artist in the local database by its fingerprint.
 * @param fingerprint - The SHA-256 fingerprint of the artist.
 * @returns A Promise that resolves to an object containing the artist's `id`, or `null` if not found.
 */
export async function getArtistByFingerprint(fingerprint: string) {
  const [artist] = await database
    .select({ id: schema.artists.id })
    .from(schema.artists)
    .where(eq(schema.artists.fingerprint, fingerprint))

  return artist ?? null
}

/**
 * Looks up an album in the local database by its fingerprint.
 * @param fingerprint - The SHA-256 fingerprint of the album.
 * @returns A Promise that resolves to an object containing the album's `id`, or `null` if not found.
 */
export async function getAlbumByFingerprint(fingerprint: string) {
  const [album] = await database
    .select({ id: schema.albums.id })
    .from(schema.albums)
    .where(eq(schema.albums.fingerprint, fingerprint))

  return album ?? null
}

/**
 * Looks up a playlist in the local database by its fingerprint.
 * @param fingerprint - The SHA-256 fingerprint of the playlist.
 * @returns A Promise that resolves to an object containing the playlist's `id`, or `null` if not found.
 */
export async function getPlaylistByFingerprint(fingerprint: string) {
  const [playlist] = await database
    .select({ id: schema.playlists.id })
    .from(schema.playlists)
    .where(eq(schema.playlists.fingerprint, fingerprint))

  return playlist ?? null
}

/**
 * Looks up a song in the local database by its fingerprint.
 * @param fingerprint - The SHA-256 fingerprint of the song.
 * @returns A Promise that resolves to an object containing the song's `id`, or `null` if not found.
 */
export async function getSongByFingerprint(fingerprint: string) {
  const [song] = await database
    .select({ id: schema.songs.id })
    .from(schema.songs)
    .where(eq(schema.songs.fingerprint, fingerprint))

  return song ?? null
}
