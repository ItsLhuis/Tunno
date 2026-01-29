import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { AnimatedIconButton } from "@components/ui"

import { RepeatMode, State } from "react-native-track-player"

const PlaybackControls = () => {
  const styles = useStyles(playbackControlsStyles)

  const playbackState = usePlayerStore((state) => state.playbackState)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const canPlayNext = usePlayerStore((state) => state.canPlayNext)
  const canPlayPrevious = usePlayerStore((state) => state.canPlayPrevious)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)
  const isShuffleEnabled = usePlayerStore((state) => state.isShuffleEnabled)
  const repeatMode = usePlayerStore((state) => state.repeatMode)
  const play = usePlayerStore((state) => state.play)
  const pause = usePlayerStore((state) => state.pause)
  const playNext = usePlayerStore((state) => state.playNext)
  const playPrevious = usePlayerStore((state) => state.playPrevious)
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle)
  const setRepeatMode = usePlayerStore((state) => state.setRepeatMode)

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

  const handlePrevious = async () => {
    if (!canPlayPrevious || isTransitioning) return
    await playPrevious()
  }

  const handleShuffle = async () => {
    await toggleShuffle()
  }

  const handleRepeat = async () => {
    const nextMode =
      repeatMode === RepeatMode.Off
        ? RepeatMode.Queue
        : repeatMode === RepeatMode.Queue
          ? RepeatMode.Track
          : RepeatMode.Off

    await setRepeatMode(nextMode)
  }

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case RepeatMode.Track:
        return "Repeat1"
      default:
        return "Repeat"
    }
  }

  return (
    <View style={styles.container}>
      <AnimatedIconButton
        name="Shuffle"
        variant="text"
        animatedIconColor={isShuffleEnabled ? "primary" : "foreground"}
        iconSize="2xl"
        onPress={handleShuffle}
      />
      <AnimatedIconButton
        name="SkipBack"
        variant="ghost"
        animatedIconColor="foreground"
        iconSize="2xl"
        onPress={handlePrevious}
        disabled={!canPlayPrevious}
      />
      <AnimatedIconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        style={styles.playButton}
        animatedIconColor="primaryForeground"
        iconSize="4xl"
        onPress={handlePlayPause}
        disabled={!canPlay}
      />
      <AnimatedIconButton
        name="SkipForward"
        variant="ghost"
        animatedIconColor="foreground"
        iconSize="2xl"
        onPress={handleNext}
        disabled={!canPlayNext}
      />
      <AnimatedIconButton
        name={getRepeatIcon()}
        variant="text"
        animatedIconColor={repeatMode !== RepeatMode.Off ? "primary" : "foreground"}
        iconSize="2xl"
        onPress={handleRepeat}
      />
    </View>
  )
}

const playbackControlsStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.space("lg")
  },
  playButton: {
    width: theme.size(20),
    height: theme.size(20),
    borderRadius: theme.radius("full")
  }
}))

export { PlaybackControls }
