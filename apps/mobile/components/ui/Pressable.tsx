import { ReactNode } from "react"

import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle
} from "react-native"

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

export type PressableProps = RNPressableProps & {
  containerStyle?: StyleProp<ViewStyle>
  disablePressEffect?: boolean
  children?: ReactNode
}

export function Pressable({
  containerStyle,
  disablePressEffect = false,
  children,
  ...props
}: PressableProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePressIn = () => {
    if (!disablePressEffect) {
      scale.value = withTiming(0.96, { duration: 100 })
      opacity.value = withTiming(0.6, { duration: 100 })
    }
  }

  const handlePressOut = () => {
    if (!disablePressEffect) {
      scale.value = withTiming(1, { duration: 100 })
      opacity.value = withTiming(1, { duration: 100 })
    }
  }

  return (
    <Animated.View style={[animatedStyle, containerStyle]}>
      <RNPressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
        {children}
      </RNPressable>
    </Animated.View>
  )
}
Pressable.displayName = "Pressable"
