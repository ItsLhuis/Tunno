import { useState } from "react"

import { useShallow } from "zustand/shallow"
import { usePlayerStore } from "../../stores/usePlayerStore"

import { Slider, Typography } from "@components/ui"

import { formatTime } from "@repo/utils"

const PlaybackProgress = () => {
  const {
    play,
    pause,
    playbackState,
    position,
    duration,
    seekTo,
    seekBy,
    isLoading,
    currentTrack
  } = usePlayerStore(
    useShallow((state) => ({
      play: state.play,
      pause: state.pause,
      playbackState: state.playbackState,
      position: state.position,
      duration: state.duration,
      seekTo: state.seekTo,
      seekBy: state.seekBy,
      isLoading: state.isLoading,
      currentTrack: state.currentTrack
    }))
  )

  const [wasPlaying, setWasPlaying] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const canSeek = currentTrack !== null && !isLoading && duration > 0
  const value = duration > 0 ? [Math.min(position, duration)] : [0]

  const handleKeyboardSeek = async (seekAmount: number) => {
    if (!canSeek) return

    const currentlyPlaying = playbackState === "playing"
    if (currentlyPlaying && !isDragging) {
      setWasPlaying(true)
      await pause()
    }

    await seekBy(seekAmount)

    if (currentlyPlaying && !isDragging) {
      await play()
      setWasPlaying(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-center gap-3 p-3 pb-0">
      <Typography affects={["small"]}>{formatTime(position)}</Typography>
      <Slider
        min={0}
        max={Math.max(duration, 0.1)}
        step={1}
        value={value}
        onValueChange={(vals) => {
          if (!canSeek) return
          if (!isDragging) {
            setIsDragging(true)
            setWasPlaying(playbackState === "playing")
          }
          void pause()
          const target = vals[0]
          void seekTo(target)
        }}
        onValueCommit={() => {
          if (wasPlaying) {
            void play()
          }
          setWasPlaying(false)
          setIsDragging(false)
        }}
        onKeyDown={(e) => {
          if (!canSeek) return
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            void handleKeyboardSeek(-5)
          }
          if (e.key === "ArrowRight") {
            e.preventDefault()
            void handleKeyboardSeek(5)
          }
        }}
        formatTooltip={(v) => formatTime(v)}
      />
      <Typography affects={["small"]}>{formatTime(duration)}</Typography>
    </div>
  )
}

export { PlaybackProgress }
