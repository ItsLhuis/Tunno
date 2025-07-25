import { View } from "react-native"

import { IconButton } from "@components/ui"

export function PlaybackOptions() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <IconButton name="Heart" color="primary" isFilled />
      <IconButton name="Shuffle" />
      <IconButton name="Repeat" />
      <IconButton name="ListMusic" />
    </View>
  )
}
