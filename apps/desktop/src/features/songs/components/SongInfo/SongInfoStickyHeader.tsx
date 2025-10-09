import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { IconButton, StickyHeader, Typography } from "@components/ui"

import { State } from "react-track-player-web"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoStickyHeaderProps = {
  song: SongWithAllRelations
}

const SongInfoStickyHeader = ({ song }: SongInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const { play, pause, playbackState, isTrackLoading, currentTrackId, loadTracks } = usePlayerStore(
    useShallow((state) => ({
      play: state.play,
      pause: state.pause,
      playbackState: state.playbackState,
      isTrackLoading: state.isTrackLoading,
      currentTrackId: state.currentTrackId,
      loadTracks: state.loadTracks
    }))
  )

  const isCurrentSong = currentTrackId === song.id
  const isCurrentlyPlaying = playbackState === State.Playing && isCurrentSong

  const canPlay = currentTrackId !== null && !isTrackLoading

  const handlePlayPause = async () => {
    if (!canPlay) return

    if (isCurrentSong) {
      if (isCurrentlyPlaying) {
        await pause()
      } else {
        await play()
      }
    } else {
      await loadTracks([song.id], 0, "songs")
      await play()
    }
  }

  return (
    <StickyHeader className="flex items-center gap-3 pb-9">
      <IconButton
        name={isCurrentlyPlaying ? "Pause" : "Play"}
        isLoading={isTrackLoading}
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
        onClick={handlePlayPause}
        disabled={!canPlay}
      />
      <Typography variant="h4" className="truncate">
        {song.name}
      </Typography>
    </StickyHeader>
  )
}

export { SongInfoStickyHeader }
