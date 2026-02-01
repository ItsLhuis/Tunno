import {
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  type ComponentClass,
  type ComponentProps,
  type ReactNode,
  type Ref
} from "react"

import {
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle
} from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { FlashList, type FlashListProps, type FlashListRef } from "@shopify/flash-list"

import Animated, {
  useAnimatedRef,
  type AnimatedProps,
  type DerivedValue,
  type SharedValue
} from "react-native-reanimated"

import { useScroll } from "./hooks"

import { FadingView } from "./components"

import { type ScrollHeaderProps, type SharedScrollContainerProps } from "./types"

type AnimatedFlashListType<ItemT> = ComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentClass<AnimatedProps<FlashListProps<ItemT>>, any>
> &
  SharedScrollContainerProps

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as unknown as ComponentClass<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatedProps<FlashListProps<any>>,
  unknown
>

export type FlashListWithHeadersProps<ItemT> = Omit<AnimatedFlashListType<ItemT>, "onScroll"> & {
  ref?: Ref<FlashListRef<ItemT>>
}

type ListHeaderProps = {
  LargeHeaderComponent?: (props: ScrollHeaderProps) => ReactNode
  LargeHeaderSubtitleComponent?: (props: ScrollHeaderProps) => ReactNode
  largeHeaderContainerStyle?: StyleProp<ViewStyle>
  disableLargeHeaderFadeAnim: boolean
  largeHeaderOpacity: DerivedValue<number>
  scrollY: SharedValue<number>
  showHeader: DerivedValue<0 | 1>
  onLayout: (event: {
    nativeEvent: { layout: { height: number; width: number; x: number; y: number } }
  }) => void
}

const ListHeader = memo(function ListHeader({
  LargeHeaderComponent,
  LargeHeaderSubtitleComponent,
  largeHeaderContainerStyle,
  disableLargeHeaderFadeAnim,
  largeHeaderOpacity,
  scrollY,
  showHeader,
  onLayout
}: ListHeaderProps) {
  if (!LargeHeaderComponent && !LargeHeaderSubtitleComponent) {
    return null
  }

  return (
    <View>
      {LargeHeaderComponent && (
        <View onLayout={onLayout}>
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
    </View>
  )
})

const FlashListWithHeaders = <ItemT = unknown,>({
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
  data,
  ref,
  ...props
}: FlashListWithHeadersProps<ItemT>) => {
  if (_unusedOnScroll) {
    throw new Error(
      "The 'onScroll' property is not supported. Please use onScrollWorklet to track the scroll container's state."
    )
  }

  const styles = useStyles(flashListStyles)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollRef = useAnimatedRef<any>()
  useImperativeHandle(ref, () => scrollRef.current as FlashListRef<ItemT>)

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

  const ListHeaderComponentMemo = useMemo(
    () => (
      <ListHeader
        LargeHeaderComponent={LargeHeaderComponent}
        LargeHeaderSubtitleComponent={LargeHeaderSubtitleComponent}
        largeHeaderContainerStyle={largeHeaderContainerStyle}
        disableLargeHeaderFadeAnim={disableLargeHeaderFadeAnim}
        largeHeaderOpacity={largeHeaderOpacity}
        scrollY={scrollY}
        showHeader={showHeader}
        onLayout={handleLargeHeaderLayout}
      />
    ),
    [
      LargeHeaderComponent,
      LargeHeaderSubtitleComponent,
      largeHeaderContainerStyle,
      disableLargeHeaderFadeAnim,
      largeHeaderOpacity,
      scrollY,
      showHeader,
      handleLargeHeaderLayout
    ]
  )

  return (
    <View style={containerStyleMemo}>
      {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
      <AnimatedFlashList
        ref={scrollRef}
        data={data}
        scrollEventThrottle={16}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        automaticallyAdjustContentInsets={false}
        removeClippedSubviews
        drawDistance={500}
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
        ListHeaderComponent={ListHeaderComponentMemo}
        {...props}
      />
      {absoluteHeader && (
        <View style={styles.absoluteHeader} onLayout={onAbsoluteHeaderLayout}>
          {HeaderComponent({ showHeader, scrollY })}
        </View>
      )}
    </View>
  )
}

const flashListStyles = createStyleSheet(({ runtime }) => ({
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

export { FlashListWithHeaders }
