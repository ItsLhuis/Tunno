import { useCallback, useMemo, useState } from "react"

import { type LayoutChangeEvent, type NativeScrollEvent } from "react-native"

import Animated, {
  AnimatedRef,
  interpolate,
  scrollTo,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { scheduleOnUI } from "react-native-worklets"

import { debounce } from "lodash"

import { SharedScrollContainerProps } from "../types"

type ScrollableRef<T = any> = AnimatedRef<Animated.ScrollView> | AnimatedRef<Animated.FlatList<T>>

type UseScrollProps<T = any> = {
  scrollRef: ScrollableRef<T>
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

export function useScroll<T = any>({
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
}: UseScrollProps<T>) {
  const scrollY = useSharedValue<number>(0)

  const [absoluteHeaderHeight, setAbsoluteHeaderHeight] = useState<number>(
    initialAbsoluteHeaderHeight
  )

  const largeHeaderHeight = useSharedValue<number>(0)

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

  const scrollToPosition = useCallback(
    (targetY: number, animated: boolean) => {
      if (!scrollRef.current) return

      const ref = scrollRef.current

      if ("scrollToOffset" in ref && typeof ref.scrollToOffset === "function") {
        ref.scrollToOffset({ offset: targetY, animated })
      } else {
        scheduleOnUI(() => {
          "worklet"
          scrollTo(scrollRef as AnimatedRef<Animated.ScrollView>, 0, targetY, animated)
        })
      }
    },
    [scrollRef]
  )

  const debouncedFixScroll = useMemo(() => {
    return debounce(() => {
      if (disableAutoFixScroll) return

      if (largeHeaderHeight.value !== 0 && scrollRef && scrollRef.current) {
        if (
          scrollY.value >= largeHeaderHeight.value / 2 &&
          scrollY.value < largeHeaderHeight.value
        ) {
          scrollToPosition(largeHeaderHeight.value, true)
        } else if (scrollY.value >= 0 && scrollY.value < largeHeaderHeight.value / 2) {
          scrollToPosition(0, true)
        }
      }
    }, 50)
  }, [disableAutoFixScroll, largeHeaderHeight, scrollY, scrollRef, scrollToPosition])

  const onAbsoluteHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (absoluteHeader) {
        setAbsoluteHeaderHeight(event.nativeEvent.layout.height)
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
        ...(absoluteHeader &&
          inverted && {
            paddingBottom: absoluteHeaderHeight
          })
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
