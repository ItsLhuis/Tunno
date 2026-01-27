import { useImperativeHandle, type ReactNode, type Ref } from "react"

import { View, type ScrollViewProps } from "react-native"

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
  // @ts-ignore
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

  return (
    <View
      style={[
        styles.container(ignoreLeftSafeArea ?? false, ignoreRightSafeArea ?? false),
        containerStyle
      ]}
    >
      {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        automaticallyAdjustContentInsets={false}
        onScrollBeginDrag={(event) => {
          debouncedFixScroll.cancel()
          if (onScrollBeginDrag) onScrollBeginDrag(event)
        }}
        onScrollEndDrag={(event) => {
          debouncedFixScroll()
          if (onScrollEndDrag) onScrollEndDrag(event)
        }}
        onMomentumScrollBegin={(event) => {
          debouncedFixScroll.cancel()
          if (onMomentumScrollBegin) onMomentumScrollBegin(event)
        }}
        onMomentumScrollEnd={(event) => {
          debouncedFixScroll()
          if (onMomentumScrollEnd) onMomentumScrollEnd(event)
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
