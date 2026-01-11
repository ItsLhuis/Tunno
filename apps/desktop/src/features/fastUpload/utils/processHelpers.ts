import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { join } from "@tauri-apps/api/path"
import { exists } from "@tauri-apps/plugin-fs"

import { updateAlbum } from "@features/albums/api/mutations"
import { insertArtist, updateArtist } from "@features/artists/api/mutations"

import { isTransientError, isUniqueConstraintError, retryWithBackoff } from "./retry"

import { type EntityCache } from "./entityCache"

import { type CLIArtist, type CLISong } from "../types"

/**
 * A local cache mapping artist names to their database IDs.
 * Used during processing to avoid redundant artist lookups within a single bundle.
 */
type LocalArtistCache = Map<string, number>

export { type LocalArtistCache }

/**
 * Represents the fields of a song that can be updated during processing if a duplicate is found.
 */
type SongUpdateFields = {
  /**
   * The updated lyrics for the song.
   */
  lyrics?: { text: string; startTime: number }[]
  /**
   * The updated duration of the song in seconds.
   */
  duration?: number
  /**
   * The updated release year of the song's album.
   */
  releaseYear?: number | null
}

/**
 * Compares an existing song's data with new metadata from a CLI song and determines
 * which fields need to be updated. This is used when a duplicate song is detected
 * to ensure that only changed metadata is persisted.
 *
 * @param existingSong - The existing song object from the database.
 * @param newMetadata - The new song metadata from the CLI bundle.
 * @returns An object indicating `needsUpdate` (boolean) and the `updates` (object of changed fields).
 */
export function compareAndGetSongUpdates(
  existingSong: { lyrics: any; duration: number; releaseYear: number | null },
  newMetadata: CLISong
): { needsUpdate: boolean; updates: SongUpdateFields } {
  const updates: SongUpdateFields = {}
  let needsUpdate = false

  if (newMetadata.lyrics) {
    const existingLyrics = JSON.stringify(existingSong.lyrics || [])
    const newLyrics = JSON.stringify(newMetadata.lyrics)

    if (existingLyrics !== newLyrics) {
      updates.lyrics = newMetadata.lyrics
      needsUpdate = true
    }
  }

  if (Math.abs(existingSong.duration - newMetadata.duration) > 1) {
    updates.duration = newMetadata.duration
    needsUpdate = true
  }

  const newReleaseYear = newMetadata.album.releaseYear || null
  if (existingSong.releaseYear !== newReleaseYear) {
    updates.releaseYear = newReleaseYear
    needsUpdate = true
  }

  return { needsUpdate, updates }
}

/**
 * Represents the result of processing an artist during the fast upload.
 */
type ProcessArtistResult = {
  /**
   * The ID of the artist in the database.
   */
  artistId: number
  /**
   * Indicates if the artist's thumbnail was updated during this process.
   */
  thumbnailUpdated: boolean
}

/**
 * Processes an artist's metadata from the CLI bundle, ensuring the artist exists in the database
 * and handling thumbnail updates. It utilizes caching to optimize repeated artist lookups.
 *
 * @param artistMeta - The CLI artist metadata.
 * @param cachePath - The path to the fast upload cache directory.
 * @param trackDirName - The directory name of the current track within the cache.
 * @param entityCache - (Optional) The global {@link EntityCache} instance for cross-track caching.
 * @param localCache - (Optional) A local cache for artists processed within the current track.
 * @returns A Promise that resolves to a {@link ProcessArtistResult} containing the artist's ID and if its thumbnail was updated.
 * @throws {Error} If artist creation fails due to unexpected reasons after a unique constraint error.
 */
