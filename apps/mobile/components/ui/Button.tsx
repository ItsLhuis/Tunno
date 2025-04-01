import { ReactNode, useEffect } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { readableColor } from "polished"

import { View, type ColorValue, type StyleProp, type ViewStyle } from "react-native"

import { ActivityIndicator } from "./ActivityIndicator"
import { Pressable, type PressableProps } from "./Pressable"
import { Text, type TextProps } from "./Text"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export type ButtonProps = PressableProps & {
  title?: string | null | undefined
  isLoading?: boolean
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  variant?: "contained" | "text"
  color?: "primary" | "secondary" | "transparent" | ColorValue
  titleProps?: TextProps
  children?: ReactNode
}

export function Button({
  title,
  isLoading = false,
  disabled = false,
  containerStyle,
  style,
  variant = "contained",
  color = "primary",
  titleProps,
  children,
  ...props
}: ButtonProps) {
  const { colors } = useColorTheme()

  const backgroundColor =
    variant === "contained"
      ? color === "primary"
        ? colors.primary
        : color === "secondary"
        ? colors.muted
        : color
      : "transparent"

  const textColor =
    variant === "contained"
      ? color === "primary"
        ? colors.primaryForeground
        : color === "secondary"
        ? colors.mutedForeground
        : color === "transparent"
        ? colors.foreground
        : readableColor(color as string)
      : color === "primary"
      ? colors.primary
      : color === "secondary"
      ? colors.mutedForeground
      : color

  const indicatorColor = textColor

  const opacity = useSharedValue<number>(isLoading ? 0 : 1)

  useEffect(() => {
    opacity.value = withTiming(isLoading ? 0 : 1, { duration: 300 })
  }, [isLoading])

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value
  }))

  return (
    <View style={[{ alignSelf: "flex-start" }, containerStyle]}>
      <Pressable
        style={[
          {
            position: "relative",
            backgroundColor,
            opacity: disabled ? 0.5 : 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: theme.styles.spacing.small,
            paddingHorizontal: theme.styles.spacing.large,
            borderRadius: theme.styles.borderRadius.xSmall,
            alignSelf: "flex-start",
            flexDirection: "row"
          },
          style
        ]}
        disabled={disabled || isLoading}
        {...props}
      >
        <Animated.View style={animatedTextStyle}>
          {children ? (
            children
          ) : (
            <Text
              variant={titleProps?.variant ?? "bold"}
              style={[titleProps?.style, { color: textColor }]}
              {...titleProps}
            >
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
          <ActivityIndicator size={theme.styles.icon.size.large} color={indicatorColor} />
        </Animated.View>
      </Pressable>
    </View>
  )
}
Button.displayName = "Button"
