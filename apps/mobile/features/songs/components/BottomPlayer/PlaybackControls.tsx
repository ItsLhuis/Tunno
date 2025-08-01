import { theme } from "@styles/theme"

import { View } from "react-native"

import { IconButton } from "@components/ui"

const PlaybackControls = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.styles.spacing.small
      }}
    >
      <IconButton name="SkipBack" isFilled />
      <IconButton name="Play" isFilled />
      <IconButton name="SkipForward" isFilled />
    </View>
  )
}

export { PlaybackControls }
