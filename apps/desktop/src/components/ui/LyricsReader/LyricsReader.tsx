import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useStickToIndex } from "@hooks/useStickToIndex"

import { LyricLine } from "./LyricLine"

import { NotFound, VirtualizedListWithHeaders } from "@components/ui"

import { type Virtualizer } from "@tanstack/react-virtual"

import { type LyricsReaderProps } from "./types"

const LyricsReader = ({ lyrics, currentTime, onSeek, ...props }: LyricsReaderProps) => {
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

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const virtualizerRef = useRef<Virtualizer<HTMLElement, Element> | null>(null)
  const [stickEnabled, setStickEnabled] = useState(false)

  useStickToIndex({
    targetIndex: filteredActiveIndex,
    enabled: stickEnabled,
    behavior: "smooth",
    selector: (index) => `[data-lyric-index="${index}"]`,
    scrollRef: scrollRef,
    resumeDelay: 1000,
    resumeOnSignificantChange: true,
    initialScroll: false,
    initialBehavior: "instant",
    virtualizer: virtualizerRef
  })

  const keyExtractor = useCallback((_: unknown, index: number) => String(index), [])

  useEffect(() => {
    setStickEnabled(false)

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" })
    }

    const timer = setTimeout(() => {
      setStickEnabled(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [lyrics])

  return (
    <VirtualizedListWithHeaders
      {...props}
      data={filteredLyrics}
      keyExtractor={keyExtractor}
      onScrollRef={(ref) => {
        scrollRef.current = ref.current
      }}
      onVirtualizer={(virtualizer) => {
        virtualizerRef.current = virtualizer
      }}
      ListEmptyComponent={props.ListEmptyComponent ?? NotFound}
      renderItem={({ item, index }) => {
        const isActive = index === filteredActiveIndex

        return (
          <div className="py-1.5">
            <LyricLine
              lyric={item}
              isActive={isActive}
              onClick={() => onSeek(item.startTime)}
              index={index}
            />
          </div>
        )
      }}
    />
  )
}

export { LyricsReader }
