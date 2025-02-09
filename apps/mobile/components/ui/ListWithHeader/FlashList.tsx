import { useState, forwardRef, useImperativeHandle, isValidElement } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useScroll } from "./useSroll"

import { Dimensions, StyleSheet, View } from "react-native"

import { FlashList, FlashListProps } from "@shopify/flash-list"

import { FadingView } from "../FadingView"

import Animated, { AnimatedProps, FadeIn, useAnimatedRef } from "react-native-reanimated"

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
    data,
    ListEmptyComponent,
    ...props
  }: FlashListWithHeadersProps<ItemT>,
  ref: React.Ref<FlashList<ItemT>>
) => {
  if (_unusedOnScroll) {
    throw new Error(
      "The 'onScroll' property is not supported. Please use onScrollWorklet to track the scroll container's state."
    )
  }

  const insets = useSafeAreaInsets()

  const [listHeight, setListHeight] = useState<number>(0)
  const [headerListHeight, setHeaderListHeight] = useState<number>(0)

  const scrollRef = useAnimatedRef<any>()
  useImperativeHandle(ref, () => scrollRef.current)

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
      style={[
        { flex: 1 },
        containerStyle,
        !ignoreLeftSafeArea && { paddingLeft: insets.left },
        !ignoreRightSafeArea && { paddingRight: insets.right }
      ]}
    >
      {!absoluteHeader && HeaderComponent({ showHeader, scrollY })}
      <AnimatedFlashList
        ref={scrollRef}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        data={data}
        scrollEnabled={
          Array.isArray(data)
            ? data.length > 0
            : data && "value" in data && Array.isArray(data.value) && data.value.length > 0
            ? true
            : false
        }
        scrollEventThrottle={16}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
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
          <View onLayout={(e) => setHeaderListHeight(e.nativeEvent.layout.height)}>
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
          </View>
        }
        ListEmptyComponent={
          listHeight !== 0 ? (
            <Animated.View
              entering={FadeIn}
              style={{ height: listHeight - headerListHeight - insets.top }}
            >
              {ListEmptyComponent ? (
                typeof ListEmptyComponent === "function" ? (
                  <ListEmptyComponent />
                ) : isValidElement(ListEmptyComponent) ? (
                  ListEmptyComponent
                ) : null
              ) : null}
            </Animated.View>
          ) : null
        }
        inverted={inverted}
        estimatedListSize={{
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width
        }}
        {...props}
      />
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
