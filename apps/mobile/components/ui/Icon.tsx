import { ColorValue } from "react-native"

import { type ColorKey, type FontSizeAlias, fontSizeTokens, resolveColor, useTheme } from "@styles"

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

export { Icon }
