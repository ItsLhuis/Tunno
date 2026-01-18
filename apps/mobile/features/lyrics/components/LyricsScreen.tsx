import { Fragment, useCallback, useMemo } from "react"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { KeyboardSpacer, LyricsReader, NotFound, type ScrollHeaderProps } from "@components/ui"

import { LyricsHeader } from "./LyricsHeader"
import { LyricsStickyHeader } from "./LyricsStickyHeader"

const LyricsScreen = () => {
  const styles = useStyles(lyricsScreenStyles)

  const bottomPlayerHeight = useBottomPlayerHeight()

  const { currentTrackId, seekTo, cachedSongs, position } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      seekTo: state.seekTo,
      cachedSongs: state.cachedSongs,
      position: state.position
    }))
  )

  const currentSong = useMemo(
    () => (currentTrackId ? cachedSongs.get(currentTrackId) : undefined),
    [currentTrackId, cachedSongs]
  )

  const lyrics = useMemo(() => currentSong?.lyrics ?? [], [currentSong])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => (
      <LyricsStickyHeader scrollY={scrollY} showHeader={showHeader} />
    ),
    []
  )

  const LargeHeaderComponent = useCallback(() => {
    if (!currentSong) return null
    return <LyricsHeader song={currentSong} />
  }, [currentSong])

  if (!currentTrackId || !currentSong) {
    return <NotFound />
  }

  return (
    <Fragment>
      <LyricsReader
        key={currentSong.id}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        ListEmptyComponent={NotFound}
        lyrics={lyrics}
        currentTime={position}
        onSeek={seekTo}
        contentContainerStyle={styles.contentContainer(bottomPlayerHeight)}
      />
      <KeyboardSpacer />
    </Fragment>
  )
}

const lyricsScreenStyles = createStyleSheet(({ theme }) => ({
  contentContainer: (bottomOffset: number) =>
    viewStyle({
      flexGrow: 1,
      padding: theme.space("lg"),
      paddingBottom: theme.space("lg") + bottomOffset
    })
}))

export { LyricsScreen }
