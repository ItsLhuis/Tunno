import { spacing, iconSize } from "@constants/styles"

import { View } from "react-native"

import { IconButton } from "../../ui/IconButton"

export function PlaybackControls() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: spacing.large
      }}
    >
      <IconButton name="SkipBack" size={iconSize.xxLarge} isFilled />
      <IconButton name="Pause" size={iconSize.xxLarge} isFilled />
      <IconButton name="SkipForward" size={iconSize.xxLarge} isFilled />
    </View>
  )
}
