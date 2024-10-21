import { useRef, useState } from "react"

import { usePlayerContext } from "@contexts/PlayerContext"

import { useThemeColor } from "@hooks/useThemeColor"

import { spacing, zIndex } from "@constants/styles"

import { Animated as RNAnimated, StyleSheet } from "react-native"

import { View } from "./View"
import { AppBar, type AppBarProps } from "./AppBar"
import { FlashList, type FlashListProps } from "@shopify/flash-list"
import { ActivityIndicator } from "./ActivityIndicator"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated"

export type AppBarListProps<T> = AppBarProps & FlashListProps<T>

export function AppBarList<T>({
  title,
  renderLeft,
  renderRight,
  contentContainerStyle,
  ...rest
}: AppBarListProps<T>) {
  const { playerHeight } = usePlayerContext()

  const colors = useThemeColor()

  const [headerHeight, setHeaderHeight] = useState<number>(0)

  const [isLayoutComplete, setIsLayoutComplete] = useState<boolean>(false)

  const opacity = useSharedValue(1)

  const handleLayout = () => {
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setIsLayoutComplete)(true)
      })
    }, 300)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  const scrollY = useRef(new RNAnimated.Value(0)).current

  const handleScroll = RNAnimated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false
  })

  const combinedContentContainerStyle = StyleSheet.flatten([
    contentContainerStyle,
    {
      paddingBottom: playerHeight + (spacing.small + spacing.xxSmall) * 2,
      paddingTop: headerHeight,
      paddingHorizontal: spacing.large
    }
  ])

  return (
    <View onLayout={handleLayout} style={{ flex: 1 }}>
      {!isLayoutComplete && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.background,
              justifyContent: "center",
              alignItems: "center",
              zIndex: zIndex.max
            },
            animatedStyle
          ]}
        >
          <ActivityIndicator size={31} color={colors.primary} />
        </Animated.View>
      )}
      <AppBar
        isForList
        scrollY={scrollY}
        title={title}
        renderLeft={renderLeft}
        renderRight={renderRight}
        onHeaderHeightChange={setHeaderHeight}
      />
      <View style={{ flex: 1 }}>
        <FlashList
          {...rest}
          scrollEventThrottle={16}
          contentContainerStyle={combinedContentContainerStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          overScrollMode="never"
        />
      </View>
    </View>
  )
}
