import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize } from "@constants/styles"

import {
  ActivityIndicator as RNActivityIndicator,
  type ActivityIndicatorProps as RNActivityIndicatorProps
} from "react-native"

export type ActivityIndicatorProps = RNActivityIndicatorProps

export function ActivityIndicator({ style, size = iconSize.xLarge, color, ...props }: ActivityIndicatorProps) {
  const { colors } = useColorTheme()

  return (
    <RNActivityIndicator
      size={size}
      color={color || colors.text}
      style={style}
      {...props}
    />
  )
}
ActivityIndicator.displayName = "ActivityIndicator"
