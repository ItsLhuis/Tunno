import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { IconButton } from "@components/ui"

import { State } from "react-track-player-web"

const PlaybackControls = () => {
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
