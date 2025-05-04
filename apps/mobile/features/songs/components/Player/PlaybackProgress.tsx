import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { Slider, Text } from "@components/ui"

export function PlaybackProgress() {
  const { colors } = useColorTheme()

  return (
    <View style={{ marginTop: -theme.styles.spacing.small }}>
      <Slider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text size="small" style={{ color: colors.mutedForeground }}>
          0:43
        </Text>
        <Text size="small" style={{ color: colors.mutedForeground }}>
          3:12
        </Text>
      </View>
    </View>
  )
}
