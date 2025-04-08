import { theme } from "@styles/theme"
import { readableColor } from "polished"

import { useColorTheme } from "@hooks/useColorTheme"

import { Platform, View } from "react-native"

import { Button, type ButtonProps } from "./Button"
import { Icon, type IconProps } from "./Icon"

export type IconButtonProps = Omit<ButtonProps, "title" | "titleProps" | "children"> & {
  name: IconProps["name"] | "More"
  isFilled?: boolean
  size?: number
  noMargin?: boolean
}

export function IconButton({
  name,
  isFilled = false,
  color = "transparent",
  size,
  noMargin = false,
  containerStyle,
  style,
  variant = "text",
  ...props
}: IconButtonProps) {
  const { colors } = useColorTheme()

  const iconName: IconProps["name"] =
    name === "More" ? (Platform.OS === "android" ? "EllipsisVertical" : "Ellipsis") : name

  const iconColor =
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
      : color === "transparent"
      ? colors.foreground
      : color

  return (
    <View>
      <Button
        variant={variant}
        color={color}
        containerStyle={[{ margin: noMargin ? 0 : -theme.styles.spacing.small }, containerStyle]}
        style={[
          {
            paddingVertical: theme.styles.spacing.small,
            paddingHorizontal: theme.styles.spacing.small,
            borderRadius: theme.styles.borderRadius.round
          },
          style
        ]}
        {...props}
      >
        <Icon name={iconName} size={size} color={iconColor} isFilled={isFilled} />
      </Button>
    </View>
  )
}
IconButton.displayName = "IconButton"
