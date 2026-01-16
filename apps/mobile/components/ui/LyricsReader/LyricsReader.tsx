import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { FlashListWithHeaders } from "@components/ui/ListWithHeader"
import { NotFound } from "@components/ui/NotFound"

import { type FlashListRef } from "@shopify/flash-list"

import { LyricLine } from "./LyricLine"

import { type Lyric, type LyricsReaderProps } from "./types"

const LyricsReader = ({
  lyrics,
  currentTime,
  onSeek,
  isPlaying,
  contentContainerStyle,
  disableAutoFixScroll = true,
  ...props
}: LyricsReaderProps) => {
  const styles = useStyles(lyricsReaderStyles)

  const listRef = useRef<FlashListRef<Lyric>>(null)

  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [stickEnabled, setStickEnabled] = useState(false)

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredLyrics = useMemo(() => {
    return lyrics.filter((lyric, index) => {
      const isEmpty = !lyric.text || lyric.text.trim() === ""
      if (!isEmpty) return true
      if (index === 0) return true
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

  useEffect(() => {
    setStickEnabled(false)
    setIsUserScrolling(false)

    listRef.current?.scrollToOffset({ offset: 0, animated: false })

    const timer = setTimeout(() => {
      setStickEnabled(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [lyrics])

  useEffect(() => {
    if (!isPlaying || !stickEnabled || isUserScrolling || filteredActiveIndex < 0) return

    listRef.current?.scrollToIndex({
      index: filteredActiveIndex,
      animated: true,
      viewPosition: 0.3
    })
  }, [filteredActiveIndex, stickEnabled, isUserScrolling, isPlaying])

  const handleScrollBeginDrag = useCallback(() => {
    setIsUserScrolling(true)
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const handleScrollEndDrag = useCallback(() => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false)
    }, 1000)
  }, [])

  const handleMomentumScrollEnd = useCallback(() => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false)
    }, 1000)
  }, [])

  const keyExtractor = useCallback((_: Lyric, index: number) => String(index), [])

  return (
    <View style={styles.container}>
      <FlashListWithHeaders
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
            <LyricLine lyric={item} isActive={isActive} onPress={() => onSeek(item.startTime)} />
          )
        }}
        {...props}
      />
    </View>
  )
}

const lyricsReaderStyles = createStyleSheet(() => ({
  container: {
    flex: 1
  }
}))

export { LyricsReader }
