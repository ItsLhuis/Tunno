import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { AnimatedIconButton } from "@components/ui"

import { State } from "react-native-track-player"

const PlaybackControls = () => {
  const styles = useStyles(playbackControlsStyles)

  const {
    play,
    pause,
    playNext,
    playbackState,
    isTrackLoading,
    currentTrack,
    canPlayNext,
    isTransitioning
  } = usePlayerStore(
    useShallow((state) => ({
      play: state.play,
      pause: state.pause,
      playNext: state.playNext,
      playbackState: state.playbackState,
      isTrackLoading: state.isTrackLoading,
      currentTrack: state.currentTrack,
      canPlayNext: state.canPlayNext,
      isTransitioning: state.isTransitioning
    }))
  )

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
