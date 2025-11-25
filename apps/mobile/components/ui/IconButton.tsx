import { createStyleSheet, useStyles } from "@styles"

import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon, type IconProps } from "@components/ui/Icon"

import { getButtonForegroundColor } from "@lib/utils"

export type IconButtonProps = Omit<ButtonProps, "size" | "children"> & {
  name: IconProps["name"]
  isFilled?: boolean
  iconColor?: IconProps["color"]
  iconSize?: IconProps["size"]
  margin?: boolean
}

const IconButton = ({
  name,
  isFilled,
  iconColor,
  iconSize,
  variant,
  style,
  margin = false,
  ...props
}: IconButtonProps) => {
  const styles = useStyles(iconButtonStyles)

  const defaultIconColor = getButtonForegroundColor(variant)

  const iconColorToUse = iconColor ?? defaultIconColor

  return (
    <Button
      size="icon"
      variant={variant}
      style={[style, margin ? styles.buttonMargin : undefined]}
      {...props}
    >
      <Icon name={name} isFilled={isFilled} color={iconColorToUse} size={iconSize} />
    </Button>
  )
}

const iconButtonStyles = createStyleSheet(({ theme }) => ({
  buttonMargin: {
    margin: -theme.space(3)
  }
}))

export { IconButton }
