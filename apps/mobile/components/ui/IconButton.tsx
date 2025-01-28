import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import { Icon, type IconProps } from "@components/ui/Icon"
import { Button, type ButtonProps } from "@components/ui/Button"

export type IconButtonProps = Omit<ButtonProps, "title" | "titleProps" | "color" | "children"> & {
  name: IconProps["name"]
  isFilled?: boolean
  color?: string
  size?: number
}

export function IconButton({
  name,
  isFilled = false,
  color,
  size,
  style,
  ...props
}: IconButtonProps) {
  return (
    <View>
      <Button
        variant="text"
        color="secondary"
        style={[
          {
            paddingVertical: spacing.xSmall,
            paddingHorizontal: spacing.xSmall,
            margin: -spacing.xSmall,
            borderRadius: borderRadius.round
          },
          style
        ]}
        {...props}
      >
        <Icon name={name} size={size} color={color} isFilled={isFilled} />
      </Button>
    </View>
  )
}
IconButton.displayName = "IconButton"
