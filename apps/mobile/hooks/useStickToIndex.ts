import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

import { type FlashListRef } from "@shopify/flash-list"

/**
 * Options for configuring the {@link useStickToIndex} hook.
 */
export type StickToIndexOptions<T> = {
  targetIndex: number
  data: T[]
  enabled?: boolean
  listRef: RefObject<FlashListRef<T> | null>
  initialScroll?: boolean
}

/**
 * The object returned by the {@link useStickToIndex} hook.
 */
export type StickToIndexReturn = {
  isStuck: boolean
  stick: () => void
  enableStick: () => void
  unstick: () => void
  handleScrollBeginDrag: () => void
  handleScrollEndDrag: () => void
  handleMomentumScrollEnd: () => void
}

/**
 * Hook for managing "stick-to-index" behavior in a FlashList.
 *
 * - When stuck, automatically scrolls to keep targetIndex in view
 * - Any user scroll immediately unsticks (no auto-resume)
 * - Call stick() to re-enable auto-scrolling
 */
export function useStickToIndex<T>({
  targetIndex,
  data,
  enabled = true,
  listRef,
  initialScroll = true
}: StickToIndexOptions<T>): StickToIndexReturn {
  const [isStuck, setIsStuck] = useState(true)

  const isAutoScrollingRef = useRef(false)
  const lastTargetIndexRef = useRef(targetIndex)
  const hasInitialScrolledRef = useRef(false)

  const scrollToItem = useCallback(
    (index: number, animated: boolean = true) => {
      if (index < 0 || data.length === 0) return

      const list = listRef.current
      const item = data[index]

      if (!list || !item) return

      isAutoScrollingRef.current = true

      list.scrollToItem({
        item,
        animated,
        viewPosition: 0.3
      })

      const duration = animated ? 400 : 100

      setTimeout(() => {
        isAutoScrollingRef.current = false
      }, duration)
    },
    [listRef, data]
  )

  const stick = useCallback(() => {
    setIsStuck(true)

    if (targetIndex >= 0) {
      scrollToItem(targetIndex, true)
    }
  }, [targetIndex, scrollToItem])

  const enableStick = useCallback(() => {
    setIsStuck(true)
  }, [])

  const unstick = useCallback(() => {
    setIsStuck(false)
  }, [])

  const handleScrollBeginDrag = useCallback(() => {
    if (isAutoScrollingRef.current) return

    setIsStuck(false)
  }, [])

  const handleScrollEndDrag = useCallback(() => {
    // No-op - we don't auto-resume after scroll ends
  }, [])

  const handleMomentumScrollEnd = useCallback(() => {
    // No-op - we don't auto-resume after momentum ends
  }, [])

  useEffect(() => {
    if (!enabled || targetIndex < 0) return

    const indexChanged = lastTargetIndexRef.current !== targetIndex
    lastTargetIndexRef.current = targetIndex

    if (!hasInitialScrolledRef.current && initialScroll) {
      hasInitialScrolledRef.current = true

      const timer = setTimeout(() => {
        scrollToItem(targetIndex, true)
      }, 100)

      return () => clearTimeout(timer)
    }

    if (isStuck && indexChanged) {
      scrollToItem(targetIndex, true)
    }
  }, [targetIndex, enabled, isStuck, initialScroll, scrollToItem])

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
    isStuck,
    stick,
    enableStick,
    unstick,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd
  }
}
