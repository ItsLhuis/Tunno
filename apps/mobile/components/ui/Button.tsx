import { ReactNode, useEffect } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { colors as colorList } from "@constants/colors"

import { borderRadius, iconSize, spacing } from "@constants/styles"

import { View, type ViewStyle, type StyleProp } from "react-native"

import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Text, type TextProps } from "@components/ui/Text"
import { ActivityIndicator } from "@components/ui/ActivityIndicator"

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

export type ButtonProps = PressableProps & {
  title?: string | null | undefined
  isLoading?: boolean
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  variant?: "contained" | "text"
  color?: "primary" | "secondary" | "transparent"
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

  const textOpacity = useSharedValue(isLoading ? 0 : 1)
  const indicatorOpacity = useSharedValue(isLoading ? 1 : 0)

  useEffect(() => {
    textOpacity.value = withTiming(isLoading ? 0 : 1, { duration: 300 })
    indicatorOpacity.value = withTiming(isLoading ? 1 : 0, { duration: 300 })
  }, [isLoading])

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }))

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value
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
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.large,
            borderRadius: borderRadius.xSmall,
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
          <ActivityIndicator size={iconSize.large} color={indicatorColor} />
        </Animated.View>
      </Pressable>
    </View>
  )
}
Button.displayName = "Button"
