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
