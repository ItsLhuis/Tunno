import { borderRadius, spacing } from "@constants/styles"

import { useColorTheme } from "@hooks/useColorTheme"

import { colors as colorList } from "@constants/colors"

import { ColorValue, Platform, View } from "react-native"

import { Icon, type IconProps } from "./Icon"
import { Button, type ButtonProps } from "./Button"

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

  const iconColor = buttonColor === "primary" ? colorList.dark.text : color ? color : colors.text

  return (
    <View>
      <Button
        variant={buttonColor ? "contained" : "text"}
        color={buttonColor || "secondary"}
        style={[
          {
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.small,
            margin: noMargin ? 0 : -spacing.small,
            borderRadius: borderRadius.round
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
