import { getRenderableFileSrc } from "@services/storage"

import { type SongWithMainRelations } from "@repo/api"

import { queryClient } from "@lib/queryClient"

import { songKeys } from "@repo/api"

import { LRUCache } from "@repo/utils"

import {
  getSongByIdWithMainRelations,
  getSongsByIdsWithMainRelations
} from "@features/songs/api/queries"

import { type Track } from "../types/player"

import defaultArtwork from "@assets/images/app/icon.png"

const MAX_CACHE_SIZE = 150

const audioUrlCache = new LRUCache<string, string>(MAX_CACHE_SIZE)
const artworkUrlCache = new LRUCache<string, string>(MAX_CACHE_SIZE)

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

export function volumeCurve(linearValue: number): number {
  if (linearValue <= 0) return 0
  if (linearValue >= 1) return 1

  return Math.pow(linearValue, 3)
}

export function inverseVolumeCurve(gainValue: number): number {
  if (gainValue <= 0) return 0
  if (gainValue >= 1) return 1

  return Math.pow(gainValue, 1 / 3)
}

export function volumePercentage(linearValue: number): number {
  return Math.round(linearValue * 100)
}

export function clearTrackCaches(song: SongWithMainRelations) {
  audioUrlCache.delete(song.file)
  if (song.thumbnail) {
    artworkUrlCache.delete(song.thumbnail as string)
  }
}
