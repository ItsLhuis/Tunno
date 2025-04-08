import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { Icon, Slider } from "@components/ui"

export function PlaybackVolumeControl() {
  const { colors } = useColorTheme()

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.styles.spacing.small
      }}
    >
      <Icon name="Volume" size={theme.styles.icon.size.medium} color={colors.mutedForeground} />
      <Slider containerStyle={{ flex: 1 }} />
      <Icon name="Volume2" size={theme.styles.icon.size.medium} color={colors.mutedForeground} />
    </View>
  )
}
