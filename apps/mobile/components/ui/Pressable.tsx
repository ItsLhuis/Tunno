import { type ReactNode } from "react"

import {
  type GestureResponderEvent,
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle
} from "react-native"

import { durationTokens, opacityTokens } from "@styles"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export type PressableProps = Omit<RNPressableProps, "style"> & {
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  disableScaleEffect?: boolean
  disableOpacityEffect?: boolean
  children?: ReactNode
}

const pressScale = 0.96
const pressOpacity = opacityTokens[60]
const pressDuration = durationTokens[100]
const defaultOpacity = opacityTokens[100]

const Pressable = ({
  containerStyle,
  disableScaleEffect = false,
  disableOpacityEffect = false,
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}: PressableProps) => {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePressIn = (event: GestureResponderEvent) => {
    if (!disableScaleEffect) {
      scale.value = withTiming(pressScale, { duration: pressDuration })
    }
    if (!disableOpacityEffect) {
      opacity.value = withTiming(pressOpacity, { duration: pressDuration })
    }
    onPressIn?.(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    if (!disableScaleEffect) {
      scale.value = withTiming(1, { duration: pressDuration })
    }
    if (!disableOpacityEffect) {
      opacity.value = withTiming(defaultOpacity, { duration: pressDuration })
    }
    onPressOut?.(event)
  }

  return (
    <RNPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={containerStyle}
      {...props}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </RNPressable>
  )
}

export { Pressable }
