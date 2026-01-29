import { useMemo } from "react"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

export function usePlaylistPlayback(playlistId: number, totalTracks: number) {
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const loadTracks = usePlayerStore((state) => state.loadTracks)
  const play = usePlayerStore((state) => state.play)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const { data, isLoading } = useFetchSongIdsByPlaylistIds([playlistId])

  const songIds = useMemo(() => {
    if (!data) return []
    return data
  }, [data])

  const handlePlayPlaylist = async () => {
    if (totalTracks === 0 || songIds.length === 0) return

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
