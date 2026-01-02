import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon, type IconProps } from "@components/ui/Icon"

import { createStyleSheet, useStyles } from "@styles"

import { getButtonForegroundColor } from "@lib/utils"

export type IconButtonProps = Omit<ButtonProps, "size" | "children"> & {
  name: IconProps["name"]
  isFilled?: boolean
  iconColor?: IconProps["color"]
  iconSize?: IconProps["size"]
}

const IconButton = ({
  name,
  isFilled,
  iconColor,
  iconSize,
  variant,
  containerStyle,
  style,
  ...props
}: IconButtonProps) => {
  const styles = useStyles(iconButtonStyles)

  const defaultIconColor = getButtonForegroundColor(variant)

  const iconColorToUse = iconColor ?? defaultIconColor

  return (
    <Button
      size="icon"
      variant={variant}
      containerStyle={[styles.container, containerStyle]}
      style={[styles.button, style]}
      {...props}
    >
      <Icon name={name} isFilled={isFilled} color={iconColorToUse} size={iconSize} />
    </Button>
  )
}

const iconButtonStyles = createStyleSheet(() => ({
  container: {
    alignSelf: "center"
  },
  button: {
    justifyContent: "center"
  }
}))

export { IconButton }
