import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import {
  ActivityIndicator as RNActivityIndicator,
  type ActivityIndicatorProps as RNActivityIndicatorProps
} from "react-native"

export type ActivityIndicatorProps = RNActivityIndicatorProps

const ActivityIndicator = ({
  style,
  size = theme.styles.icon.size.xLarge,
  color,
  ...props
}: ActivityIndicatorProps) => {
  const { colors } = useColorTheme()

  return (
    <RNActivityIndicator size={size} color={color || colors.primary} style={style} {...props} />
  )
}

export { ActivityIndicator }
