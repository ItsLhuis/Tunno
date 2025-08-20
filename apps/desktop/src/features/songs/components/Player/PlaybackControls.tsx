import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { IconButton } from "@components/ui"

import { RepeatMode, State } from "react-track-player-web"

const PlaybackControls = () => {
  const { t } = useTranslation()

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
    isLoading,
    isQueueLoading,
    currentTrack
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
      isLoading: state.isLoading,
      isQueueLoading: state.isQueueLoading,
      currentTrack: state.currentTrack
    }))
  )

  const isPlaying = playbackState === State.Playing
  const canPlay = currentTrack !== null && !isLoading

  const canModifyQueue = !isQueueLoading

  const handlePlayPause = async () => {
    if (!canPlay) return

    if (isPlaying) {
      await pause()
    } else {
      await play()
    }
  }

  const handleNext = async () => {
    if (!canPlay) return
    await playNext()
  }

  const handlePrevious = async () => {
    if (!canPlay) return
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
    <div className="flex flex-row items-center justify-center gap-2">
      <IconButton
        name="Shuffle"
        tooltip={getShuffleTooltip()}
        variant="ghost"
        onClick={handleShuffle}
        disabled={!canModifyQueue}
        className={isShuffleEnabled ? "text-primary" : ""}
      />
      <IconButton
        name="SkipBack"
        tooltip={t("common.previous")}
        variant="ghost"
        onClick={handlePrevious}
        disabled={!canPlay}
      />
      <IconButton
        name={isPlaying ? "Pause" : "Play"}
        isLoading={isLoading}
        className="h-11 w-11 rounded-full [&_svg]:size-5"
        tooltip={isPlaying ? t("common.pause") : t("common.play")}
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <IconButton
        name="SkipForward"
        tooltip={t("common.next")}
        variant="ghost"
        onClick={handleNext}
        disabled={!canPlay}
      />
      <IconButton
        name={getRepeatIcon()}
        tooltip={getRepeatTooltip()}
        variant="ghost"
        onClick={handleRepeat}
        disabled={!canModifyQueue}
        className={repeatMode !== RepeatMode.Off ? "text-primary" : ""}
      />
    </div>
  )
}

export { PlaybackControls }
