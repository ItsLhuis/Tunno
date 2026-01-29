import { useCallback } from "react"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { State } from "react-native-track-player"

import { type PlaySource } from "@features/player/types/playSource"

type UseSongPlaybackOptions = {
  queuePlayback?: boolean
  queueIndex?: number
}

export function useSongPlayback(
  songId: number,
  allSongIds?: number[],
  playSource: PlaySource = "songs",
  sourceContextId?: number,
  options?: UseSongPlaybackOptions
) {
  const { queuePlayback = false, queueIndex } = options ?? {}

  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const playbackState = usePlayerStore((state) => state.playbackState)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)

  const loadTracks = usePlayerStore((state) => state.loadTracks)
  const play = usePlayerStore((state) => state.play)
  const pause = usePlayerStore((state) => state.pause)
  const skipToTrack = usePlayerStore((state) => state.skipToTrack)

  const isCurrentlyPlaying = currentTrackId === songId && playbackState === State.Playing

  const handlePlaySong = useCallback(async () => {
    if (currentTrackId !== null) {
      if (currentTrackId === songId && playbackState === State.Playing) {
        await pause()
        return
      }

      if (currentTrackId === songId && playbackState === State.Paused) {
        await play()
        return
      }
    }

    if (queuePlayback && queueIndex !== undefined) {
      await skipToTrack(queueIndex)
      await play()
      return
    }

    if (allSongIds && allSongIds.length > 0) {
      const targetIdIndex = allSongIds.findIndex((id) => id === songId)
      if (targetIdIndex >= 0) {
        await loadTracks(allSongIds, targetIdIndex, playSource, sourceContextId)
        await play()
      }
    } else {
      await loadTracks([songId], 0, playSource, sourceContextId)
      await play()
    }
  }, [
    currentTrackId,
    songId,
    playbackState,
    pause,
    play,
    queuePlayback,
    queueIndex,
    skipToTrack,
    allSongIds,
    loadTracks,
    playSource,
    sourceContextId
  ])

  return {
    isCurrentlyPlaying,
    isTrackLoading,
    handlePlaySong
  }
}
