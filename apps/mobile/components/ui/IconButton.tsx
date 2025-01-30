import { borderRadius, spacing } from "@constants/styles"

import { colors as colorList } from "@constants/colors"

import { ColorValue, Platform, View } from "react-native"

import { Icon, type IconProps } from "@components/ui/Icon"
import { Button, type ButtonProps } from "@components/ui/Button"

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
  const iconName: IconProps["name"] =
    name === "More" ? (Platform.OS === "android" ? "EllipsisVertical" : "Ellipsis") : name

  const iconColor = buttonColor === "primary" ? colorList.dark.text : color

  return (
    <View>
      <Button
        variant={buttonColor ? "contained" : "text"}
        color={buttonColor || "secondary"}
        style={[
          {
            paddingVertical: spacing.xSmall,
            paddingHorizontal: spacing.xSmall,
            margin: noMargin ? 0 : -spacing.xSmall,
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
