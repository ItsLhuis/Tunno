import { useColorScheme } from "@hooks/useColorScheme"

import { colors } from "@constants/colors"

export function useThemeColor() {
  const theme = useColorScheme() || "light"
  return colors[theme]
}
