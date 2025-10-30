import { useEffect, useMemo, useRef, useState } from "react"

type UseAutoScrollOptions = {
  activeIndex: number
  enabled?: boolean
  behavior?: ScrollBehavior
  externalRef?: React.RefObject<HTMLDivElement>
}

export const useAutoScroll = ({
  activeIndex,
  enabled = true,
  behavior = "smooth",
  externalRef
}: UseAutoScrollOptions) => {
  const internalRef = useRef<HTMLDivElement>(null)
  const viewportRef = useMemo(() => externalRef ?? internalRef, [externalRef])

  const [isUserScrolling, setIsUserScrolling] = useState(false)

  const isAutoScrollingRef = useRef(false)
  const lastActiveIndexRef = useRef(activeIndex)
  const userScrollDetectedRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !enabled) return

    const handleWheel = () => {
      if (isAutoScrollingRef.current) return
      userScrollDetectedRef.current = true
      setIsUserScrolling(true)
    }

    const handleTouchStart = () => {
      if (isAutoScrollingRef.current) return
      userScrollDetectedRef.current = true
      setIsUserScrolling(true)
    }

    viewport.addEventListener("wheel", handleWheel, { passive: true })
    viewport.addEventListener("touchstart", handleTouchStart, { passive: true })

    return () => {
      viewport.removeEventListener("wheel", handleWheel)
      viewport.removeEventListener("touchstart", handleTouchStart)
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled || activeIndex < 0) return

    const viewport = viewportRef.current
    if (!viewport) return

    if (lastActiveIndexRef.current !== activeIndex) {
      lastActiveIndexRef.current = activeIndex

      if (userScrollDetectedRef.current) {
        userScrollDetectedRef.current = false
        setIsUserScrolling(false)
      }
    }

    if (userScrollDetectedRef.current) return

    const activeElement = viewport.querySelector(
      `[data-lyric-index="${activeIndex}"]`
    ) as HTMLElement

    if (!activeElement) return

    isAutoScrollingRef.current = true

    activeElement.scrollIntoView({
      behavior,
      block: "center",
      inline: "nearest"
    })

    setTimeout(
      () => {
        isAutoScrollingRef.current = false
      },
      behavior === "smooth" ? 500 : 0
    )
  }, [activeIndex, enabled, behavior])

  return {
    viewportRef,
    isUserScrolling
  }
}
