import { useState, useCallback, useMemo } from "react"

import { LayoutChangeEvent, NativeScrollEvent } from "react-native"

import Animated, {
  AnimatedRef,
  interpolate,
  runOnUI,
  scrollTo,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler
} from "react-native-reanimated"

import { debounce } from "lodash"

import { SharedScrollContainerProps } from "./types"

type UseScrollProps = {
  scrollRef: AnimatedRef<Animated.ScrollView>
  adjustmentOffset?: number
  largeHeaderShown: SharedScrollContainerProps["largeHeaderShown"]
  largeHeaderExists: boolean
  disableAutoFixScroll?: boolean
  absoluteHeader?: boolean
  initialAbsoluteHeaderHeight?: number
  headerFadeInThreshold?: number
  inverted?: boolean
  onScrollWorklet?: (evt: NativeScrollEvent) => void
}

export const useScroll = ({
  scrollRef,
  largeHeaderShown,
  largeHeaderExists,
  disableAutoFixScroll = false,
  adjustmentOffset = 4,
  absoluteHeader = false,
  initialAbsoluteHeaderHeight = 0,
  headerFadeInThreshold = 1,
  inverted,
  onScrollWorklet
}: UseScrollProps) => {
  const scrollY = useSharedValue(0)

  const [absoluteHeaderHeight, setAbsoluteHeaderHeight] = useState(initialAbsoluteHeaderHeight)

  const largeHeaderHeight = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      if (onScrollWorklet) onScrollWorklet(event)

      scrollY.value = event.contentOffset.y
    },
    [onScrollWorklet]
  )

  const showHeader = useDerivedValue(() => {
    if (!largeHeaderExists) return withTiming(scrollY.value <= 0 ? 0 : 1, { duration: 300 })

    if (largeHeaderHeight.value < adjustmentOffset) return 0

    if (largeHeaderShown) {
      largeHeaderShown.value = withTiming(
        scrollY.value <= largeHeaderHeight.value * headerFadeInThreshold - adjustmentOffset ? 0 : 1,
        { duration: 300 }
      )
    }

    return withTiming(
      scrollY.value <= largeHeaderHeight.value * headerFadeInThreshold - adjustmentOffset ? 0 : 1,
      { duration: 300 }
    )
  }, [largeHeaderExists])

  const largeHeaderOpacity = useDerivedValue(() => {
    return interpolate(showHeader.value, [0, 1], [1, 0])
  })

  const debouncedFixScroll = useMemo(() => {
    return debounce(() => {
      if (disableAutoFixScroll) return

      if (largeHeaderHeight.value !== 0 && scrollRef && scrollRef.current) {
        if (
          scrollY.value >= largeHeaderHeight.value / 2 &&
          scrollY.value < largeHeaderHeight.value
        ) {
          runOnUI(() => {
            "worklet"
            scrollTo(scrollRef, 0, largeHeaderHeight.value, true)
          })()
        } else if (scrollY.value >= 0 && scrollY.value < largeHeaderHeight.value / 2) {
          runOnUI(() => {
            "worklet"
            scrollTo(scrollRef, 0, 0, true)
          })()
        }
      }
    }, 50)
  }, [disableAutoFixScroll, largeHeaderHeight, scrollY, scrollRef])

  const onAbsoluteHeaderLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (absoluteHeader) {
        setAbsoluteHeaderHeight(e.nativeEvent.layout.height)
      }
    },
    [absoluteHeader]
  )

  const scrollViewAdjustments = useMemo(() => {
    return {
      scrollIndicatorInsets: {
        top: absoluteHeader && !inverted ? absoluteHeaderHeight : 0,
        bottom: absoluteHeader && inverted ? absoluteHeaderHeight : 0
      },
      contentContainerStyle: {
        paddingTop: absoluteHeader && !inverted ? absoluteHeaderHeight : 0,
        paddingBottom: absoluteHeader && inverted ? absoluteHeaderHeight : 0
      }
    }
  }, [inverted, absoluteHeaderHeight, absoluteHeader])

  return {
    scrollY,
    showHeader,
    largeHeaderHeight,
    largeHeaderOpacity,
    scrollHandler,
    debouncedFixScroll,
    absoluteHeaderHeight,
    onAbsoluteHeaderLayout,
    scrollViewAdjustments
  }
}
