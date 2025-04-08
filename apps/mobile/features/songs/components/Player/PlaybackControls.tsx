import { theme } from "@styles/theme"

import { View } from "react-native"

import { IconButton } from "@components/ui"

export function PlaybackControls() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: theme.styles.spacing.large
      }}
    >
      <IconButton name="SkipBack" size={theme.styles.icon.size.xxLarge} isFilled />
      <IconButton name="Pause" size={theme.styles.icon.size.xxLarge} isFilled />
      <IconButton name="SkipForward" size={theme.styles.icon.size.xxLarge} isFilled />
    </View>
  )
}
