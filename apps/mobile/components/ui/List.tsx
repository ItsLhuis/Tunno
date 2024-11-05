import { useRef, useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { usePlayerContext } from "@contexts/PlayerContext"

import { useThemeColor } from "@hooks/useThemeColor"

import { border, iconSize, spacing, zIndex } from "@constants/styles"

import { Animated as RNAnimated, StyleProp, StyleSheet, ViewStyle } from "react-native"

import { View } from "./View"
import { Header, type HeaderProps } from "./Header"
import { FlashList, type FlashListProps } from "@shopify/flash-list"
import { ActivityIndicator } from "./ActivityIndicator"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from "react-native-reanimated"

export type ListProps<T> = FlashListProps<T> & {
  headerProps: HeaderProps
  hasPlayer?: boolean
  overlayStyle?: StyleProp<ViewStyle>
}

export function List<T>({
  headerProps,
  hasPlayer = true,
  overlayStyle,
  contentContainerStyle,
  ...rest
}: ListProps<T>) {
  const insets = useSafeAreaInsets()

  const playerHeight = hasPlayer ? usePlayerContext()?.playerHeight + spacing.small || 0 : 0

  const { colors } = useThemeColor()

  const [headerHeight, setHeaderHeight] = useState<number>(0)

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

  const scrollY = useRef(new RNAnimated.Value(0)).current

  const handleScroll = RNAnimated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false
  })

  const headerSeparatorOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.6, headerHeight],
    outputRange: [0, 0.1, 1],
    extrapolate: "clamp"
  })

  const combinedContentContainerStyle = StyleSheet.flatten([
    { paddingHorizontal: spacing.large },
    contentContainerStyle,
    {
      paddingBottom: playerHeight ? playerHeight : insets.bottom,
      paddingTop: headerProps.isAnimated ? headerHeight - spacing.small - 3 : 0
    }
  ])

  return (
    <View onLayout={handleLayout} style={{ flex: 1 }}>
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
            overlayStyle,
            animatedStyle
          ]}
        >
          <ActivityIndicator size={iconSize.xLarge} color={colors.primary} />
        </Animated.View>
      )}
      <Header {...headerProps} scrollY={scrollY} onHeaderHeightChange={setHeaderHeight} />
      <RNAnimated.View
        style={{
          opacity: headerSeparatorOpacity,
          backgroundColor: colors.secondary,
          height: border.thin,
          width: "100%"
        }}
      />
      <View style={{ flex: 1, zIndex: -zIndex.xxxLow }}>
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
