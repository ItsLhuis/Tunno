import { getRenderableFileSrc } from "@services/storage"

import { type Track } from "../types/player"

import { type SongWithRelations } from "@repo/api"

export const convertSongToTrack = async (song: SongWithRelations): Promise<Track> => {
  const audioUrl = await getRenderableFileSrc(song.file, "songs")
  const artworkUrl = song.thumbnail
    ? await getRenderableFileSrc(song.thumbnail, "thumbnails")
    : undefined

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

export const convertSongsToTracks = async (songs: SongWithRelations[]): Promise<Track[]> => {
  return Promise.all(songs.map(convertSongToTrack))
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
