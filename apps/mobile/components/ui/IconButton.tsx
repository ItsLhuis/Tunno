import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon, type IconProps } from "@components/ui/Icon"

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
  ...props
}: IconButtonProps) => {
  const defaultIconColor = getButtonForegroundColor(variant)

  const iconColorToUse = iconColor ?? defaultIconColor

  return (
    <Button size="icon" variant={variant} {...props}>
      <Icon name={name} isFilled={isFilled} color={iconColorToUse} size={iconSize} />
    </Button>
  )
}

export { IconButton }
