import { useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { LyricsReader, NotFound } from "@components/ui"

import { LyricsHeader } from "./LyricsHeader"
import { LyricsStickyHeader } from "./LyricsStickyHeader"

const LyricsPage = () => {
  const { currentTrackId, seekTo, cachedSongs, position } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      seekTo: state.seekTo,
      cachedSongs: state.cachedSongs,
      position: state.position
    }))
  )

  if (!currentTrackId) {
    return <NotFound />
  }

  const currentSong = cachedSongs.get(currentTrackId)

  if (!currentSong) {
    return <NotFound />
  }

  const lyrics = currentSong.lyrics ?? []

  const Header = useCallback(() => {
    if (!currentSong) return null
    return <LyricsHeader song={currentSong} />
  }, [currentSong])

  const StickyHeader = useCallback(() => {
    if (!currentSong) return null
    return <LyricsStickyHeader song={currentSong} />
  }, [currentSong])

  return (
    <LyricsReader
      className="p-9 pt-0"
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListEmptyComponent={NotFound}
      lyrics={lyrics}
      estimateItemHeight={40}
      currentTime={position}
      onSeek={seekTo}
    />
  )
}

export { LyricsPage }
