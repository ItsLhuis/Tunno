import { getRenderableFileSrc } from "@services/storage"

import { type SongWithMainRelations } from "@repo/api"

import { queryClient } from "@lib/queryClient"

import { songKeys } from "@repo/api"

import { getSongByIdWithMainRelations, getSongsByIdsWithMainRelations } from "../api/queries"

import { type Track } from "../types/player"

import defaultArtwork from "@assets/images/app/icon.png"

const MAX_CACHE_SIZE = 1000

const audioUrlCache = new Map<string, string>()
const artworkUrlCache = new Map<string, string>()

const setWithEviction = (map: Map<string, string>, key: string, value: string) => {
  if (map.size >= MAX_CACHE_SIZE) {
    const firstKey = map.keys().next().value as string
    map.delete(firstKey)
  }
  map.set(key, value)
}

export const resolveTrack = async (song: SongWithMainRelations): Promise<Track> => {
  let audioUrl = audioUrlCache.get(song.file)
  if (!audioUrl) {
    audioUrl = await getRenderableFileSrc(song.file, "songs")
    setWithEviction(audioUrlCache, song.file, audioUrl)
  }

  let artworkUrl: string | undefined
  if (song.thumbnail) {
    artworkUrl = artworkUrlCache.get(song.thumbnail as string)
    if (!artworkUrl) {
      artworkUrl = await getRenderableFileSrc(song.thumbnail as string, "thumbnails")
      setWithEviction(artworkUrlCache, song.thumbnail as string, artworkUrl)
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

export const getSongFromCacheOrFetch = async (
  id: number
): Promise<SongWithMainRelations | null> => {
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

export const prefetchSongs = async (ids: number[]): Promise<void> => {
  const uncachedIds = ids.filter(
    (id) => !queryClient.getQueryData(songKeys.detailsWithMainRelations(id))
  )

  if (uncachedIds.length === 0) return

  const songs = await getSongsByIdsWithMainRelations(uncachedIds)

  songs.forEach((song) => {
    queryClient.setQueryData(songKeys.detailsWithMainRelations(song.id), song)
  })
}

export const volumeCurve = (linearValue: number): number => {
  if (linearValue <= 0) return 0
  if (linearValue >= 1) return 1

  const minDb = -60
  const maxDb = 0

  const db = minDb + (maxDb - minDb) * linearValue
  return Math.pow(10, db / 20)
}

export const inverseVolumeCurve = (gainValue: number): number => {
  if (gainValue <= 0) return 0
  if (gainValue >= 1) return 1

  const minDb = -60
  const maxDb = 0

  const db = 20 * Math.log10(gainValue)
  return (db - minDb) / (maxDb - minDb)
}

export const volumePercentage = (linearValue: number): number => {
  return Math.round(linearValue * 100)
}

export const clearTrackCaches = (song: SongWithMainRelations) => {
  audioUrlCache.delete(song.file)
  if (song.thumbnail) {
    artworkUrlCache.delete(song.thumbnail as string)
  }
}
