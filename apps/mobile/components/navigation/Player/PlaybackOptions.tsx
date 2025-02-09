import { useColorTheme } from "@hooks/useColorTheme"

import { spacing } from "@constants/styles"

import { View } from "react-native"

import { IconButton } from "../../ui/IconButton"

export function PlaybackOptions() {
  const { colors } = useColorTheme()

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: spacing.large
      }}
    >
      <IconButton name="Heart" color={colors.primary} isFilled />
      <IconButton name="Shuffle" />
      <IconButton name="MonitorSpeaker" color={colors.primary} />
      <IconButton name="Repeat" />
      <IconButton name="ListMusic" />
    </View>
  )
}
