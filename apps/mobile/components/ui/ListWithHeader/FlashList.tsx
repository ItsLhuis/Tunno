import { forwardRef, useState, useImperativeHandle, Fragment } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useScroll } from "./useSroll"

import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize, zIndex } from "@constants/styles"

import { StyleSheet, View } from "react-native"

import { FlashList, FlashListProps } from "@shopify/flash-list"

import { FadingView } from "../FadingView"
import { ActivityIndicator } from "../ActivityIndicator"

import Animated, {
  AnimatedProps,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import type { SharedScrollContainerProps } from "./types"

type AnimatedFlashListType<ItemT> = React.ComponentProps<
  React.ComponentClass<AnimatedProps<FlashListProps<ItemT>>, any>
> &
  SharedScrollContainerProps

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as React.ComponentClass<
  AnimatedProps<FlashListProps<any>>,
  unknown
>

type FlashListWithHeadersProps<ItemT> = Omit<AnimatedFlashListType<ItemT>, "onScroll">

const FlashListWithHeadersComp = <ItemT extends any = any>(
  {
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
    inverted,
    ...rest
  }: FlashListWithHeadersProps<ItemT>,
  ref: React.Ref<FlashList<ItemT>>
) => {
  if (_unusedOnScroll) {
    throw new Error(
      "The 'onScroll' property is not supported. Please use onScrollWorklet to track the scroll container's state."
    )
  }

  const insets = useSafeAreaInsets()

  const { colors } = useColorTheme()

  const scrollRef = useAnimatedRef<any>()
  useImperativeHandle(ref, () => scrollRef.current)

  const [isLayoutComplete, setIsLayoutComplete] = useState<boolean>(false)

  const opacity = useSharedValue(1)

  const handleLayout = () => {
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setIsLayoutComplete)(true)
      })
    }, 100)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

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
    inverted: !!inverted,
    onScrollWorklet
  })

  const combinedContentContainerStyle = StyleSheet.flatten([
    scrollViewAdjustments.contentContainerStyle,
    contentContainerStyle
  ])

  return (
    <View
      onLayout={handleLayout}
      style={[
        { flex: 1 },
        containerStyle,
        !ignoreLeftSafeArea && { paddingLeft: insets.left },
        !ignoreRightSafeArea && { paddingRight: insets.right }
      ]}
    >
      {!isLayoutComplete && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: colors.background,
              justifyContent: "center",
              alignItems: "center",
              zIndex: zIndex.xHigh
            },
            animatedStyle
          ]}
        >
          <ActivityIndicator size={iconSize.xLarge} color={colors.primary} />
        </Animated.View>
      )}
      {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
      <View style={{ flex: 1, zIndex: -zIndex.xxxLow }}>
        <AnimatedFlashList
          ref={scrollRef}
          scrollEventThrottle={16}
          overScrollMode="never"
          onScroll={scrollHandler}
          automaticallyAdjustContentInsets={false}
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
          contentContainerStyle={combinedContentContainerStyle}
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
            <Fragment>
              {LargeHeaderComponent && (
                <View
                  onLayout={(e) => {
                    largeHeaderHeight.value = e.nativeEvent.layout.height

                    if (onLargeHeaderLayout) onLargeHeaderLayout(e.nativeEvent.layout)
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
              {LargeHeaderSubtitleComponent &&
                LargeHeaderSubtitleComponent({ showHeader, scrollY })}
            </Fragment>
          }
          inverted={inverted}
          {...rest}
        />
      </View>
      {absoluteHeader && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0
          }}
          onLayout={onAbsoluteHeaderLayout}
        >
          {HeaderComponent({ showHeader, scrollY })}
        </View>
      )}
    </View>
  )
}
FlashListWithHeadersComp.displayName = "FlashListWithHeaders"

const FlashListWithHeaders = forwardRef(FlashListWithHeadersComp) as <ItemT = any>(
  props: FlashListWithHeadersProps<ItemT> & {
    ref?: React.RefObject<FlashList<ItemT>>
  }
) => React.ReactElement

export { FlashListWithHeaders }
