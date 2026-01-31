import { useCallback, useImperativeHandle, useMemo, type ReactNode, type Ref } from "react"

import {
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps
} from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import Animated, { useAnimatedRef, type AnimatedProps } from "react-native-reanimated"

import { useScroll } from "./hooks"

import { FadingView } from "./components"

import { type SharedScrollContainerProps } from "./types"

type AnimatedScrollViewProps = AnimatedProps<ScrollViewProps> &
  SharedScrollContainerProps & {
    children?: ReactNode
  }

export type ScrollViewWithHeadersProps = Omit<AnimatedScrollViewProps, "onScroll"> & {
  ref?: Ref<Animated.ScrollView>
}

const ScrollViewWithHeaders = ({
  largeHeaderShown,
  containerStyle,
  LargeHeaderSubtitleComponent,
  LargeHeaderComponent,
  largeHeaderContainerStyle,
  HeaderComponent,
  onLargeHeaderLayout,
  onScrollBeginDrag,
  onScrollEndDrag,
  onScrollWorklet,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  ignoreLeftSafeArea,
  ignoreRightSafeArea,
  disableAutoFixScroll = false,
  // @ts-expect-error - onScroll is handled internally
  onScroll: _unusedOnScroll,
  absoluteHeader = false,
  initialAbsoluteHeaderHeight = 0,
  contentContainerStyle = {},
  automaticallyAdjustsScrollIndicatorInsets,
  headerFadeInThreshold = 1,
  disableLargeHeaderFadeAnim = false,
  scrollIndicatorInsets = {},
  children,
  ref,
  ...props
}: ScrollViewWithHeadersProps) => {
  if (_unusedOnScroll) {
    throw new Error(
      "The 'onScroll' property is not supported. Please use onScrollWorklet to track the scroll container's state."
    )
  }

  const styles = useStyles(scrollViewStyles)

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  useImperativeHandle(ref, () => scrollRef.current as Animated.ScrollView)

  const {
    scrollY,
    showHeader,
    largeHeaderHeight,
    largeHeaderOpacity,
    scrollHandler,
    debouncedFixScroll,
    onAbsoluteHeaderLayout,
    scrollViewAdjustments
  } = useScroll({
    scrollRef,
    largeHeaderShown,
    disableAutoFixScroll,
    largeHeaderExists: !!LargeHeaderComponent,
    absoluteHeader,
    initialAbsoluteHeaderHeight,
    headerFadeInThreshold,
    onScrollWorklet
  })

  const containerStyleMemo = useMemo(
    () => [
      styles.container(ignoreLeftSafeArea ?? false, ignoreRightSafeArea ?? false),
      containerStyle
    ],
    [styles, ignoreLeftSafeArea, ignoreRightSafeArea, containerStyle]
  )

  const handleScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      debouncedFixScroll.cancel()
      onScrollBeginDrag?.(event)
    },
    [debouncedFixScroll, onScrollBeginDrag]
  )

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      debouncedFixScroll()
      onScrollEndDrag?.(event)
    },
    [debouncedFixScroll, onScrollEndDrag]
  )

  const handleMomentumScrollBegin = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      debouncedFixScroll.cancel()
      onMomentumScrollBegin?.(event)
    },
    [debouncedFixScroll, onMomentumScrollBegin]
  )

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      debouncedFixScroll()
      onMomentumScrollEnd?.(event)
    },
    [debouncedFixScroll, onMomentumScrollEnd]
  )

  const handleLargeHeaderLayout = useCallback(
    (event: {
      nativeEvent: { layout: { height: number; width: number; x: number; y: number } }
    }) => {
      largeHeaderHeight.value = event.nativeEvent.layout.height
      onLargeHeaderLayout?.(event.nativeEvent.layout)
    },
    [largeHeaderHeight, onLargeHeaderLayout]
  )

  const mergedScrollIndicatorInsets = useMemo(
    () => ({
      ...scrollViewAdjustments.scrollIndicatorInsets,
      ...scrollIndicatorInsets
    }),
    [scrollViewAdjustments.scrollIndicatorInsets, scrollIndicatorInsets]
  )

  const mergedContentContainerStyle = useMemo(
    () => [scrollViewAdjustments.contentContainerStyle, contentContainerStyle],
    [scrollViewAdjustments.contentContainerStyle, contentContainerStyle]
  )

  return (
    <View style={containerStyleMemo}>
      {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        automaticallyAdjustContentInsets={false}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={mergedContentContainerStyle}
        automaticallyAdjustsScrollIndicatorInsets={
          automaticallyAdjustsScrollIndicatorInsets !== undefined
            ? automaticallyAdjustsScrollIndicatorInsets
            : !absoluteHeader
        }
        scrollIndicatorInsets={mergedScrollIndicatorInsets}
        {...props}
      >
        {LargeHeaderComponent && (
          <View onLayout={handleLargeHeaderLayout}>
            {!disableLargeHeaderFadeAnim ? (
              <FadingView opacity={largeHeaderOpacity} style={largeHeaderContainerStyle}>
                {LargeHeaderComponent({ scrollY, showHeader })}
              </FadingView>
            ) : (
              <View style={largeHeaderContainerStyle}>
                {LargeHeaderComponent({ scrollY, showHeader })}
              </View>
            )}
          </View>
        )}
        {LargeHeaderSubtitleComponent && LargeHeaderSubtitleComponent({ showHeader, scrollY })}
        {children}
      </Animated.ScrollView>
      {absoluteHeader && (
        <View style={styles.absoluteHeader} onLayout={onAbsoluteHeaderLayout}>
          {HeaderComponent({ showHeader, scrollY })}
        </View>
      )}
    </View>
  )
}

const scrollViewStyles = createStyleSheet(({ runtime }) => ({
  container: (ignoreLeftSafeArea: boolean, ignoreRightSafeArea: boolean) =>
    viewStyle({
      flex: 1,
      paddingLeft: ignoreLeftSafeArea ? 0 : runtime.insets.left,
      paddingRight: ignoreRightSafeArea ? 0 : runtime.insets.right
    }),
  absoluteHeader: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0
  }
}))

export { ScrollViewWithHeaders }
