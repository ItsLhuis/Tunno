import { ReactNode, useEffect } from "react"

import { useThemeColor } from "@hooks/useThemeColor"

import { colors as colorList } from "@constants/colors"

import { borderRadius, spacing } from "@constants/styles"

import { ViewStyle, TextStyle, StyleProp } from "react-native"

import { Pressable, type PressableProps } from "./Pressable"
import { Text } from "./Text"
import { ActivityIndicator } from "./ActivityIndicator"

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

export type ButtonProps = PressableProps & {
  title?: string | null | undefined
  loading?: boolean
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  variant?: "contained" | "text"
  color?: "primary" | "secondary" | "transparent"
  disablePressAnimation?: boolean
  children?: ReactNode
}

export function Button({
  title,
  loading = false,
  disabled = false,
  containerStyle,
  style,
  textStyle,
  variant = "contained",
  color = "primary",
  children,
  disablePressAnimation = false,
  ...rest
}: ButtonProps) {
  const { colors } = useThemeColor()

  const isContained = variant === "contained"

  const backgroundColor = isContained
    ? color === "primary"
      ? colors.primary
      : color === "secondary"
      ? colors.secondary
      : "transparent"
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
    <Animated.View style={[animatedButtonStyle, { alignSelf: "flex-start" }, containerStyle]}>
      <Pressable
        style={[
          {
            position: "relative",
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
          if (!disablePressAnimation) {
            scale.value = withTiming(0.94, { duration: 100 })
          }
          if (isContained) {
            opacity.value = withTiming(0.6, { duration: 100 })
          }
        }}
        onPressOut={() => {
          if (!disablePressAnimation) {
            scale.value = withTiming(1, { duration: 100 })
          }
          if (isContained) {
            opacity.value = withTiming(1, { duration: 100 })
          }
        }}
        {...rest}
      >
        <Animated.View style={animatedTextStyle}>
          {children ? (
            children
          ) : (
            <Text variant="bold" style={[textStyle, { color: textColor }]}>
              {title}
            </Text>
          )}
        </Animated.View>
        <Animated.View
          style={[
            animatedIndicatorStyle,
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color={indicatorColor} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}
