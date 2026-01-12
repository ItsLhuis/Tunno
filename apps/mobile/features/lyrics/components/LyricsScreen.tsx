import { Fragment, useCallback, useMemo } from "react"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { KeyboardSpacer, LyricsReader, NotFound, type ScrollHeaderProps } from "@components/ui"

import { LyricsHeader } from "./LyricsHeader"
import { LyricsStickyHeader } from "./LyricsStickyHeader"

import { State } from "react-native-track-player"

const LyricsScreen = () => {
  const styles = useStyles(lyricsScreenStyles)

  const bottomPlayerHeight = useBottomPlayerHeight()

  const { currentTrackId, seekTo, cachedSongs, position, playbackState } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      seekTo: state.seekTo,
      cachedSongs: state.cachedSongs,
      position: state.position,
      playbackState: state.playbackState
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
        isPlaying={playbackState === State.Playing}
        contentContainerStyle={styles.contentContainer(lyrics.length === 0, bottomPlayerHeight)}
      />
      <KeyboardSpacer />
    </Fragment>
  )
}

const lyricsScreenStyles = createStyleSheet(({ theme }) => ({
  contentContainer: (isEmpty: boolean, bottomOffset: number) =>
    viewStyle({
      padding: theme.space("lg"),
      paddingBottom: theme.space("lg") + bottomOffset,
      ...(isEmpty && {
        flex: 1
      })
    })
}))

export { LyricsScreen }
