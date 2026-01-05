import { useEffect, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { formatTime } from "@repo/utils"

import { AnimatedText, Slider } from "@components/ui"

import { State } from "react-native-track-player"

const PlaybackProgress = () => {
  const styles = useStyles(playbackProgressStyles)

  const { play, pause, playbackState, position, duration, seekTo, isTrackLoading, currentTrack } =
    usePlayerStore(
      useShallow((state) => ({
        play: state.play,
        pause: state.pause,
        playbackState: state.playbackState,
        position: state.position,
        duration: state.duration,
        seekTo: state.seekTo,
        isTrackLoading: state.isTrackLoading,
        currentTrack: state.currentTrack
      }))
    )

  const [wasPlaying, setWasPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const [localPosition, setLocalPosition] = useState<number | null>(null)

  const canSeek = currentTrack !== null && !isTrackLoading && duration > 0
  const displayPosition = localPosition !== null ? localPosition : position
  const value = duration > 0 ? Math.min(displayPosition, duration) : 0

  useEffect(() => {
    if (!isDragging && localPosition !== null) {
      const diff = Math.abs(position - localPosition)
      if (diff < 1) {
        setLocalPosition(null)
      }
    }
  }, [position, isDragging, localPosition])

  const handleSlidingStart = async () => {
    if (!canSeek) return

    setIsDragging(true)
    setWasPlaying(playbackState === State.Playing)

    if (playbackState === State.Playing) {
      await pause()
    }
  }

  const handleValueChange = (values: number[]) => {
    if (!canSeek || !isDragging) return

    const target = values[0]
    setLocalPosition(target)
  }

  const handleSlidingComplete = async (values: number[]) => {
    if (!canSeek) return

    const target = values[0]
    await seekTo(target)

    if (wasPlaying) {
      await play()
    }

    setWasPlaying(false)
    setIsDragging(false)
  }

  return (
    <View style={styles.container}>
      <Slider
        value={[value]}
        minimumValue={0}
        maximumValue={Math.max(duration, 0.1)}
        onSlidingStart={handleSlidingStart}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        disabled={!canSeek}
        containerStyle={styles.slider}
      />
      <View style={styles.timeRow}>
        <AnimatedText size="sm" animatedColor="mutedForeground">
          {formatTime(displayPosition)}
        </AnimatedText>
        <AnimatedText size="sm" animatedColor="mutedForeground">
          {formatTime(duration)}
        </AnimatedText>
      </View>
    </View>
  )
}

const playbackProgressStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("lg")
  },
  slider: {
    width: "100%",
    height: "auto"
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
}))

export { PlaybackProgress }
