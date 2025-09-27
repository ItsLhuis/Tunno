import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { SongActions } from "../SongActions"

import { Header, IconButton, Thumbnail, Typography } from "@components/ui"

import { formatRelativeDate, formatTime } from "@repo/utils"

import { State } from "react-track-player-web"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoHeaderProps = {
  song: SongWithAllRelations
}

const SongInfoHeader = ({ song }: SongInfoHeaderProps) => {
  const { t, i18n } = useTranslation()

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
      await loadTracks([song.id], 0, "queue")
      await play()
    }
  }

  const toggleFavoriteMutation = useToggleSongFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: song.id })
  }

  return (
    <Header className="flex flex-col gap-3 sm:gap-6">
      <div className="flex items-end gap-6">
        <div className="h-60 w-60">
          <Thumbnail
            fileName={song.thumbnail}
            alt={song.name}
            className={song.thumbnail ? "h-full w-full" : "size-20"}
            containerClassName="h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Typography affects={["small", "muted"]}>
            {song.album ? song.album.name : t("common.unknownAlbum")}
          </Typography>
          <Typography
            variant="h1"
            affects={["bold"]}
            className="text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {song.name}
          </Typography>
          <Typography affects={["bold"]}>
            {song.artists.length > 0
              ? song.artists.map((artist) => artist.artist.name).join(", ")
              : t("common.unknownArtist")}
          </Typography>
          <div className="flex items-center gap-1">
            <Typography affects={["small", "muted"]}>
              {formatRelativeDate(song.createdAt, i18n.language, t)}
            </Typography>
            <Typography affects={["small", "muted"]}>• {formatTime(song.duration)}</Typography>
            {song.playCount > 0 && (
              <Typography affects={["small", "muted"]}>
                • {song.playCount} {song.playCount === 1 ? t("common.play") : t("common.play")}
              </Typography>
            )}
            {song.stats && song.stats.totalPlayTime > 0 && (
              <Typography affects={["small", "muted"]}>• {song.stats.totalPlayTime}</Typography>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name={isCurrentlyPlaying ? "Pause" : "Play"}
          isLoading={isTrackLoading}
          className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
          tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
          onClick={handlePlayPause}
          disabled={!canPlay}
        />
        <IconButton
          name="Heart"
          isFilled={song.isFavorite}
          tooltip={song.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <SongActions song={song} />
      </div>
    </Header>
  )
}

export { SongInfoHeader }
