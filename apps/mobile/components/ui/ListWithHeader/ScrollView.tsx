import { forwardRef, useImperativeHandle } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useScroll } from "./useSroll"

import { View, ScrollView } from "react-native"

import { FadingView } from "../FadingView"

import Animated, { useAnimatedRef } from "react-native-reanimated"

import { type SharedScrollContainerProps } from "./types"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

type AnimatedScrollViewProps = React.ComponentProps<typeof AnimatedScrollView> & {
  children?: React.ReactNode
}

type ScrollViewWithHeadersProps = Omit<
  AnimatedScrollViewProps & SharedScrollContainerProps,
  "onScroll"
>

export const ScrollViewWithHeaders = forwardRef<Animated.ScrollView, ScrollViewWithHeadersProps>(
  (
    {
      largeHeaderShown,
      containerStyle,
      LargeHeaderSubtitleComponent,
      LargeHeaderComponent,
      largeHeaderContainerStyle,
      HeaderComponent,
      onLargeHeaderLayout,
      ignoreLeftSafeArea,
      ignoreRightSafeArea,
      onScrollBeginDrag,
      onScrollEndDrag,
      onScrollWorklet,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      disableAutoFixScroll = false,
      // @ts-ignore
      onScroll: _unusedOnScroll,
      children,
      absoluteHeader = false,
      initialAbsoluteHeaderHeight = 0,
      contentContainerStyle,
      automaticallyAdjustsScrollIndicatorInsets,
      headerFadeInThreshold = 1,
      scrollIndicatorInsets = {},
      disableLargeHeaderFadeAnim = false,
      ...props
    }: ScrollViewWithHeadersProps,
    ref: React.Ref<Animated.ScrollView | null>
  ) => {
    if (_unusedOnScroll) {
      throw new Error(
        "The 'onScroll' property is not supported. Please use onScrollWorklet to track the scroll container's state."
      )
    }

    const insets = useSafeAreaInsets()

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    useImperativeHandle(ref, () => scrollRef.current)

    const {
      scrollY,
      showHeader,
      largeHeaderHeight,
      largeHeaderOpacity,
      scrollHandler,
      debouncedFixScroll,
      absoluteHeaderHeight,
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
          { flex: 1 },
          containerStyle,
          !ignoreLeftSafeArea && { paddingLeft: insets.left },
          !ignoreRightSafeArea && { paddingRight: insets.right }
        ]}
      >
        {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
        <AnimatedScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
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
          contentContainerStyle={[
            scrollViewAdjustments.contentContainerStyle,
            contentContainerStyle
          ]}
          automaticallyAdjustsScrollIndicatorInsets={
            automaticallyAdjustsScrollIndicatorInsets !== undefined
              ? automaticallyAdjustsScrollIndicatorInsets
              : !absoluteHeader
          }
          scrollIndicatorInsets={{
            top: absoluteHeader ? absoluteHeaderHeight : 0,
            ...scrollIndicatorInsets
          }}
          {...props}
        >
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
          {LargeHeaderSubtitleComponent && LargeHeaderSubtitleComponent({ showHeader, scrollY })}
          {children}
        </AnimatedScrollView>
        {absoluteHeader && (
          <View
            style={{ position: "absolute", top: 0, right: 0, left: 0 }}
            onLayout={onAbsoluteHeaderLayout}
          >
            {HeaderComponent({ showHeader, scrollY })}
          </View>
        )}
      </View>
    )
  }
)
ScrollViewWithHeaders.displayName = "ScrollViewWithHeaders"
