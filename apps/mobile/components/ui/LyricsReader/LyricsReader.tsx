import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import Animated from "react-native-reanimated"

import { useStickToIndex } from "@hooks/useStickToIndex"

import { IconButton } from "@components/ui"
import { Fade } from "@components/ui/Fade"
import { FlatListWithHeaders } from "@components/ui/ListWithHeader"
import { NotFound } from "@components/ui/NotFound"

import { LyricLine } from "./LyricLine"

import { type Lyric, type LyricsReaderProps } from "./types"

const LyricsReader = ({
  lyrics,
  currentTime,
  onSeek,
  contentContainerStyle,
  ...props
}: LyricsReaderProps) => {
  const styles = useStyles(lyricsReaderStyles)

  const listRef = useRef<Animated.FlatList<Lyric> | null>(null)

  const [enabled, setEnabled] = useState(false)

  const filteredLyrics = useMemo(() => {
    return lyrics.filter((lyric, index) => {
      const isEmpty = !lyric.text || lyric.text.trim() === ""

      if (!isEmpty || index === 0) return true

      const prevIsEmpty = !lyrics[index - 1].text || lyrics[index - 1].text.trim() === ""

      return !prevIsEmpty
    })
  }, [lyrics])

  const activeIndex = useMemo(() => {
    if (lyrics.length === 0) return -1

    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (lyrics[i].startTime <= currentTime) return i
    }

    return -1
  }, [lyrics, currentTime])

  const filteredActiveIndex = useMemo(() => {
    if (activeIndex === -1) return -1

    const activeLyric = lyrics[activeIndex]

    return filteredLyrics.findIndex((lyric) => lyric === activeLyric)
  }, [lyrics, filteredLyrics, activeIndex])

  const {
    isStuck,
    stick,
    enableStick,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd
  } = useStickToIndex({
    targetIndex: filteredActiveIndex,
    data: filteredLyrics,
    enabled: enabled,
    listRef: listRef,
    initialScroll: true
  })

  useEffect(() => {
    setEnabled(false)

    listRef.current?.scrollToOffset({ offset: 0, animated: false })

    const timer = setTimeout(() => {
      setEnabled(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [lyrics])

  const keyExtractor = useCallback((_: Lyric, index: number) => String(index), [])

  return (
    <View style={styles.container}>
      <FlatListWithHeaders
        ref={listRef}
        data={filteredLyrics}
        keyExtractor={keyExtractor}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={props.ListEmptyComponent ?? <NotFound />}
        renderItem={({ item, index }) => {
          const isActive = index === filteredActiveIndex

          return (
            <LyricLine
              lyric={item}
              isActive={isActive}
              onPress={() => {
                onSeek(item.startTime)
                enableStick()
              }}
            />
          )
        }}
        {...props}
      />
      <Fade show={enabled && !isStuck} style={styles.syncButtonContainer}>
        <IconButton name="ListEnd" variant="outline" style={styles.syncButton} onPress={stick} />
      </Fade>
    </View>
  )
}

const lyricsReaderStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1
  },
  syncButtonContainer: {
    position: "absolute",
    right: theme.space(9),
    bottom: theme.space(9),
    zIndex: 50
  },
  syncButton: {
    borderRadius: theme.radius("full")
  }
}))

export { LyricsReader }
