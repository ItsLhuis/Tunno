import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { AnimatedIconButton } from "@components/ui"

import { State } from "react-native-track-player"

const PlaybackControls = () => {
  const styles = useStyles(playbackControlsStyles)

  const playbackState = usePlayerStore((state) => state.playbackState)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const canPlayNext = usePlayerStore((state) => state.canPlayNext)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)
  const play = usePlayerStore((state) => state.play)
  const pause = usePlayerStore((state) => state.pause)
  const playNext = usePlayerStore((state) => state.playNext)

  const isPlaying = playbackState === State.Playing
  const canPlay = currentTrack !== null && !isTrackLoading

  const handlePlayPause = async () => {
    if (!canPlay) return

    if (isPlaying) {
      await pause()
    } else {
      await play()
    }
  }

  const handleNext = async () => {
    if (!canPlayNext || isTransitioning) return
    await playNext()
  }

  return (
    <View style={styles.container}>
      <AnimatedIconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        style={styles.playButton}
        animatedIconColor="primaryForeground"
        iconSize="xl"
        onPress={handlePlayPause}
        disabled={!canPlay}
      />
      <AnimatedIconButton
        name="SkipForward"
        variant="text"
        onPress={handleNext}
        disabled={!canPlayNext}
      />
    </View>
  )
}

const playbackControlsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("xs")
  },
  playButton: {
    width: theme.size(10),
    height: theme.size(10),
    borderRadius: theme.radius("full")
  }
}))

export { PlaybackControls }
