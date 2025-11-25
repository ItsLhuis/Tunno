import { useImperativeHandle, type ComponentProps, type ReactNode } from "react"

import { createStyleSheet, useStyles } from "@styles"

import { useScroll } from "./hooks"

import { ScrollView, View } from "react-native"

import { FadingView } from "./components"

import Animated, { useAnimatedRef } from "react-native-reanimated"

import { type SharedScrollContainerProps } from "./types"

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

type AnimatedScrollViewProps = ComponentProps<typeof AnimatedScrollView> & {
  children?: ReactNode
}

type ScrollViewWithHeadersProps = Omit<
  AnimatedScrollViewProps & SharedScrollContainerProps,
  "onScroll"
> & {
  ref?: React.Ref<Animated.ScrollView>
}

const ScrollViewWithHeaders = ({
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
        styles.container(ignoreLeftSafeArea ?? false, ignoreRightSafeArea ?? false),
        containerStyle
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
        contentContainerStyle={[scrollViewAdjustments.contentContainerStyle, contentContainerStyle]}
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
        {children}
      </AnimatedScrollView>
      {absoluteHeader && (
        <View style={styles.absoluteHeader} onLayout={onAbsoluteHeaderLayout}>
          {HeaderComponent({ showHeader, scrollY })}
        </View>
      )}
    </View>
  )
}

const scrollViewStyles = createStyleSheet(({ runtime }) => ({
  container: (ignoreLeftSafeArea: boolean, ignoreRightSafeArea: boolean) => ({
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
