import { spacing } from "@constants/styles"

import { View } from "react-native"

import { IconButton } from "../../ui/IconButton"

export function PlaybackControls() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.small
      }}
    >
      <IconButton name="SkipBack" isFilled />
      <IconButton name="Play" isFilled />
      <IconButton name="SkipForward" isFilled />
    </View>
  )
}
