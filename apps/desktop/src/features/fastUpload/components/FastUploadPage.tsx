import { useCallback, useEffect, useRef } from "react"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { cleanupAllFastUploadCache } from "../api/tauri"

import { NotFound, Spinner, VirtualizedListWithHeaders } from "@components/ui"

import { FastUploadHeader } from "./FastUploadHeader"
import { FastUploadStickyHeader } from "./FastUploadStickyHeader"
import { TrackItem } from "./TrackItem"

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
  const hasCleanedOnMount = useRef(false)

  useEffect(() => {
    const cleanupOldCache = async () => {
      if (!hasCleanedOnMount.current && status === "idle" && !processId) {
        await cleanupAllFastUploadCache()
        hasCleanedOnMount.current = true
      }
    }

    cleanupOldCache()
  }, [status, processId])

  useEffect(() => {
    if (status === "processing" && scrollRef.current && currentTrackIndex > 0) {
      const scrollEl = scrollRef.current

      const preventScroll = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
      }

      scrollEl.addEventListener("wheel", preventScroll, { passive: false })
      scrollEl.addEventListener("touchmove", preventScroll, { passive: false })

      const timer = setTimeout(() => {
        const itemHeight = 80
        const scrollTop = currentTrackIndex * itemHeight
        scrollEl.scrollTo({ top: scrollTop, behavior: "smooth" })

        setTimeout(() => {
          scrollEl.removeEventListener("wheel", preventScroll)
          scrollEl.removeEventListener("touchmove", preventScroll)
        }, 1000)
      }, 100)

      return () => {
        clearTimeout(timer)
        scrollEl.removeEventListener("wheel", preventScroll)
        scrollEl.removeEventListener("touchmove", preventScroll)
      }
    }
  }, [status, currentTrackIndex])

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
      gap={8}
      renderItem={({ item }) => <TrackItem track={item} processId={processId} />}
      layout="list"
      onScrollRef={(ref) => {
        scrollRef.current = ref.current
      }}
    />
  )
}

export { FastUploadPage }
