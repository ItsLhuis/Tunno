import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { IconButton } from "@components/ui"

import { readableColor } from "polished"

import { State } from "react-track-player-web"

import { type Palette } from "@repo/utils"

type PlaybackControlsProps = {
  palette: Palette | null
}

const PlaybackControls = ({ palette }: PlaybackControlsProps) => {
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

  const buttonBgColor = palette?.primary
  const buttonTextColor =
    palette?.primaryForeground || (buttonBgColor ? readableColor(buttonBgColor) : undefined)

  return (
    <div className="flex shrink-0 items-center gap-1">
      <IconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        className="h-10 w-10 rounded-full [&_svg]:size-5"
        style={{
          backgroundColor: buttonBgColor || undefined,
          color: buttonTextColor || undefined
        }}
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <IconButton
        name="SkipForward"
        variant="ghost"
        onClick={handleNext}
        disabled={!canPlayNext}
        className="h-9 w-9 hover:bg-[var(--accent-bg)]"
        style={
          {
            color: palette?.foreground || undefined,
            "--accent-bg": palette?.accent
          } as React.CSSProperties & { "--accent-bg"?: string }
        }
      />
    </div>
  )
}

export { PlaybackControls }
