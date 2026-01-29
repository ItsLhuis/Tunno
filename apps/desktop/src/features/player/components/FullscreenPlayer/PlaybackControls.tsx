import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import { IconButton } from "@components/ui"

import { RepeatMode, State } from "@track-player/web"

const PlaybackControls = () => {
  const { t } = useTranslation()

  const playbackState = usePlayerStore((state) => state.playbackState)
  const isShuffleEnabled = usePlayerStore((state) => state.isShuffleEnabled)
  const repeatMode = usePlayerStore((state) => state.repeatMode)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const canPlayNext = usePlayerStore((state) => state.canPlayNext)
  const canPlayPrevious = usePlayerStore((state) => state.canPlayPrevious)
  const isTransitioning = usePlayerStore((state) => state.isTransitioning)
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

  const getShuffleTooltip = () =>
    isShuffleEnabled ? t("common.disableShuffle") : t("common.enableShuffle")

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
      case RepeatMode.Off:
        return "Repeat"
      case RepeatMode.Queue:
        return "Repeat"
      case RepeatMode.Track:
        return "Repeat1"
      default:
        return "Repeat"
    }
  }

  const getRepeatTooltip = () => {
    switch (repeatMode) {
      case RepeatMode.Off:
        return t("common.enableRepeat")
      case RepeatMode.Queue:
        return t("common.enableRepeatOne")
      case RepeatMode.Track:
        return t("common.disableRepeat")
      default:
        return t("common.enableRepeat")
    }
  }

  return (
    <div className="flex flex-row items-center justify-center gap-[1.5vh]">
      <IconButton
        name="Shuffle"
        tooltip={getShuffleTooltip()}
        variant="ghost"
        onClick={handleShuffle}
        className={cn("size-[4vh] [&_svg]:size-[2vh]", isShuffleEnabled && "text-primary")}
      />
      <IconButton
        name="SkipBack"
        tooltip={t("common.previous")}
        variant="ghost"
        onClick={handlePrevious}
        disabled={!canPlayPrevious}
        className="size-[4vh] [&_svg]:size-[2vh]"
      />
      <IconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        className="size-[6vh] rounded-full [&_svg]:size-[2.5vh]"
        tooltip={isPlaying ? t("common.pause") : t("common.play")}
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <IconButton
        name="SkipForward"
        tooltip={t("common.next")}
        variant="ghost"
        onClick={handleNext}
        disabled={!canPlayNext}
        className="size-[4vh] [&_svg]:size-[2vh]"
      />
      <IconButton
        name={getRepeatIcon()}
        tooltip={getRepeatTooltip()}
        variant="ghost"
        onClick={handleRepeat}
        className={cn(
          "size-[4vh] [&_svg]:size-[2vh]",
          repeatMode !== RepeatMode.Off && "text-primary"
        )}
      />
    </div>
  )
}

export { PlaybackControls }
