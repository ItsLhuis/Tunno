import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize } from "@constants/styles"

import {
  ActivityIndicator as RNActivityIndicator,
  type ActivityIndicatorProps as RNActivityIndicatorProps
} from "react-native"

export type ActivityIndicatorProps = RNActivityIndicatorProps

export function ActivityIndicator({ style, size, ...props }: ActivityIndicatorProps) {
  const { colors } = useColorTheme()

  return (
    <RNActivityIndicator
      size={size || iconSize.medium + iconSize.xxSmall}
      color={colors.text}
      style={style}
      {...props}
    />
  )
}
ActivityIndicator.displayName = "ActivityIndicator"
