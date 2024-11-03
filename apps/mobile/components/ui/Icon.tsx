import { useThemeColor } from "@hooks/useThemeColor"

import { iconSize } from "@constants/styles"

import { type ComponentProps } from "react"

import Ionicons from "@expo/vector-icons/Ionicons"

export interface IconProps extends ComponentProps<typeof Ionicons> {
  size?: number
  color?: string
}

export function Icon({ style, size = iconSize.large, color, ...rest }: IconProps) {
  const { colors } = useThemeColor()

  const iconColor = color || colors.text

  return <Ionicons size={size} style={[{ color: iconColor }, style]} {...rest} />
}
