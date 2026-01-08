import { useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

export function useAlbumPlayback(albumId: number) {
  const { loadTracks, play, isTrackLoading, shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data, isLoading } = useFetchSongIdsByAlbumIds([albumId])

  const songIds = useMemo(() => {
    if (!data) return []
    return data
  }, [data])

  const handlePlayAlbum = async () => {
    if (songIds.length === 0) return

    await loadTracks(songIds, 0, "album", albumId)
    await play()
  }

  const handleShuffleAndPlay = () => {
    if (isShuffling || !songIds || songIds.length === 0) return
    shuffleAndPlay(songIds, "album", albumId)
  }

  return {
    songIds,
    isLoading,
    isTrackLoading,
    isShuffling,
    handlePlayAlbum,
    handleShuffleAndPlay
  }
}