export async function processArtist(
  artistMeta: CLIArtist,
  cachePath: string,
  trackDirName: string,
  entityCache?: EntityCache,
  localCache?: LocalArtistCache
): Promise<ProcessArtistResult> {
  if (localCache?.has(artistMeta.name)) {
    return {
      artistId: localCache.get(artistMeta.name)!,
      thumbnailUpdated: false
    }
  }

  let thumbnailUpdated = false
  let thumbnailPath: string | null = null

  if (artistMeta.thumbnail) {
    const sourcePath = await join(cachePath, "tracks", trackDirName, artistMeta.thumbnail)
    if (await exists(sourcePath)) {
      thumbnailPath = sourcePath
    }
  }

  const cachedArtist = entityCache?.getArtist(artistMeta.name)

  if (cachedArtist) {
    if (thumbnailPath) {
      try {
        await updateArtist(cachedArtist.id, { name: artistMeta.name }, "update", thumbnailPath)
        entityCache?.updateArtistThumbnail(artistMeta.name, artistMeta.thumbnail)
        thumbnailUpdated = true
      } catch {}
    }

    localCache?.set(artistMeta.name, cachedArtist.id)
    return { artistId: cachedArtist.id, thumbnailUpdated }
  }

  const existingArtistResult = await database
    .select()
    .from(schema.artists)
    .where(eq(schema.artists.name, artistMeta.name))
    .limit(1)

  const existingArtist = existingArtistResult[0]

  if (existingArtist) {
    entityCache?.addArtist(artistMeta.name, existingArtist.id, existingArtist.thumbnail)
    localCache?.set(artistMeta.name, existingArtist.id)

    if (thumbnailPath) {
      try {
        await updateArtist(existingArtist.id, { name: artistMeta.name }, "update", thumbnailPath)
        entityCache?.updateArtistThumbnail(artistMeta.name, artistMeta.thumbnail)
        thumbnailUpdated = true
      } catch {}
    }

    return { artistId: existingArtist.id, thumbnailUpdated }
  }

  try {
    const newArtist = await retryWithBackoff(
      async () =>
        insertArtist(
          {
            name: artistMeta.name,
            isFavorite: false
          },
          thumbnailPath
        ),
      {
        maxAttempts: 5,
        initialDelay: 500,
        shouldRetry: (error) => isTransientError(error) && !isUniqueConstraintError(error)
      }
    )

    entityCache?.addArtist(artistMeta.name, newArtist.id, newArtist.thumbnail)
    localCache?.set(artistMeta.name, newArtist.id)

    return { artistId: newArtist.id, thumbnailUpdated: false }
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      const retryResult = await database
        .select()
        .from(schema.artists)
        .where(eq(schema.artists.name, artistMeta.name))
        .limit(1)

      const retryArtist = retryResult[0]

      if (retryArtist) {
        entityCache?.addArtist(artistMeta.name, retryArtist.id, retryArtist.thumbnail)
        localCache?.set(artistMeta.name, retryArtist.id)
        return { artistId: retryArtist.id, thumbnailUpdated: false }
      } else {
        throw new Error(
          `Artist creation failed with unique constraint but re-query returned nothing for ${artistMeta.name}`
        )
      }
    } else {
      throw error
    }
  }
}

/**
 * Checks if an album's thumbnail needs to be updated and performs the update if necessary.
 * This function is typically called after an album has been processed or retrieved from cache,
 * to ensure its thumbnail is up-to-date based on the bundle's metadata.
 *
 * @param albumId - The ID of the album to potentially update.
 * @param albumName - The name of the album.
 * @param albumType - The type of the album.
 * @param albumMeta - The CLI album metadata, containing potential new thumbnail information.
 * @param cachePath - The path to the fast upload cache directory.
 * @param trackDirName - The directory name of the current track within the cache.
 * @param entityCache - (Optional) The global {@link EntityCache} instance.
 * @returns A Promise that resolves to `true` if the thumbnail was updated, `false` otherwise.
 */
export async function updateAlbumThumbnailIfNeeded(
  albumId: number,
  albumName: string,
  albumType: string,
  albumMeta: { thumbnail?: string },
  cachePath: string,
  trackDirName: string,
  entityCache?: EntityCache
): Promise<boolean> {
  if (!albumMeta.thumbnail) {
    return false
  }

  const sourcePath = await join(cachePath, "tracks", trackDirName, albumMeta.thumbnail)

  if (!(await exists(sourcePath))) {
    return false
  }

  try {
    await updateAlbum(
      albumId,
      { name: albumName, albumType: albumType as "single" | "album" | "compilation" },
      "update",
      sourcePath
    )

    entityCache?.updateAlbumThumbnail(albumName, albumType, albumMeta.thumbnail)

    return true
  } catch {
    return false
  }
}
