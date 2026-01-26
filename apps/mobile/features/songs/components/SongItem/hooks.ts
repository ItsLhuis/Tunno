import { useCallback } from "react"

import { useShallow } from "zustand/shallow"

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

  const { loadTracks, play, pause, skipToTrack, currentTrackId, playbackState, isTrackLoading } =
    usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        pause: state.pause,
        skipToTrack: state.skipToTrack,
        currentTrackId: state.currentTrackId,
        playbackState: state.playbackState,
        isTrackLoading: state.isTrackLoading
      }))
    )

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
