import { borderRadius, spacing } from "@constants/styles"

import { Icon, IconProps } from "./Icon"
import { Button, type ButtonProps } from "./Button"
import { View } from "./View"

export type IconButtonProps = Omit<ButtonProps, "title" | "children" | "textStyle" | "color"> & {
  name: IconProps["name"]
  color?: string
  size?: number
}

export function IconButton({
  name,
  color,
  size,
  style,
  loading = false,
  disabled = false,
  ...rest
}: IconButtonProps) {
  return (
    <View>
      <Button
        variant="text"
        color="secondary"
        loading={loading}
        disabled={disabled}
        style={[
          {
            paddingVertical: spacing.xSmall,
            paddingHorizontal: spacing.xSmall,
            margin: -spacing.xSmall,
            borderRadius: borderRadius.round
          },
          style
        ]}
        {...rest}
      >
        <Icon name={name} size={size} color={color} />
      </Button>
    </View>
  )
}
