import { useEffect, useState } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

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

  const [localPosition, setLocalPosition] = useState<number | null>(null)

  const canSeek = currentTrack !== null && !isTrackLoading && duration > 0
  const displayPosition = localPosition !== null ? localPosition : position
  const value = duration > 0 ? [Math.min(displayPosition, duration)] : [0]

  useEffect(() => {
    if (!isDragging && localPosition !== null) {
      const diff = Math.abs(position - localPosition)
      if (diff < 1) {
        setLocalPosition(null)
      }
    }
  }, [position, isDragging, localPosition])

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
      <Typography affects={["small"]}>{formatTime(displayPosition)}</Typography>
      <Slider
        min={0}
        max={Math.max(duration, 0.1)}
        step={1}
        value={value}
        onValueChange={(vals) => {
          if (!canSeek) return
          const target = vals[0]

          if (!isDragging) {
            setIsDragging(true)
            setWasPlaying(playbackState === "playing")
            void pause()
          }

          setLocalPosition(target)
        }}
        onValueCommit={(vals) => {
          if (!canSeek) return

          const target = vals[0]
          void seekTo(target)

          if (wasPlaying) {
            void play()
          }
          setWasPlaying(false)
          setIsDragging(false)
        }}
        onKeyDown={(event) => {
          if (!canSeek) return
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            void handleKeyboardSeek(-5)
          }
          if (event.key === "ArrowRight") {
            event.preventDefault()
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
