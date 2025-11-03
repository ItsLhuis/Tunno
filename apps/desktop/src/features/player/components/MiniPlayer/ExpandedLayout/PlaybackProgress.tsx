import { useState } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { formatTime } from "@repo/utils"

import { Slider, Typography } from "@components/ui"

const PlaybackProgress = () => {
  const {
    play,
    pause,
    playbackState,
    position,
    duration,
    seekTo,
    seekBy,
    isTrackLoading,
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
      isTrackLoading: state.isTrackLoading,
      currentTrack: state.currentTrack
    }))
  )

  const [wasPlaying, setWasPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const canSeek = currentTrack !== null && !isTrackLoading && duration > 0
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
    <div className="flex w-full flex-col gap-2 p-3">
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
      <div className="flex items-center justify-between">
        <Typography affects={["small"]}>{formatTime(position)}</Typography>
        <Typography affects={["small"]}>{formatTime(duration)}</Typography>
      </div>
    </div>
  )
}

export { PlaybackProgress }
