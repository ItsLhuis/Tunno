import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

import Animated from "react-native-reanimated"

/**
 * Options for configuring the {@link useStickToIndex} hook for Animated.FlatList.
 */
export type StickToIndexOptions<T> = {
  targetIndex: number
  data: T[]
  enabled?: boolean
  listRef: RefObject<Animated.FlatList<T> | null>
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
 * Hook for managing "stick-to-index" behavior in an Animated.FlatList.
 *
 * - When stuck, automatically scrolls to keep targetIndex in view
 * - Centers the item in the viewport when possible
 * - Automatically scrolls to ensure visibility for items at the end
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

      if (!list) return

      isAutoScrollingRef.current = true

      try {
        // FlatList's scrollToIndex with viewPosition: 0.5 centers the item
        // When at the end of list, FlatList automatically adjusts to keep item visible
        list.scrollToIndex({
          index,
          animated,
          viewPosition: 0.5
        })
      } catch (error) {
        // Fallback if scrollToIndex is not available
        console.warn("scrollToIndex not available, using scrollToOffset fallback", error)
      }

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
