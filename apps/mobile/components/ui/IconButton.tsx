import { theme } from "@styles/theme"

import { useColorTheme } from "@hooks/useColorTheme"

import { ColorValue, Platform, View } from "react-native"

import { Button, type ButtonProps } from "./Button"
import { Icon, type IconProps } from "./Icon"

export type IconButtonProps = Omit<ButtonProps, "title" | "titleProps" | "color" | "children"> & {
  name: IconProps["name"] | "More"
  isFilled?: boolean
  buttonColor?: ButtonProps["color"]
  color?: ColorValue
  size?: number
  noMargin?: boolean
}

export function IconButton({
  name,
  isFilled = false,
  buttonColor,
  color,
  size,
  noMargin = false,
  style,
  ...props
}: IconButtonProps) {
  const { colors } = useColorTheme()

  const iconName: IconProps["name"] =
    name === "More" ? (Platform.OS === "android" ? "EllipsisVertical" : "Ellipsis") : name

  const iconColor =
    buttonColor === "primary" ? colors.primaryForeground : color ? color : colors.foreground

  return (
    <View>
      <Button
        variant={buttonColor ? "contained" : "text"}
        color={buttonColor || "secondary"}
        style={[
          {
            paddingVertical: theme.styles.spacing.small,
            paddingHorizontal: theme.styles.spacing.small,
            margin: noMargin ? 0 : -theme.styles.spacing.small,
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
