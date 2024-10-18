import { useThemeColor } from "@hooks/useThemeColor"

import { iconSize } from "@constants/styles"

import {
  ActivityIndicator as RNActivityIndicator,
  type ActivityIndicatorProps as RNActivityIndicatorProps
} from "react-native"

export type ActivityIndicatorProps = RNActivityIndicatorProps

export function ActivityIndicator({ style, size, ...rest }: ActivityIndicatorProps) {
  const colors = useThemeColor()

  return (
    <RNActivityIndicator
      size={size || iconSize.medium + iconSize.xxSmall}
      color={colors.text}
      style={style}
      {...rest}
    />
  )
}
