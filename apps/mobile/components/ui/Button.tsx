import { useEffect } from "react"

import { useThemeColor } from "@hooks/useThemeColor"

import { colors as colorList } from "@constants/colors"

import { borderRadius, spacing } from "@constants/styles"

import { ViewStyle, TextStyle } from "react-native"

import { Pressable, type PressableProps } from "./Pressable"
import { View } from "./View"
import { Text } from "./Text"
import { ActivityIndicator } from "./ActivityIndicator"

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

export type ButtonProps = PressableProps & {
  title?: string
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: "contained" | "text"
  color?: "primary" | "secondary"
  children?: React.ReactNode
}

export function Button({
  title,
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = "contained",
  color = "primary",
  children,
  ...rest
}: ButtonProps) {
  const colors = useThemeColor()

  const isContained = variant === "contained"

  const backgroundColor = isContained
    ? color === "primary"
      ? colors.primary
      : colors.secondary
    : "transparent"
  const textColor = isContained
    ? color === "primary"
      ? colorList.dark.text
      : colors.text
    : color === "primary"
    ? colors.primary
    : colors.text

  const indicatorColor = textColor

  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const textOpacity = useSharedValue(loading ? 0 : 1)
  const indicatorOpacity = useSharedValue(loading ? 1 : 0)

  useEffect(() => {
    textOpacity.value = withTiming(loading ? 0 : 1, { duration: 300 })
    indicatorOpacity.value = withTiming(loading ? 1 : 0, { duration: 300 })
  }, [loading])

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }))

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value
  }))

  return (
    <Animated.View style={[animatedButtonStyle, { alignSelf: "flex-start" }]}>
      <Pressable
        style={[
          {
            backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.large,
            borderRadius: borderRadius.xSmall,
            alignSelf: "flex-start",
            flexDirection: "row"
          },
          style
        ]}
        disabled={disabled || loading}
        onPressIn={() => {
          scale.value = withTiming(0.9, { duration: 100 })
          if (isContained) {
            opacity.value = withTiming(0.8, { duration: 100 })
          }
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 100 })
          if (isContained) {
            opacity.value = withTiming(1, { duration: 100 })
          }
        }}
        {...rest}
      >
        <View style={{ opacity: 0 }}>
          {children ? (
            children
          ) : (
            <Text variant="bold" style={[textStyle, { color: textColor }]}>
              {title}
            </Text>
          )}
        </View>
        <Animated.View style={[animatedTextStyle, { position: "absolute" }]}>
          {children ? (
            children
          ) : (
            <Text variant="bold" style={[textStyle, { color: textColor }]}>
              {title}
            </Text>
          )}
        </Animated.View>
        <Animated.View style={[animatedIndicatorStyle, { position: "absolute" }]}>
          <ActivityIndicator color={indicatorColor} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}
