import {
  RefreshControl as RNRefreshControl,
  type RefreshControlProps as RNRefreshControlProps
} from "react-native"

import { type ColorKey, resolveColor, useTheme } from "@styles"

export type RefreshControlProps = Omit<
  RNRefreshControlProps,
  "tintColor" | "colors" | "progressBackgroundColor" | "titleColor"
> & {
  color?: ColorKey
  backgroundColor?: ColorKey
  titleColor?: ColorKey
}

const RefreshControl = ({
  color = "primary",
  backgroundColor = "gray-100",
  titleColor = "foreground",
  ...props
}: RefreshControlProps) => {
  const { theme } = useTheme()

  const refreshColor = resolveColor(theme, color) ?? theme.colors.primary
  const bgColor = resolveColor(theme, backgroundColor) ?? theme.colors.accent
  const txtColor = resolveColor(theme, titleColor) ?? theme.colors.foreground

  return (
    <RNRefreshControl
      tintColor={refreshColor}
      colors={[refreshColor]}
      progressBackgroundColor={bgColor}
      titleColor={txtColor}
      {...props}
    />
  )
}

export { RefreshControl }
