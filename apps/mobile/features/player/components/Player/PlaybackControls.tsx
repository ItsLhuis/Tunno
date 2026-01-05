import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { AnimatedIconButton } from "@components/ui"

import { RepeatMode, State } from "react-native-track-player"

const PlaybackControls = () => {
  const styles = useStyles(playbackControlsStyles)

  const {
    play,
    pause,
    playNext,
    playPrevious,
    playbackState,
    toggleShuffle,
    isShuffleEnabled,
    repeatMode,
    setRepeatMode,
    isTrackLoading,
    currentTrack,
    canPlayNext,
    canPlayPrevious,
    isTransitioning
  } = usePlayerStore(
    useShallow((state) => ({
      play: state.play,
      pause: state.pause,
      playNext: state.playNext,
      playPrevious: state.playPrevious,
      playbackState: state.playbackState,
      toggleShuffle: state.toggleShuffle,
      isShuffleEnabled: state.isShuffleEnabled,
      repeatMode: state.repeatMode,
      setRepeatMode: state.setRepeatMode,
      isTrackLoading: state.isTrackLoading,
      currentTrack: state.currentTrack,
      canPlayNext: state.canPlayNext,
      canPlayPrevious: state.canPlayPrevious,
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
