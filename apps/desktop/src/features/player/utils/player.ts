import { getRenderableFileSrc } from "@services/storage"

import { queryClient } from "@lib/queryClient"

import { songKeys } from "@repo/api"

import { LRUCache } from "@repo/utils"

import {
  getSongByIdWithMainRelations,
  getSongsByIdsWithMainRelations
} from "@features/songs/api/queries"

import defaultArtwork from "@assets/images/app/icon.png"

import { type SongWithMainRelations } from "@repo/api"

import { type Track } from "../types/player"

const MAX_CACHE_SIZE = 150

const audioUrlCache = new LRUCache<string, string>(MAX_CACHE_SIZE)
const artworkUrlCache = new LRUCache<string, string>(MAX_CACHE_SIZE)

/**
 * Resolves a `SongWithMainRelations` object into a `Track` object compatible with `@track-player/web`.
 * This function also handles caching of audio and artwork URLs to optimize performance.
 *
 * @param song - The `SongWithMainRelations` object to resolve.
 * @returns A promise that resolves to a `Track` object.
 */
export async function resolveTrack(song: SongWithMainRelations): Promise<Track> {
  let audioUrl = audioUrlCache.get(song.file)

  if (!audioUrl) {
    audioUrl = await getRenderableFileSrc(song.file, "songs")
    audioUrlCache.set(song.file, audioUrl)
  }

  let artworkUrl: string | undefined

  if (song.thumbnail) {
    artworkUrl = artworkUrlCache.get(song.thumbnail as string)
    if (!artworkUrl) {
      artworkUrl = await getRenderableFileSrc(song.thumbnail as string, "thumbnails")
      artworkUrlCache.set(song.thumbnail as string, artworkUrl)
    }
  } else {
    artworkUrl = defaultArtwork
  }

  return {
    ...song,
    id: song.id,
    url: audioUrl,
    title: song.name,
    artist: song.artists.map((a) => a.artist.name).join(", "),
    album: song.album?.name,
    artwork: artworkUrl,
    duration: song.duration,
    isLiveStream: false
  }
}

/**
 * Retrieves a song with its main relations from the `queryClient` cache, or fetches it from the API if not found.
 * This ensures that song data is consistently managed and reduces redundant API calls.
 *
 * @param id - The ID of the song to retrieve.
 * @returns A promise that resolves to a `SongWithMainRelations` object or `null` if the song cannot be found.
 */
export async function getSongFromCacheOrFetch(id: number): Promise<SongWithMainRelations | null> {
  const cacheKey = songKeys.detailsWithMainRelations(id)
  const cachedSong = queryClient.getQueryData(cacheKey)

  if (cachedSong) {
    return cachedSong as SongWithMainRelations
  }

  const song = await getSongByIdWithMainRelations(id)

  if (song) {
    queryClient.setQueryData(cacheKey, song)
  }

  return song || null
}

/**
 * Prefetches a list of songs with their main relations and stores them in the `queryClient` cache.
 * This is used to proactively load song data in the background, improving user experience by reducing loading times.
 *
 * @param ids - An array of song IDs to prefetch.
 * @returns A promise that resolves when all specified songs have been prefetched and cached.
 */
export async function prefetchSongs(ids: number[]): Promise<void> {
  const uncachedIds = ids.filter(
    (id) => !queryClient.getQueryData(songKeys.detailsWithMainRelations(id))
  )

  if (uncachedIds.length === 0) return

  const songs = await getSongsByIdsWithMainRelations(uncachedIds)

  songs.forEach((song) => {
    queryClient.setQueryData(songKeys.detailsWithMainRelations(song.id), song)
  })
}

/**
 * Applies a cubic curve to a linear volume value (0-1) to create a more perceptually linear volume progression.
 * Human hearing perceives loudness logarithmically, so a simple linear scaling of volume might not sound natural.
 * This curve attempts to make changes in volume sliders feel more evenly distributed.
 *
 * @param linearValue - The linear volume value, typically between 0 and 1.
 * @returns The transformed volume value, where changes feel more natural to the ear.
 */
export function volumeCurve(linearValue: number): number {
  if (linearValue <= 0) return 0
  if (linearValue >= 1) return 1

  return Math.pow(linearValue, 3)
}

/**
 * Applies the inverse cubic curve to a perceptually linear volume value (0-1) to get the original linear value.
 * This is used to convert a "perceptual" gain value (e.g., from a UI slider that uses `volumeCurve`)
 * back to a linear scale for internal processing or setting native volume.
 *
 * @param gainValue - The perceptually linear volume value, typically between 0 and 1.
 * @returns The original linear volume value.
 */
export function inverseVolumeCurve(gainValue: number): number {
  if (gainValue <= 0) return 0
  if (gainValue >= 1) return 1

  return Math.pow(gainValue, 1 / 3)
}

/**
 * Converts a linear volume value (0-1) into a percentage (0-100), rounded to the nearest integer.
 * This is primarily used for displaying volume levels in the user interface.
 *
 * @param linearValue - The linear volume value, typically between 0 and 1.
 * @returns The volume as a percentage (0-100).
 */
export function volumePercentage(linearValue: number): number {
  return Math.round(linearValue * 100)
}

/**
 * Clears the audio and artwork URL caches for a specific song.
 * This is useful when a song's file or thumbnail might have changed, or when
 * a track's metadata is updated, ensuring that fresh URLs are fetched next time.
 *
 * @param song - The `SongWithMainRelations` object whose caches need to be cleared.
 */
export function clearTrackCaches(song: SongWithMainRelations) {
  audioUrlCache.delete(song.file)

  if (song.thumbnail) {
    artworkUrlCache.delete(song.thumbnail as string)
  }
}
