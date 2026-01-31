import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useStickToIndex } from "@hooks/useStickToIndex"

import { LyricLine } from "./LyricLine"

import { IconButton, NotFound, VirtualizedListWithHeaders } from "@components/ui"
import { Fade } from "@components/ui/Fade"

import { type Virtualizer } from "@tanstack/react-virtual"

import { type LyricsReaderProps } from "./types"

const LyricsReader = ({ lyrics, currentTime, onSeek, ...props }: LyricsReaderProps) => {
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

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const virtualizerRef = useRef<Virtualizer<HTMLElement, Element> | null>(null)

  const [enabled, setEnabled] = useState(false)

  const { isStuck, stick, enableStick } = useStickToIndex({
    targetIndex: filteredActiveIndex,
    enabled,
    behavior: "smooth",
    selector: (index) => `[data-lyric-index="${index}"]`,
    scrollRef,
    initialScroll: true,
    virtualizer: virtualizerRef
  })

  const keyExtractor = useCallback((_: unknown, index: number) => String(index), [])

  useEffect(() => {
    setEnabled(false)

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" })
    }

    const timer = setTimeout(() => {
      setEnabled(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [lyrics])

  return (
    <div className="relative size-full">
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
                onClick={() => {
                  onSeek(item.startTime)
                  enableStick()
                }}
                index={index}
              />
            </div>
          )
        }}
      />
      <Fade show={enabled && !isStuck} className="absolute right-6 bottom-6 z-50">
        <IconButton name="ListEnd" variant="outline" className="rounded-full" onClick={stick} />
      </Fade>
    </div>
  )
}

export { LyricsReader }
