import { createStyleSheet, useStyles } from "@styles"

import {
  AnimatedButton,
  Button,
  type AnimatedButtonProps,
  type ButtonProps
} from "@components/ui/Button"
import { AnimatedIcon, Icon, type AnimatedIconProps, type IconProps } from "@components/ui/Icon"

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

export type AnimatedIconButtonProps = Omit<AnimatedButtonProps, "size" | "children"> & {
  name: IconProps["name"]
  isFilled?: boolean
  animatedIconColor?: AnimatedIconProps["animatedColor"]
  iconSize?: IconProps["size"]
}

const AnimatedIconButton = ({
  name,
  isFilled,
  animatedIconColor = "foreground",
  iconSize,
  variant,
  containerStyle,
  style,
  ...props
}: AnimatedIconButtonProps) => {
  const styles = useStyles(iconButtonStyles)

  return (
    <AnimatedButton
      size="icon"
      variant={variant}
      containerStyle={[styles.container, containerStyle]}
      style={[styles.button, style]}
      {...props}
    >
      <AnimatedIcon
        name={name}
        isFilled={isFilled}
        animatedColor={animatedIconColor}
        size={iconSize}
      />
    </AnimatedButton>
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

export { AnimatedIconButton, IconButton }
