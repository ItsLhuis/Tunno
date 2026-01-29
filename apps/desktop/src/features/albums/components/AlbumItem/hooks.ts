import { useMemo } from "react"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

export function useAlbumPlayback(albumId: number) {
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const loadTracks = usePlayerStore((state) => state.loadTracks)
  const play = usePlayerStore((state) => state.play)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

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
