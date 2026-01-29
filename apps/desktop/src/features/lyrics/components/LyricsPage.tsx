import { useCallback } from "react"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { LyricsReader, NotFound } from "@components/ui"

import { LyricsHeader } from "./LyricsHeader"
import { LyricsStickyHeader } from "./LyricsStickyHeader"

const LyricsPage = () => {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const cachedSongs = usePlayerStore((state) => state.cachedSongs)
  const position = usePlayerStore((state) => state.position)
  const seekTo = usePlayerStore((state) => state.seekTo)

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
