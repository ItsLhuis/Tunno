import { useCallback, useRef } from "react"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useStickToIndex } from "@hooks/useStickToIndex"

import { NotFound, Spinner, VirtualizedListWithHeaders } from "@components/ui"

import { FastUploadHeader } from "./FastUploadHeader"
import { FastUploadStickyHeader } from "./FastUploadStickyHeader"
import { TrackItem } from "./TrackItem"

import { type Virtualizer } from "@tanstack/react-virtual"

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
  const virtualizerRef = useRef<Virtualizer<HTMLElement, Element> | null>(null)

  useStickToIndex({
    targetIndex: currentTrackIndex,
    enabled: status === "processing",
    behavior: "smooth",
    selector: (index) => `[data-track-index="${index}"]`,
    scrollRef: scrollRef,
    resumeDelay: 2000,
    resumeOnSignificantChange: true,
    initialScroll: false,
    virtualizer: virtualizerRef,
    gap: 8,
    preventUserScroll: status === "processing"
  })

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
      renderItem={({ item, index }) => (
        <div data-track-index={index}>
          <TrackItem track={item} processId={processId} />
        </div>
      )}
      layout="list"
      onScrollRef={(ref) => {
        scrollRef.current = ref.current
      }}
      onVirtualizer={(virtualizer) => {
        virtualizerRef.current = virtualizer
      }}
    />
  )
}

export { FastUploadPage }
