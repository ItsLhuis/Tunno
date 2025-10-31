import { useCallback, useEffect, useRef, useState } from "react"

import { type Virtualizer } from "@tanstack/react-virtual"

export type StickToIndexOptions = {
  targetIndex: number
  behavior?: ScrollBehavior
  enabled?: boolean
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
  selector: (index: number) => string
  resumeDelay?: number
  resumeOnSignificantChange?: boolean
  scrollRef?: React.RefObject<HTMLElement>
  initialScroll?: boolean
  initialBehavior?: ScrollBehavior
  gap?: number
  preventUserScroll?: boolean
  effectiveColumns?: number
  virtualizer?: Virtualizer<any, any> | React.RefObject<Virtualizer<any, any> | null>
}

export type StickToIndexReturn = {
  scrollRef: React.RefObject<HTMLElement>
  isStuck: boolean
  isUserScrolling: boolean
  stick: () => void
  unstick: () => void
}

export const useStickToIndex = ({
  targetIndex,
  behavior = "smooth",
  enabled = true,
  block = "center",
  inline = "nearest",
  selector,
  resumeDelay = 3000,
  resumeOnSignificantChange = true,
  scrollRef: externalScrollRef,
  initialScroll = true,
  initialBehavior = "instant",
  gap = 0,
  preventUserScroll = false,
  effectiveColumns = 1,
  virtualizer
}: StickToIndexOptions): StickToIndexReturn => {
  const internalScrollRef = useRef<HTMLElement>(null)
  const scrollRef = externalScrollRef ?? internalScrollRef

  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [isStuck, setIsStuck] = useState(true)

  const isAutoScrollingRef = useRef(false)

  const lastTargetIndexRef = useRef(targetIndex)

  const resumeTimeoutRef = useRef<NodeJS.Timeout>()

  const lastUserInteractionRef = useRef<number>(0)

  const isFirstRenderRef = useRef(true)

  const itemHeightCacheRef = useRef<Map<number, number>>(new Map())

  const scrollAnimationFrameRef = useRef<number>()

  const getVirtualizer = useCallback(() => {
    if (!virtualizer) return null
    if ("current" in virtualizer) {
      return virtualizer.current
    }
    return virtualizer
  }, [virtualizer])

  const measureItemHeight = useCallback(
    (index: number): number | null => {
      const container = scrollRef.current
      if (!container) return null

      if (itemHeightCacheRef.current.has(index)) {
        return itemHeightCacheRef.current.get(index) ?? null
      }

      const element = container.querySelector(selector(index)) as HTMLElement
      if (!element) return null

      const height = element.getBoundingClientRect().height
      itemHeightCacheRef.current.set(index, height)
      return height
    },
    [scrollRef, selector]
  )

  const calculateScrollPosition = useCallback(
    (index: number): number | null => {
      const v = getVirtualizer()
      const container = scrollRef.current
      if (!container) return null

      const targetElement = container.querySelector(selector(index)) as HTMLElement
      if (targetElement) {
        const containerRect = container.getBoundingClientRect()
        const elementRect = targetElement.getBoundingClientRect()

        const currentScrollTop = container.scrollTop
        const elementTopRelativeToContainer = elementRect.top - containerRect.top + currentScrollTop

        let scrollTop = elementTopRelativeToContainer

        if (block === "center") {
          const containerHeight = containerRect.height
          const elementHeight = elementRect.height
          scrollTop = scrollTop - containerHeight / 2 + elementHeight / 2
        } else if (block === "end") {
          const containerHeight = containerRect.height
          const elementHeight = elementRect.height
          scrollTop = scrollTop - containerHeight + elementHeight
        }

        return Math.max(0, scrollTop)
      }

      let scrollTop = 0

      if (v) {
        const rowIndex = Math.floor(index / effectiveColumns)
        const virtualItems = v.getVirtualItems()

        const virtualItem = virtualItems.find((item) => item.index === rowIndex)

        if (virtualItem) {
          scrollTop = virtualItem.start

          if (gap > 0 && rowIndex > 0) {
            scrollTop += rowIndex * gap
          }

          const itemHeight = virtualItem.size || measureItemHeight(index) || 0

          const containerRect = container.getBoundingClientRect()
          const containerHeight = containerRect.height

          if (block === "center") {
            scrollTop = scrollTop - containerHeight / 2 + itemHeight / 2
          } else if (block === "end") {
            scrollTop = scrollTop - containerHeight + itemHeight
          }

          return Math.max(0, scrollTop)
        }

        try {
          const totalSize = v.getTotalSize()
          const itemCount = v.options.count

          if (itemCount > 0 && rowIndex < itemCount) {
            const avgSize = totalSize / itemCount
            scrollTop = rowIndex * avgSize

            if (gap > 0 && rowIndex > 0) {
              scrollTop += rowIndex * gap
            }

            const containerRect = container.getBoundingClientRect()
            const containerHeight = containerRect.height

            if (block === "center") {
              scrollTop = scrollTop - containerHeight / 2 + avgSize / 2
            } else if (block === "end") {
              scrollTop = scrollTop - containerHeight + avgSize
            }

            return Math.max(0, scrollTop)
          }
        } catch {}
      }

      let measuredHeight: number | null = null

      for (let i = 0; i < index; i++) {
        const height = measureItemHeight(i)
        if (height !== null) {
          measuredHeight = height
          scrollTop += height
          if (gap > 0) {
            scrollTop += gap
          }
        } else {
          const cached = itemHeightCacheRef.current.get(i)
          if (cached) {
            scrollTop += cached
            if (gap > 0) {
              scrollTop += gap
            }
          }
        }
      }

      const targetHeight = measureItemHeight(index) || measuredHeight || 0

      if (block === "center" || block === "end") {
        const containerRect = container.getBoundingClientRect()
        const containerHeight = containerRect.height

        if (block === "center") {
          scrollTop = scrollTop - containerHeight / 2 + targetHeight / 2
        } else {
          scrollTop = scrollTop - containerHeight + targetHeight
        }
      }

      return Math.max(0, scrollTop)
    },
    [getVirtualizer, scrollRef, gap, effectiveColumns, block, measureItemHeight, selector]
  )

  const scrollWithPreciseCalculation = useCallback(
    (index: number, scrollBehavior: ScrollBehavior) => {
      const container = scrollRef.current
      if (!container) return false

      const scrollPosition = calculateScrollPosition(index)
      if (scrollPosition === null) return false

      isAutoScrollingRef.current = true

      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current)
      }

      scrollAnimationFrameRef.current = requestAnimationFrame(() => {
        container.scrollTo({
          top: scrollPosition,
          behavior: scrollBehavior
        })

        const scrollDuration = scrollBehavior === "smooth" ? 500 : 0
        setTimeout(() => {
          isAutoScrollingRef.current = false
        }, scrollDuration)
      })

      return true
    },
    [scrollRef, calculateScrollPosition]
  )

  const scrollWithVirtualizer = useCallback(
    (index: number, scrollBehavior: ScrollBehavior) => {
      const v = getVirtualizer()
      if (!v) return false

      const rowIndex = Math.floor(index / effectiveColumns)

      isAutoScrollingRef.current = true

      const align = block as "start" | "center" | "end" | "auto"

      v.scrollToIndex(rowIndex, {
        align,
        behavior: scrollBehavior === "smooth" ? "smooth" : "auto"
      })

      const scrollDuration = scrollBehavior === "smooth" ? 500 : 0
      setTimeout(() => {
        isAutoScrollingRef.current = false
      }, scrollDuration)

      return true
    },
    [getVirtualizer, block, effectiveColumns]
  )

  const scrollWithElement = useCallback(
    (index: number, scrollBehavior: ScrollBehavior) => {
      const container = scrollRef.current
      if (!container) return false

      const targetElement = container.querySelector(selector(index)) as HTMLElement

      if (!targetElement) return false

      isAutoScrollingRef.current = true

      targetElement.scrollIntoView({
        behavior: scrollBehavior,
        block,
        inline
      })

      const scrollDuration = scrollBehavior === "smooth" ? 500 : 0
      setTimeout(() => {
        isAutoScrollingRef.current = false
      }, scrollDuration)

      return true
    },
    [scrollRef, selector, block, inline]
  )

  const scrollToIndex = useCallback(
    (index: number, scrollBehavior: ScrollBehavior = behavior) => {
      if (gap > 0 || (gap === 0 && getVirtualizer())) {
        const success = scrollWithPreciseCalculation(index, scrollBehavior)
        if (success) return
      }

      if (getVirtualizer() && gap === 0) {
        const success = scrollWithVirtualizer(index, scrollBehavior)
        if (success) return
      }

      scrollWithElement(index, scrollBehavior)
    },
    [
      behavior,
      gap,
      getVirtualizer,
      scrollWithPreciseCalculation,
      scrollWithVirtualizer,
      scrollWithElement
    ]
  )

  const stick = useCallback(() => {
    setIsStuck(true)
    setIsUserScrolling(false)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = undefined
    }
    if (targetIndex >= 0) {
      scrollToIndex(targetIndex)
    }
  }, [targetIndex, scrollToIndex])

  const unstick = useCallback(() => {
    setIsStuck(false)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = undefined
    }
  }, [])

  const handleUserInteraction = useCallback(() => {
    if (isAutoScrollingRef.current) return

    lastUserInteractionRef.current = Date.now()
    setIsUserScrolling(true)
    setIsStuck(false)

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    if (resumeDelay > 0) {
      resumeTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false)
        setIsStuck(true)
      }, resumeDelay)
    } else {
      setIsUserScrolling(false)
    }
  }, [resumeDelay])

  const preventScroll = useCallback(
    (e: Event) => {
      if (!isStuck || !preventUserScroll) return
      e.preventDefault()
      e.stopPropagation()
    },
    [isStuck, preventUserScroll]
  )

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !enabled) return

    const handleWheel = (e: WheelEvent) => {
      if (preventUserScroll && isStuck) {
        preventScroll(e)
      } else {
        handleUserInteraction()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (preventUserScroll && isStuck) {
        preventScroll(e)
      } else {
        handleUserInteraction()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (preventUserScroll && isStuck) {
        preventScroll(e)
      } else {
        handleUserInteraction()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const navigationKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]
      if (navigationKeys.includes(e.key)) {
        if (preventUserScroll && isStuck) {
          preventScroll(e)
        } else {
          handleUserInteraction()
        }
      }
    }

    const handleScroll = (e: Event) => {
      if (preventUserScroll && isStuck && !isAutoScrollingRef.current) {
        preventScroll(e)
      } else if (!isAutoScrollingRef.current) {
        handleUserInteraction()
      }
    }

    const wheelOptions = preventUserScroll && isStuck ? { passive: false } : { passive: true }
    const touchOptions = preventUserScroll && isStuck ? { passive: false } : { passive: true }
    const scrollOptions = preventUserScroll && isStuck ? { passive: false } : { passive: true }

    container.addEventListener("wheel", handleWheel, wheelOptions)
    container.addEventListener("touchstart", handleTouchStart, touchOptions)
    container.addEventListener("touchmove", handleTouchMove, touchOptions)
    container.addEventListener("keydown", handleKeyDown, { passive: true })
    container.addEventListener("scroll", handleScroll, scrollOptions)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("keydown", handleKeyDown)
      container.removeEventListener("scroll", handleScroll)

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
      if (scrollAnimationFrameRef.current) {
        cancelAnimationFrame(scrollAnimationFrameRef.current)
      }
    }
  }, [enabled, handleUserInteraction, preventScroll, preventUserScroll, isStuck, scrollRef])

  useEffect(() => {
    if (!enabled || targetIndex < 0) return

    const isFirstRender = isFirstRenderRef.current
    const indexChanged = lastTargetIndexRef.current !== targetIndex
    const significantChange =
      resumeOnSignificantChange && Math.abs(lastTargetIndexRef.current - targetIndex) > 2

    lastTargetIndexRef.current = targetIndex

    if (isFirstRender) {
      isFirstRenderRef.current = false

      if (initialScroll) {
        scrollToIndex(targetIndex, initialBehavior)
      }
      return
    }

    if (significantChange && !isStuck) {
      setIsStuck(true)
      setIsUserScrolling(false)
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = undefined
      }
    }

    if (isStuck && indexChanged) {
      scrollToIndex(targetIndex)
    }
  }, [
    targetIndex,
    enabled,
    isStuck,
    resumeOnSignificantChange,
    scrollToIndex,
    initialScroll,
    initialBehavior
  ])

  return {
    scrollRef: scrollRef as React.RefObject<HTMLElement>,
    isStuck,
    isUserScrolling,
    stick,
    unstick
  }
}
