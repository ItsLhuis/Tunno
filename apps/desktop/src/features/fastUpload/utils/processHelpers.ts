import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { join } from "@tauri-apps/api/path"
import { exists } from "@tauri-apps/plugin-fs"

import { updateAlbum } from "@features/albums/api/mutations"
import { insertArtist, updateArtist } from "@features/artists/api/mutations"

import { isTransientError, isUniqueConstraintError, retryWithBackoff } from "./retry"

import { type EntityCache } from "./entityCache"

import { type CLIArtist, type CLISong } from "../types"

type LocalArtistCache = Map<string, number>

export { type LocalArtistCache }

type SongUpdateFields = {
  lyrics?: { text: string; startTime: number }[]
  duration?: number
  releaseYear?: number | null
}

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

type ProcessArtistResult = {
  artistId: number
  thumbnailUpdated: boolean
}

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
