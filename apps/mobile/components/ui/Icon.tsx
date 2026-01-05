import { ColorValue } from "react-native"

import Animated, { useAnimatedProps } from "react-native-reanimated"

import {
  type ColorKey,
  type FontSizeAlias,
  fontSizeTokens,
  resolveColor,
  useAnimatedPaletteColor,
  useTheme
} from "@styles"

import { type AnimatedPaletteColorKey } from "@styles/core/AnimatedScopedPalette"

import { icons, type LucideProps } from "lucide-react-native"

type IconSize = FontSizeAlias | `${string}%`

export type IconName = keyof typeof icons

export type IconProps = Omit<LucideProps, "size" | "color"> & {
  name: IconName
  isFilled?: boolean
  size?: IconSize
  color?: ColorKey
}

const Icon = ({ name, isFilled, size = "lg", color, style, ...props }: IconProps) => {
  const { theme } = useTheme()

  const LucideIcon = icons[name] ?? icons["Info"]

  const isAlias = size in fontSizeTokens
  const iconSize = isAlias ? theme.fontSize(size as FontSizeAlias) : size

  const resolvedColor = color ? resolveColor(theme, color) : undefined
  const iconColor: ColorValue = resolvedColor ?? theme.colors.foreground
  const iconFill: ColorValue = isFilled ? iconColor : "transparent"

  return <LucideIcon color={iconColor} fill={iconFill} size={iconSize} style={style} {...props} />
}

export type AnimatedIconProps = Omit<LucideProps, "size" | "color"> & {
  name: IconName
  isFilled?: boolean
  size?: IconSize
  animatedColor?: AnimatedPaletteColorKey
}

const AnimatedIcon = ({
  name,
  isFilled,
  size = "lg",
  animatedColor = "foreground",
  style,
  ...props
}: AnimatedIconProps) => {
  const { theme } = useTheme()

  const LucideIcon = icons[name] ?? icons["Info"]
  const AnimatedLucideIcon = Animated.createAnimatedComponent(LucideIcon)

  const isAlias = size in fontSizeTokens
  const iconSize = isAlias ? theme.fontSize(size as FontSizeAlias) : size

  const color = useAnimatedPaletteColor(animatedColor)

  const animatedProps = useAnimatedProps(() => ({
    color: color.value,
    fill: isFilled ? color.value : "transparent"
  }))

  return (
    <AnimatedLucideIcon
      size={iconSize}
      style={style}
      animatedProps={animatedProps}
      color={theme.colors[animatedColor]}
      fill={isFilled ? theme.colors[animatedColor] : "transparent"}
      {...props}
    />
  )
}

export { AnimatedIcon, Icon }
