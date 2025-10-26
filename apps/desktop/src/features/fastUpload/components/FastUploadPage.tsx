import { useCallback, useEffect, useRef } from "react"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { NotFound, Spinner, VirtualizedListWithHeaders } from "@components/ui"

import { FastUploadHeader } from "./FastUploadHeader"
import { FastUploadStickyHeader } from "./FastUploadStickyHeader"
import { TrackItem } from "./TrackItem"

const ITEM_GAP = 8

const FastUploadPage = () => {
  const { status, tracks, processId, currentTrackIndex } = useFastUploadStore(
    useShallow((state) => ({
      status: state.status,
      tracks: state.tracks,
      processId: state.processId,
      currentTrackIndex: state.currentTrackIndex
    }))
  )

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const itemHeightRef = useRef<number | null>(null)

  useEffect(() => {
    const scrollEl = scrollRef.current
    const isProcessing = status === "processing"

    if (!scrollEl) return

    if (itemHeightRef.current === null && tracks.length > 0) {
      const firstItem = scrollEl.querySelector("[data-track-item]")
      if (firstItem) {
        itemHeightRef.current = firstItem.getBoundingClientRect().height
      }
    }

    const preventScroll = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    if (isProcessing) {
      scrollEl.addEventListener("wheel", preventScroll, { passive: false })
      scrollEl.addEventListener("touchmove", preventScroll, { passive: false })
      scrollEl.addEventListener("keydown", preventScroll, { passive: false })
      scrollEl.addEventListener("scroll", preventScroll, { passive: false })

      if (currentTrackIndex >= 0 && itemHeightRef.current !== null) {
        const totalItemHeight = itemHeightRef.current + ITEM_GAP
        const scrollTop = currentTrackIndex * totalItemHeight

        requestAnimationFrame(() => {
          scrollEl.scrollTo({ top: scrollTop, behavior: "smooth" })
        })
      }
    }

    return () => {
      scrollEl.removeEventListener("wheel", preventScroll)
      scrollEl.removeEventListener("touchmove", preventScroll)
      scrollEl.removeEventListener("keydown", preventScroll)
      scrollEl.removeEventListener("scroll", preventScroll)
    }
  }, [status, currentTrackIndex, tracks.length])

  const Header = useCallback(() => <FastUploadHeader />, [])

  const StickyHeader = useCallback(() => <FastUploadStickyHeader />, [])

  const ListEmpty = useCallback(() => {
    if (status === "validating") {
      return <Spinner />
    }
    return <NotFound />
  }, [status])

  return (
    <VirtualizedListWithHeaders
      className="p-9 pt-0"
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListEmptyComponent={ListEmpty}
      data={tracks}
      keyExtractor={(item) => item.id}
      estimateItemHeight={70}
      gap={ITEM_GAP}
      renderItem={({ item }) => (
        <div data-track-item>
          <TrackItem track={item} processId={processId} />
        </div>
      )}
      layout="list"
      onScrollRef={(ref) => {
        scrollRef.current = ref.current
      }}
    />
  )
}

export { FastUploadPage }
