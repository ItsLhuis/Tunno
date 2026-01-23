import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react"

import { View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  durationTokens,
  ScopedTheme,
  sizeTokens,
  spacingTokens,
  useStyles,
  useTheme,
  viewStyle,
  type SizeAlias,
  type SpacingAlias
} from "@styles"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { LinearGradient } from "expo-linear-gradient"

import {
  FlashList,
  type FlashListProps,
  type FlashListRef,
  type ViewToken
} from "@shopify/flash-list"

import { BottomSheetFlashList } from "@components/ui/BottomSheet"
import { Fade } from "@components/ui/Fade"
import { IconButton, type IconButtonProps } from "@components/ui/IconButton"

type CarouselApi = {
  scrollTo: (index: number, animated?: boolean) => void
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
  getCurrentIndex: () => number
  getItemCount: () => number
}

type CarouselOrientation = "horizontal" | "vertical"

type CarouselContextValue = {
  orientation: CarouselOrientation
  listRef: RefObject<FlashListRef<unknown> | null>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  canFadePrev: boolean
  canFadeNext: boolean
  currentIndex: number
  itemCount: number
  loop: boolean
}

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("Carousel components must be used within Carousel")
  }

  return context
}

export type CarouselProps = {
  orientation?: CarouselOrientation
  setApi?: (api: CarouselApi) => void
  onIndexChange?: (index: number) => void
  loop?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const Carousel = ({
  orientation = "horizontal",
  setApi,
  onIndexChange,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 4000,
  children,
  style
}: CarouselProps) => {
  const styles = useStyles(carouselStyles)

  const listRef = useRef<FlashListRef<unknown>>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const [itemCount, setItemCount] = useState(0)

  const [scrollPosition, setScrollPosition] = useState({ offset: 0, content: 0, container: 0 })

  const canScrollPrev = useMemo(() => {
    if (loop && itemCount > 1) return true
    return currentIndex > 0
  }, [loop, itemCount, currentIndex])

  const canScrollNext = useMemo(() => {
    if (loop && itemCount > 1) return true
    return currentIndex < itemCount - 1
  }, [loop, itemCount, currentIndex])

  const canFadePrev = useMemo(() => {
    if (itemCount <= 1) return false
    if (scrollPosition.content > 0 && scrollPosition.container > 0) {
      return scrollPosition.offset > 0
    }
    return currentIndex > 0
  }, [scrollPosition, currentIndex, itemCount])

  const canFadeNext = useMemo(() => {
    if (itemCount <= 1) return false
    if (scrollPosition.content > 0 && scrollPosition.container > 0) {
      const maxScroll = scrollPosition.content - scrollPosition.container
      return scrollPosition.offset < maxScroll - 1
    }
    return currentIndex < itemCount - 1
  }, [scrollPosition, currentIndex, itemCount])

  const scrollPrev = useCallback(() => {
    if (!listRef.current || itemCount === 0) return

    let targetIndex = currentIndex - 1

    if (targetIndex < 0) {
      if (loop) {
        targetIndex = itemCount - 1
      } else {
        return
      }
    }

    listRef.current.scrollToIndex({ index: targetIndex, animated: true })
  }, [currentIndex, itemCount, loop])

  const scrollNext = useCallback(() => {
    if (!listRef.current || itemCount === 0) return

    let targetIndex = currentIndex + 1

    if (targetIndex >= itemCount) {
      if (loop) {
        targetIndex = 0
      } else {
        return
      }
    }

    listRef.current.scrollToIndex({ index: targetIndex, animated: true })
  }, [currentIndex, itemCount, loop])

  const updateItemCount = useCallback((count: number) => {
    setItemCount(count)
  }, [])

  const updateCurrentIndex = useCallback(
    (index: number) => {
      if (index !== currentIndex) {
        setCurrentIndex(index)
        onIndexChange?.(index)
      }
    },
    [currentIndex, onIndexChange]
  )

  const updateScrollPosition = useCallback((offset: number, content: number, container: number) => {
    setScrollPosition({ offset, content, container })
  }, [])

  useEffect(() => {
    if (!autoPlay || itemCount <= 1) return

    const interval = setInterval(() => {
      scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, itemCount, scrollNext])

  useEffect(() => {
    if (!setApi) return

    const api: CarouselApi = {
      scrollTo: (index: number, animated = true) => {
        if (listRef.current && index >= 0 && index < itemCount) {
          listRef.current.scrollToIndex({ index, animated })
        }
      },
      scrollPrev,
      scrollNext,
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext,
      getCurrentIndex: () => currentIndex,
      getItemCount: () => itemCount
    }

    setApi(api)
  }, [setApi, itemCount, canScrollPrev, canScrollNext, currentIndex, scrollPrev, scrollNext])

  const value = useMemo(
    (): CarouselContextValue => ({
      orientation,
      listRef: listRef as RefObject<FlashListRef<unknown> | null>,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      canFadePrev,
      canFadeNext,
      currentIndex,
      itemCount,
      loop
    }),
    [
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      canFadePrev,
      canFadeNext,
      currentIndex,
      itemCount,
      loop
    ]
  )

  return (
    <CarouselContext.Provider value={value}>
      <CarouselInternalContext.Provider
        value={{ updateItemCount, updateCurrentIndex, updateScrollPosition }}
      >
        <View style={[styles.container, style]}>{children}</View>
      </CarouselInternalContext.Provider>
    </CarouselContext.Provider>
  )
}

type CarouselInternalContextValue = {
  updateItemCount: (count: number) => void
  updateCurrentIndex: (index: number) => void
  updateScrollPosition: (offset: number, content: number, container: number) => void
}

const CarouselInternalContext = createContext<CarouselInternalContextValue | undefined>(undefined)

function resolveSpacing(value: SpacingAlias | number): number {
  return typeof value === "number" ? value : spacingTokens[value]
}

function resolveSize(value: SizeAlias | number): number {
  if (typeof value === "number") return value
  const token = sizeTokens[value]
  return typeof token === "number" ? token : 0
}

function useCarouselInternal() {
  const context = useContext(CarouselInternalContext)

  if (!context) {
    throw new Error("CarouselContent must be used within Carousel")
  }

  return context
}

export type CarouselContentProps<T> = Omit<
  FlashListProps<T>,
  "horizontal" | "showsHorizontalScrollIndicator" | "showsVerticalScrollIndicator"
> & {
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  insideBottomSheet?: boolean
  gap?: SpacingAlias | number
  showFade?: boolean
  fadeSize?: SizeAlias | number
  fadeOffset?: SpacingAlias | number
  snapToItem?: boolean
  itemSize?: number
}

function CarouselContent<T>({
  data,
  renderItem,
  style,
  contentContainerStyle,
  insideBottomSheet = false,
  gap: gapProp = "md",
  showFade = false,
  fadeSize: fadeSizeProp = "md",
  fadeOffset: fadeOffsetProp = 0,
  snapToItem = false,
  itemSize,
  onViewableItemsChanged,
  onScroll,
  viewabilityConfig,
  ...props
}: CarouselContentProps<T>) {
  const styles = useStyles(carouselStyles)

  const { theme } = useTheme()

  const gap = resolveSpacing(gapProp)
  const fadeSize = resolveSize(fadeSizeProp)
  const fadeOffset = resolveSpacing(fadeOffsetProp)

  const { orientation, listRef, canFadePrev, canFadeNext } = useCarousel()

  const { updateItemCount, updateCurrentIndex, updateScrollPosition } = useCarouselInternal()

  const isHorizontal = orientation === "horizontal"

  const [containerSize, setContainerSize] = useState(0)

  const fadeOpacityStart = useSharedValue(0)
  const fadeOpacityEnd = useSharedValue(0)

  useEffect(() => {
    if (!showFade) return

    fadeOpacityStart.value = withTiming(canFadePrev ? 1 : 0, {
      duration: durationTokens[300]
    })
    fadeOpacityEnd.value = withTiming(canFadeNext ? 1 : 0, {
      duration: durationTokens[300]
    })
  }, [showFade, canFadePrev, canFadeNext, fadeOpacityStart, fadeOpacityEnd])

  const fadeStartStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacityStart.value
  }))

  const fadeEndStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacityEnd.value
  }))

  useEffect(() => {
    if (Array.isArray(data)) {
      updateItemCount(data.length)
    }
  }, [data, updateItemCount])

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout
      setContainerSize(isHorizontal ? width : height)
    },
    [isHorizontal]
  )

  const handleScroll = useCallback(
    (event: {
      nativeEvent: {
        contentOffset: { x: number; y: number }
        contentSize: { width: number; height: number }
        layoutMeasurement: { width: number; height: number }
      }
    }) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent

      const scrollOffset = isHorizontal ? contentOffset.x : contentOffset.y
      const content = isHorizontal ? contentSize.width : contentSize.height
      const container = isHorizontal ? layoutMeasurement.width : layoutMeasurement.height

      updateScrollPosition(scrollOffset, content, container)

      onScroll?.(event as Parameters<NonNullable<FlashListProps<T>["onScroll"]>>[0])
    },
    [isHorizontal, updateScrollPosition, onScroll]
  )

  const handleViewableItemsChanged = useCallback(
    (info: { viewableItems: ViewToken<T>[]; changed: ViewToken<T>[] }) => {
      const firstVisible = info.viewableItems[0]
      if (firstVisible?.index != null) {
        updateCurrentIndex(firstVisible.index)
      }
      onViewableItemsChanged?.(info)
    },
    [updateCurrentIndex, onViewableItemsChanged]
  )

  const defaultViewabilityConfig = useMemo(
    () =>
      viewabilityConfig ?? {
        itemVisiblePercentThreshold: 50
      },
    [viewabilityConfig]
  )

  const snapProps = useMemo(() => {
    if (!snapToItem) return {}

    const effectiveItemSize = itemSize ?? containerSize

    if (effectiveItemSize <= 0) return {}

    return {
      snapToInterval: effectiveItemSize + gap,
      snapToAlignment: "start" as const,
      decelerationRate: "fast" as const
    }
  }, [snapToItem, itemSize, containerSize, gap])

  const listProps: FlashListProps<T> = {
    data,
    renderItem,
    horizontal: isHorizontal,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    onScroll: handleScroll,
    scrollEventThrottle: 16,
    onViewableItemsChanged: handleViewableItemsChanged,
    viewabilityConfig: defaultViewabilityConfig,
    ItemSeparatorComponent:
      gap > 0 ? () => <View style={styles.separator(gap, isHorizontal)} /> : undefined,
    contentContainerStyle: contentContainerStyle as FlashListProps<T>["contentContainerStyle"],
    ...snapProps,
    ...props
  }

  const fadeColors: [string, string] = [theme.colors.background, "transparent"]
  const fadeColorsReversed: [string, string] = ["transparent", theme.colors.background]

  return (
    <View style={[styles.contentContainer, style]} onLayout={handleLayout}>
      {insideBottomSheet ? (
        <BottomSheetFlashList {...listProps} />
      ) : (
        <FlashList ref={listRef as RefObject<FlashListRef<T>>} {...listProps} />
      )}
      {showFade && (
        <Fragment>
          <Animated.View
            style={[
              styles.fadeOverlay,
              styles.fadeStart(fadeSize, fadeOffset, isHorizontal),
              fadeStartStyle
            ]}
            pointerEvents="none"
          >
            <LinearGradient
              colors={fadeColors}
              start={isHorizontal ? { x: 0, y: 0.5 } : { x: 0.5, y: 0 }}
              end={isHorizontal ? { x: 1, y: 0.5 } : { x: 0.5, y: 1 }}
              style={styles.gradient}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.fadeOverlay,
              styles.fadeEnd(fadeSize, fadeOffset, isHorizontal),
              fadeEndStyle
            ]}
            pointerEvents="none"
          >
            <LinearGradient
              colors={fadeColorsReversed}
              start={isHorizontal ? { x: 0, y: 0.5 } : { x: 0.5, y: 0 }}
              end={isHorizontal ? { x: 1, y: 0.5 } : { x: 0.5, y: 1 }}
              style={styles.gradient}
            />
          </Animated.View>
        </Fragment>
      )}
    </View>
  )
}

