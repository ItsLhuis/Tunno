import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useRouter } from "expo-router"

import { AnimatedIconButton } from "@components/ui"

const PlaybackOptions = () => {
  const styles = useStyles(playbackOptionsStyles)

  const router = useRouter()

  const playerSheetRef = usePlayerStore((state) => state.playerSheetRef)
  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const handleLyricsPress = () => {
    playerSheetRef?.dismiss()
    router.push("/lyrics")
  }

  const handleQueuePress = () => {
    playerSheetRef?.dismiss()
    router.push("/queue")
  }

  return (
    <View style={styles.container}>
      <AnimatedIconButton
        name="MicVocal"
        variant="text"
        animatedIconColor="foreground"
        iconSize="2xl"
        onPress={handleLyricsPress}
        disabled={!currentTrack}
      />
      <AnimatedIconButton
        name="ListMusic"
        variant="text"
        animatedIconColor="foreground"
        iconSize="2xl"
        onPress={handleQueuePress}
      />
    </View>
  )
}

const playbackOptionsStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.space("lg")
  }
}))

export { PlaybackOptions }
