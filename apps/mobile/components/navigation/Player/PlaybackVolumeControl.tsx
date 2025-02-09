import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize, spacing } from "@constants/styles"

import { View, Platform } from "react-native"

import Slider from "@react-native-community/slider"

import { Icon } from "../../ui/Icon"

export function PlaybackVolumeControl() {
  const { colors } = useColorTheme()

  return (
    <View style={{ width: "100%", gap: spacing.xxSmall }}>
      <Slider
        value={1}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.placeholder}
        style={{ marginHorizontal: Platform.select({ ios: 0, android: -12 }) }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon name="Volume" size={iconSize.medium} color={colors.placeholder} />
        <Icon name="Volume2" size={iconSize.medium} color={colors.placeholder} />
      </View>
    </View>
  )
}