export type CarouselItemProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const CarouselItem = ({ children, style }: CarouselItemProps) => {
  const styles = useStyles(carouselStyles)

  return <View style={[styles.item, style]}>{children}</View>
}

export type CarouselPreviousProps = Omit<IconButtonProps, "name" | "onPress"> & {
  style?: StyleProp<ViewStyle>
}

const CarouselPrevious = ({ style, variant = "outline", ...props }: CarouselPreviousProps) => {
  const styles = useStyles(carouselStyles)

  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  const isHorizontal = orientation === "horizontal"

  return (
    <Fade
      show={canScrollPrev}
      style={[styles.navigationButton, styles.prevButton(isHorizontal), style]}
    >
      <ScopedTheme theme="dark">
        <IconButton
          name={isHorizontal ? "ChevronLeft" : "ChevronUp"}
          variant={variant}
          onPress={scrollPrev}
          disabled={!canScrollPrev}
          {...props}
        />
      </ScopedTheme>
    </Fade>
  )
}

export type CarouselNextProps = Omit<IconButtonProps, "name" | "onPress"> & {
  style?: StyleProp<ViewStyle>
}

const CarouselNext = ({ style, variant = "outline", ...props }: CarouselNextProps) => {
  const styles = useStyles(carouselStyles)

  const { orientation, scrollNext, canScrollNext } = useCarousel()

  const isHorizontal = orientation === "horizontal"

  return (
    <Fade
      show={canScrollNext}
      style={[styles.navigationButton, styles.nextButton(isHorizontal), style]}
    >
      <ScopedTheme theme="dark">
        <IconButton
          name={isHorizontal ? "ChevronRight" : "ChevronDown"}
          variant={variant}
          onPress={scrollNext}
          disabled={!canScrollNext}
          {...props}
        />
      </ScopedTheme>
    </Fade>
  )
}

