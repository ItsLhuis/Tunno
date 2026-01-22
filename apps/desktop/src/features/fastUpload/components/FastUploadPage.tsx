import { useCallback, useRef } from "react"

import { useShallow } from "zustand/shallow"

import { useFastUploadStore } from "../stores/useFastUploadStore"

import { useStickToIndex } from "@hooks/useStickToIndex"

import { IconButton, NotFound, Spinner, VirtualizedListWithHeaders } from "@components/ui"
import { Fade } from "@components/ui/Fade"

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

  const keyExtractor = useCallback((item: { id: string }) => item.id, [])

  const isProcessing = status === "processing"

  const { isStuck, stick } = useStickToIndex({
    targetIndex: Math.min(currentTrackIndex, Math.max(0, tracks.length - 1)),
    enabled: isProcessing,
    behavior: "smooth",
    selector: (index) => `[data-track-index="${index}"]`,
    scrollRef: scrollRef,
    initialScroll: true,
    virtualizer: virtualizerRef
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
    <div className="relative size-full">
      <VirtualizedListWithHeaders
        HeaderComponent={Header}
        StickyHeaderComponent={StickyHeader}
        ListEmptyComponent={ListEmpty}
        data={tracks}
        keyExtractor={keyExtractor}
        estimateItemHeight={70}
        gap={8}
        renderItem={({ item, index }) => (
          <div data-track-index={index}>
            <TrackItem index={index} track={item} processId={processId} />
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
      <Fade show={isProcessing && !isStuck} className="absolute right-6 bottom-6 z-50">
        <IconButton name="ListEnd" variant="outline" className="rounded-full" onClick={stick} />
      </Fade>
    </div>
  )
}

export { FastUploadPage }
