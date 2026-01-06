import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useRouter } from "expo-router"

import { AnimatedIconButton } from "@components/ui"
import { QueueSheet } from "./QueueSheet"

const PlaybackOptions = () => {
  const styles = useStyles(playbackOptionsStyles)

  const router = useRouter()

  const { playerSheetRef, currentTrack } = usePlayerStore(
    useShallow((state) => ({
      playerSheetRef: state.playerSheetRef,
      currentTrack: state.currentTrack
    }))
  )

  const handleLyricsPress = () => {
    playerSheetRef?.dismiss()
    router.push("/lyrics")
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
      <QueueSheet />
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