export type CarouselDotsProps = {
  style?: StyleProp<ViewStyle>
  dotStyle?: StyleProp<ViewStyle>
  activeDotStyle?: StyleProp<ViewStyle>
  onDotPress?: (index: number) => void
}

const CarouselDots = ({ style, dotStyle, activeDotStyle, onDotPress }: CarouselDotsProps) => {
  const styles = useStyles(carouselStyles)

  const { currentIndex, itemCount, orientation, listRef } = useCarousel()

  const isHorizontal = orientation === "horizontal"

  const handleDotPress = useCallback(
    (index: number) => {
      listRef.current?.scrollToIndex({ index, animated: true })
      onDotPress?.(index)
    },
    [listRef, onDotPress]
  )

  if (itemCount <= 1) return null

  return (
    <View style={[styles.dotsContainer(isHorizontal), style]}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <CarouselDot
          key={index}
          index={index}
          isActive={index === currentIndex}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
          onPress={handleDotPress}
        />
      ))}
    </View>
  )
}

type CarouselDotProps = {
  index: number
  isActive: boolean
  dotStyle?: StyleProp<ViewStyle>
  activeDotStyle?: StyleProp<ViewStyle>
  onPress: (index: number) => void
}

const CarouselDot = ({ index, isActive, dotStyle, activeDotStyle, onPress }: CarouselDotProps) => {
  const styles = useStyles(carouselStyles)

  const scale = useSharedValue(isActive ? 1 : 0.8)
  const opacity = useSharedValue(isActive ? 1 : 0.5)

  useEffect(() => {
    scale.value = withTiming(isActive ? 1 : 0.8, { duration: durationTokens[300] })
    opacity.value = withTiming(isActive ? 1 : 0.5, { duration: durationTokens[300] })
  }, [isActive, scale, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePress = useCallback(() => {
    onPress(index)
  }, [index, onPress])

  return (
    <Animated.View
      style={[styles.dot, animatedStyle, dotStyle, isActive && activeDotStyle]}
      onTouchEnd={handlePress}
    />
  )
}

export type CarouselCounterProps = {
  style?: StyleProp<ViewStyle>
  separator?: string
}

const CarouselCounter = ({ style, separator = "/" }: CarouselCounterProps) => {
  const styles = useStyles(carouselStyles)

  const { currentIndex, itemCount } = useCarousel()

  if (itemCount <= 1) return null

  return (
    <View style={[styles.counterContainer, style]}>
      <Animated.Text style={styles.counterText}>
        {currentIndex + 1}
        {separator}
        {itemCount}
      </Animated.Text>
    </View>
  )
}

const carouselStyles = createStyleSheet(({ theme }) => ({
  container: {
    position: "relative"
  },
  contentContainer: {
    position: "relative",
    flex: 1
  },
  item: {
    flexShrink: 0,
    flexGrow: 0
  },
  separator: (gap: number, isHorizontal: boolean) =>
    viewStyle({
      width: isHorizontal ? gap : "100%",
      height: isHorizontal ? "100%" : gap
    }),
  navigationButton: {
    position: "absolute",
    zIndex: 10
  },
  prevButton: (isHorizontal: boolean) =>
    viewStyle(
      isHorizontal
        ? {
            left: theme.space(3),
            top: 0,
            bottom: 0,
            justifyContent: "center"
          }
        : {
            top: theme.space(3),
            left: 0,
            right: 0,
            alignItems: "center"
          }
    ),
  nextButton: (isHorizontal: boolean) =>
    viewStyle(
      isHorizontal
        ? {
            right: theme.space(3),
            top: 0,
            bottom: 0,
            justifyContent: "center"
          }
        : {
            bottom: theme.space(3),
            left: 0,
            right: 0,
            alignItems: "center"
          }
    ),
  fadeOverlay: {
    position: "absolute",
    zIndex: 5
  },
  fadeStart: (size: number, offset: number, isHorizontal: boolean) =>
    viewStyle(
      isHorizontal
        ? {
            left: offset,
            top: 0,
            bottom: 0,
            width: size
          }
        : {
            left: 0,
            right: 0,
            top: offset,
            height: size
          }
    ),
  fadeEnd: (size: number, offset: number, isHorizontal: boolean) =>
    viewStyle(
      isHorizontal
        ? {
            right: offset,
            top: 0,
            bottom: 0,
            width: size
          }
        : {
            left: 0,
            right: 0,
            bottom: offset,
            height: size
          }
    ),
  gradient: {
    flex: 1
  },
  dotsContainer: (isHorizontal: boolean) =>
    viewStyle({
      flexDirection: isHorizontal ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.space(2),
      paddingVertical: theme.space(2)
    }),
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary
  },
  counterContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.space(2)
  },
  counterText: {
    fontSize: 14,
    color: theme.colors.mutedForeground
  }
}))

export {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
}
