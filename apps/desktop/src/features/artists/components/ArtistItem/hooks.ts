import { useMemo } from "react"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

export function useArtistPlayback(artistId: number) {
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const loadTracks = usePlayerStore((state) => state.loadTracks)
  const play = usePlayerStore((state) => state.play)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

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
