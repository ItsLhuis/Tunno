import { useSafeAreaInsets } from "react-native-safe-area-context"

export function useBottomTabBarHeight() {
  const insets = useSafeAreaInsets()
  return insets.bottom + 50
}
