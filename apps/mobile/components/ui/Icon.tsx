import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize } from "@constants/styles"

import { ColorValue } from "react-native"

import { icons, type LucideProps } from "lucide-react-native"

export type IconProps = LucideProps & {
  name: keyof typeof icons
  isFilled?: boolean
  color?: ColorValue
}

export function Icon({ name, isFilled, size = iconSize.large, color, ...props }: IconProps) {
  const { colors } = useColorTheme()

  const iconColor = color || colors.text

  const iconFill = isFilled ? color : "transparent"

  const LucideIcon = icons[name] ?? icons["Info"]

  return <LucideIcon color={iconColor} fill={iconFill} size={size} {...props} />
}
Icon.displayName = "Icon"
