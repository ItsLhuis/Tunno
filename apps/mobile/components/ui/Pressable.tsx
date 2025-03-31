import { ReactNode } from "react"

import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle
} from "react-native"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export type PressableProps = RNPressableProps & {
  containerStyle?: StyleProp<ViewStyle>
  disableScaleEffect?: boolean
  disableOpacityEffect?: boolean
  children?: ReactNode
}

export function Pressable({
  containerStyle,
  disableScaleEffect = false,
  disableOpacityEffect = false,
  children,
  ...props
}: PressableProps) {
  const scale = useSharedValue<number>(1)
  const opacity = useSharedValue<number>(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const handlePressIn = () => {
    if (!disableScaleEffect) {
      scale.value = withTiming(0.96, { duration: 100 })
    }
    if (!disableOpacityEffect) {
      opacity.value = withTiming(0.6, { duration: 100 })
    }
  }

  const handlePressOut = () => {
    if (!disableScaleEffect) {
      scale.value = withTiming(1, { duration: 100 })
    }
    if (!disableOpacityEffect) {
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
