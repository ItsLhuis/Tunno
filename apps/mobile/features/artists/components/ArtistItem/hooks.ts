import { useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

export function useArtistPlayback(artistId: number) {
  const { loadTracks, play, isTrackLoading, shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data, isLoading } = useFetchSongIdsByArtistIds([artistId])

  const songIds = useMemo(() => {
    if (!data) return []
    return data
  }, [data])

  const handlePlayArtist = async () => {
    if (songIds.length === 0) return

    await loadTracks(songIds, 0, "artist", artistId)
    await play()
  }

  const handleShuffleAndPlay = () => {
    if (isShuffling || !songIds || songIds.length === 0) return
    shuffleAndPlay(songIds, "artist", artistId)
  }

  return {
    songIds,
    isLoading,
    isTrackLoading,
    isShuffling,
    handlePlayArtist,
    handleShuffleAndPlay
  }
}
