import { useColorTheme } from "@hooks/useColorTheme"

import { spacing } from "@constants/styles"

import { Platform, View } from "react-native"

import Slider from "@react-native-community/slider"

import { Text } from "../../ui/Text"

export function PlaybackProgress() {
  const { colors } = useColorTheme()

  return (
    <View style={{ width: "100%", gap: spacing.xxSmall }}>
      <Slider
        value={0.2}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.placeholder}
        style={{ marginHorizontal: Platform.select({ ios: 0, android: -12 }) }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text size="small" style={{ color: colors.placeholder }}>
          0:43
        </Text>
        <Text size="small" style={{ color: colors.placeholder }}>
          3:12
        </Text>
      </View>
    </View>
  )
}
