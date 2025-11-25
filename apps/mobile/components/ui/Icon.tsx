import { ColorValue } from "react-native"

import { type ColorKey, type FontSizeAlias, resolveColor, useTheme } from "@styles"

import { icons, type LucideProps } from "lucide-react-native"

type IconSize = FontSizeAlias

export type IconProps = Omit<LucideProps, "size" | "color"> & {
  name: keyof typeof icons
  isFilled?: boolean
  size?: IconSize
  color?: ColorKey
}

const Icon = ({ name, isFilled, size = "base", color, style, ...props }: IconProps) => {
  const { theme } = useTheme()

  const LucideIcon = icons[name] ?? icons["Info"]

  const iconSize = theme.fontSize(size)

  const resolvedColor = color ? resolveColor(theme, color) : undefined
  const iconColor: ColorValue = resolvedColor ?? theme.colors.foreground
  const iconFill: ColorValue = isFilled ? iconColor : "transparent"

  return <LucideIcon color={iconColor} fill={iconFill} size={iconSize} style={style} {...props} />
}

export { Icon }
