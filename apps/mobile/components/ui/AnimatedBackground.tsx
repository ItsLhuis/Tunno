import { type ReactNode } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import Animated, { type AnimatedStyle, useAnimatedStyle } from "react-native-reanimated"

import { useAnimatedPaletteColor } from "@styles"

import { type AnimatedPaletteColorKey } from "@styles/core/AnimatedScopedPalette"

export type AnimatedBackgroundProps = {
  children?: ReactNode
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  colorKey?: AnimatedPaletteColorKey
}

export const AnimatedBackground = ({
  children,
  style,
  colorKey = "background"
}: AnimatedBackgroundProps) => {
  const backgroundColor = useAnimatedPaletteColor(colorKey)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }))

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
}
