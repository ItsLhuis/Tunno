import { useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { State } from "@track-player/web"

import { type PlaySource } from "@features/player/types/playSource"

export function useSongPlayback(
  songId: number,
  allSongIds?: number[],
  playSource: PlaySource = "songs",
  sourceContextId?: number
) {
  const { loadTracks, play, pause, currentTrackId, playbackState, isTrackLoading } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      pause: state.pause,
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
