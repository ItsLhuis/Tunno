import { useEffect, useState } from "react"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { formatTime } from "@repo/utils"

import { Slider, Typography } from "@components/ui"

const PlaybackProgress = () => {
  const playbackState = usePlayerStore((state) => state.playbackState)
  const position = usePlayerStore((state) => state.position)
  const duration = usePlayerStore((state) => state.duration)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const play = usePlayerStore((state) => state.play)
  const pause = usePlayerStore((state) => state.pause)
  const seekTo = usePlayerStore((state) => state.seekTo)
  const seekBy = usePlayerStore((state) => state.seekBy)

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
    <div className="flex w-full flex-col gap-2 p-3">
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
      <div className="flex items-center justify-between">
        <Typography affects={["small"]}>{formatTime(displayPosition)}</Typography>
        <Typography affects={["small"]}>{formatTime(duration)}</Typography>
      </div>
    </div>
  )
}

export { PlaybackProgress }
