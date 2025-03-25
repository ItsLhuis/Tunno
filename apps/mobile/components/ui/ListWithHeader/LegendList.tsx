import {
  useState,
  forwardRef,
  useImperativeHandle,
  isValidElement,
  type ComponentProps,
  type ComponentClass,
  type Ref,
  type RefObject,
  type ReactElement
} from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useScroll } from "./hooks"

import { View } from "react-native"

import { AnimatedLegendList } from "@legendapp/list/reanimated"
import { type LegendListProps } from "@legendapp/list"

import { FadingView } from "../FadingView"

import Animated, { AnimatedProps, FadeIn, useAnimatedRef } from "react-native-reanimated"

import type { SharedScrollContainerProps } from "./types"

type AnimatedLegendListType<ItemT> = ComponentProps<
  ComponentClass<AnimatedProps<LegendListProps<ItemT>>, any>
> &
  SharedScrollContainerProps

export type LegendListWithHeadersProps<ItemT> = Omit<AnimatedLegendListType<ItemT>, "onScroll">

const LegendListWithHeadersComp = <ItemT extends any = any>(
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
    data,
    ListEmptyComponent,
    ...props
  }: LegendListWithHeadersProps<ItemT>,
  ref: Ref<LegendListProps<ItemT>>
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
      <AnimatedLegendList
        ref={scrollRef}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        // @ts-ignore
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
        // @ts-ignore
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
LegendListWithHeadersComp.displayName = "LegendListWithHeaders"

const LegendListWithHeaders = forwardRef(LegendListWithHeadersComp) as <ItemT = any>(
  props: LegendListWithHeadersProps<ItemT> & {
    ref?: RefObject<LegendListProps<ItemT>>
  }
) => ReactElement | null

export { LegendListWithHeaders }
