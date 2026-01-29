import { usePlayerStore } from "../../../stores/usePlayerStore"

import { IconButton } from "@components/ui"

import { State } from "@track-player/web"

const PlaybackControls = () => {
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
    <div className="flex shrink-0 items-center gap-2">
      <IconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        className="size-10 rounded-full [&_svg]:size-5"
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <IconButton
        name="SkipForward"
        variant="ghost"
        onClick={handleNext}
        disabled={!canPlayNext}
        className="text-foreground size-9"
      />
    </div>
  )
}

export { PlaybackControls }
