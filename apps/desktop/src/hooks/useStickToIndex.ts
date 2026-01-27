import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

import { type Virtualizer } from "@tanstack/react-virtual"

/**
 * Options for configuring the {@link useStickToIndex} hook.
 */
export type StickToIndexOptions = {
  targetIndex: number
  selector: (index: number) => string
  enabled?: boolean
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  scrollRef?: RefObject<HTMLElement | null>
  initialScroll?: boolean
  virtualizer?: Virtualizer<any, any> | RefObject<Virtualizer<any, any> | null>
  effectiveColumns?: number
  preventUserScroll?: boolean
}

/**
 * The object returned by the {@link useStickToIndex} hook.
 */
export type StickToIndexReturn = {
  scrollRef: RefObject<HTMLElement | null>
  isStuck: boolean
  stick: () => void
  enableStick: () => void
  unstick: () => void
}

/**
 * Hook for managing "stick-to-index" behavior in a scrollable container.
 *
 * - When stuck, automatically scrolls to keep targetIndex in view
 * - Any user scroll immediately unsticks (no auto-resume)
 * - Call stick() to re-enable auto-scrolling
 */
export function useStickToIndex({
  targetIndex,
  selector,
  enabled = true,
  behavior = "smooth",
  block = "center",
  scrollRef: externalScrollRef,
  initialScroll = true,
  virtualizer,
  effectiveColumns = 1,
  preventUserScroll = false
}: StickToIndexOptions): StickToIndexReturn {
  const internalScrollRef = useRef<HTMLElement | null>(null)
  const scrollRef = externalScrollRef ?? internalScrollRef

  const [isStuck, setIsStuck] = useState(true)

  const isAutoScrollingRef = useRef(false)
  const lastTargetIndexRef = useRef(targetIndex)
  const hasInitialScrolledRef = useRef(false)

  const getVirtualizer = useCallback(() => {
    if (!virtualizer) return null

    if ("current" in virtualizer) return virtualizer.current

    return virtualizer
  }, [virtualizer])

  const scrollToElement = useCallback(
    (index: number, scrollBehavior: ScrollBehavior) => {
      const container = scrollRef.current

      if (!container) return false

      const targetElement = container.querySelector(selector(index)) as HTMLElement

      if (!targetElement) return false

      const containerRect = container.getBoundingClientRect()
      const elementRect = targetElement.getBoundingClientRect()

      const elementTop = elementRect.top - containerRect.top + container.scrollTop
      const elementHeight = elementRect.height
      const containerHeight = containerRect.height

      let scrollTop: number

      if (block === "center") {
        scrollTop = elementTop - containerHeight / 2 + elementHeight / 2
      } else if (block === "end") {
        scrollTop = elementTop - containerHeight + elementHeight
      } else {
        scrollTop = elementTop
      }

      const maxScroll = container.scrollHeight - containerHeight
      scrollTop = Math.max(0, Math.min(scrollTop, maxScroll))

      container.scrollTo({
        top: scrollTop,
        behavior: scrollBehavior
      })

      return true
    },
    [scrollRef, selector, block]
  )

  const scrollToIndex = useCallback(
    (index: number, scrollBehavior: ScrollBehavior) => {
      if (index < 0) return

      isAutoScrollingRef.current = true

      const duration = scrollBehavior === "smooth" ? 300 : 50

      const finishScroll = () => {
        setTimeout(() => {
          isAutoScrollingRef.current = false
        }, duration)
      }

      if (scrollToElement(index, scrollBehavior)) {
        finishScroll()
        return
      }

      const v = getVirtualizer()

      if (v) {
        const rowIndex = Math.floor(index / effectiveColumns)

        v.scrollToIndex(rowIndex, {
          align: block as "start" | "center" | "end" | "auto",
          behavior: scrollBehavior === "smooth" ? "smooth" : "auto"
        })

        setTimeout(() => {
          scrollToElement(index, scrollBehavior)
          finishScroll()
        }, 50)
      } else {
        isAutoScrollingRef.current = false
      }
    },
    [scrollToElement, getVirtualizer, effectiveColumns, block]
  )

  const stick = useCallback(() => {
    setIsStuck(true)

    if (targetIndex >= 0) {
      scrollToIndex(targetIndex, behavior)
    }
  }, [targetIndex, scrollToIndex, behavior])

  const enableStick = useCallback(() => {
    setIsStuck(true)
  }, [])

  const unstick = useCallback(() => {
    setIsStuck(false)
  }, [])

  useEffect(() => {
    const container = scrollRef.current

    if (!container || !enabled) return

    const handleUserScroll = (event: Event) => {
      if (isAutoScrollingRef.current) return

      if (preventUserScroll) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      setIsStuck(false)
    }

    const eventOptions = preventUserScroll ? { passive: false } : { passive: true }

    container.addEventListener("wheel", handleUserScroll, eventOptions)
    container.addEventListener("touchmove", handleUserScroll, eventOptions)
    container.addEventListener("keydown", (event) => {
      const navKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]
      if (navKeys.includes(event.key)) handleUserScroll(event)
    })

    return () => {
      container.removeEventListener("wheel", handleUserScroll)
      container.removeEventListener("touchmove", handleUserScroll)
      container.removeEventListener("keydown", handleUserScroll as any)
    }
  }, [enabled, scrollRef, preventUserScroll])

  useEffect(() => {
    if (!enabled || targetIndex < 0) return

    const indexChanged = lastTargetIndexRef.current !== targetIndex
    lastTargetIndexRef.current = targetIndex

    if (!hasInitialScrolledRef.current && initialScroll) {
      hasInitialScrolledRef.current = true

      requestAnimationFrame(() => {
        scrollToIndex(targetIndex, behavior)
      })

      return
    }

    if (isStuck && indexChanged) {
      scrollToIndex(targetIndex, behavior)
    }
  }, [targetIndex, enabled, isStuck, initialScroll, scrollToIndex, behavior])

  const prevEnabledRef = useRef(enabled)

  useEffect(() => {
    const wasEnabled = prevEnabledRef.current

    prevEnabledRef.current = enabled

    if (!enabled) {
      hasInitialScrolledRef.current = false
    } else if (!wasEnabled && enabled) {
      setIsStuck(true)
    }
  }, [enabled])

  return {
    scrollRef: scrollRef as RefObject<HTMLElement | null>,
    isStuck,
    stick,
    enableStick,
    unstick
  }
}
