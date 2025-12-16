import { useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

export function usePlaylistPlayback(playlistId: number, totalTracks: number) {
  const { loadTracks, play, isTrackLoading, shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data, isLoading } = useFetchSongIdsByPlaylistIds([playlistId])

  const songIds = useMemo(() => {
    if (!data) return []
    return data
  }, [data])

  const handlePlayPlaylist = async () => {
    if (totalTracks === 0) return

    await loadTracks(songIds, 0, "playlist", playlistId)
    await play()
  }

  const handleShuffleAndPlay = () => {
    if (isShuffling || !songIds || songIds.length === 0) return
    shuffleAndPlay(songIds, "playlist", playlistId)
  }

  return {
    songIds,
    isLoading,
    isTrackLoading,
    isShuffling,
    handlePlayPlaylist,
    handleShuffleAndPlay
  }
}
