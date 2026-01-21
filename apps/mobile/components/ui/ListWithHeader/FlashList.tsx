import { useImperativeHandle, type ComponentClass, type ComponentProps, type Ref } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { FlashList, type FlashListProps, type FlashListRef } from "@shopify/flash-list"

import { FadingView } from "./components"

import Animated, { useAnimatedRef, type AnimatedProps } from "react-native-reanimated"

import { useScroll } from "./hooks"

import { type SharedScrollContainerProps } from "./types"

type AnimatedFlashListType<ItemT> = ComponentProps<
  ComponentClass<AnimatedProps<FlashListProps<ItemT>>, any>
> &
  SharedScrollContainerProps

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as unknown as ComponentClass<
  AnimatedProps<FlashListProps<any>>,
  unknown
>

export type FlashListWithHeadersProps<ItemT> = Omit<AnimatedFlashListType<ItemT>, "onScroll"> & {
  ref?: Ref<FlashListRef<ItemT>>
}

const FlashListWithHeaders = <ItemT extends any = any>({
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
  // @ts-ignore
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
  return (
    <View
      style={[
        styles.container(ignoreLeftSafeArea ?? false, ignoreRightSafeArea ?? false),
        containerStyle
      ]}
    >
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
        onScrollBeginDrag={(e) => {
          debouncedFixScroll.cancel()
          if (onScrollBeginDrag) onScrollBeginDrag(e)
        }}
        onScrollEndDrag={(e) => {
          debouncedFixScroll()
          if (onScrollEndDrag) onScrollEndDrag(e)
        }}
        onMomentumScrollBegin={(e) => {
          debouncedFixScroll.cancel()
          if (onMomentumScrollBegin) onMomentumScrollBegin(e)
        }}
        onMomentumScrollEnd={(e) => {
          debouncedFixScroll()
          if (onMomentumScrollEnd) onMomentumScrollEnd(e)
        }}
        contentContainerStyle={[scrollViewAdjustments.contentContainerStyle, contentContainerStyle]}
        automaticallyAdjustsScrollIndicatorInsets={
          automaticallyAdjustsScrollIndicatorInsets !== undefined
            ? automaticallyAdjustsScrollIndicatorInsets
            : !absoluteHeader
        }
        scrollIndicatorInsets={{
          ...scrollViewAdjustments.scrollIndicatorInsets,
          ...scrollIndicatorInsets
        }}
        ListHeaderComponent={
          <View>
            {LargeHeaderComponent && (
              <View
                onLayout={(event) => {
                  largeHeaderHeight.value = event.nativeEvent.layout.height

                  if (onLargeHeaderLayout) onLargeHeaderLayout(event.nativeEvent.layout)
                }}
              >
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
        }
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
