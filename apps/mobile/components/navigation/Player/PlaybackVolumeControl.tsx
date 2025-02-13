import { useColorTheme } from "@hooks/useColorTheme"

import { iconSize, spacing } from "@constants/styles"

import { View } from "react-native"

import { Slider } from "../../ui/Slider"
import { Icon } from "../../ui/Icon"

export function PlaybackVolumeControl() {
  const { colors } = useColorTheme()

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.small
      }}
    >
      <Icon name="Volume" size={iconSize.medium} color={colors.placeholder} />
      <Slider containerStyle={{ flex: 1 }} />
      <Icon name="Volume2" size={iconSize.medium} color={colors.placeholder} />
    </View>
  )
}
