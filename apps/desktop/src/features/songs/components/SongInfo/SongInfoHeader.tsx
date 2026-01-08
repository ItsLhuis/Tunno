import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { calculateStreak, formatTime } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  Header,
  IconButton,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import { SongActions } from "../SongActions"
import { SongStatsSheet } from "./SongStatsSheet"

import StreakLottie from "@assets/lotties/Streak.json"
import Lottie from "lottie-react"

import { State } from "@track-player/web"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoHeaderProps = {
  song: SongWithAllRelations
}

const SongInfoHeader = ({ song }: SongInfoHeaderProps) => {
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

  const canPlay = !isTrackLoading

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

  const toggleFavoriteMutation = useToggleSongFavorite()

  const playHistory = song.playHistory ?? []
  const streak = calculateStreak(playHistory)

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: song.id })
  }

  return (
    <Header className="flex flex-col gap-6">
      <DominantColorGradient thumbnail={song.thumbnail} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="aspect-square w-full shrink-0 md:w-100">
          <Thumbnail
            placeholderIcon="Music"
            fileName={song.thumbnail}
            alt={song.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.song")}
          </Badge>
          <Typography
            variant="h1"
            className="truncate text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            {song.name}
          </Typography>
          <div className="flex flex-col gap-1">
            {song.artists.length > 0 ? (
              <SafeLink to="/artists/$id" params={{ id: song.artists[0].artistId.toString() }}>
                <Typography affects={["small"]} className="truncate">
                  {song.artists[0].artist.name}
                </Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]} className="truncate">
                {t("common.unknownArtist")}
              </Typography>
            )}
            {song.album ? (
              <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                <Typography affects={["small", "muted"]} className="truncate">
                  {song.album.name}
                </Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]} className="truncate">
                {t("common.unknownAlbum")}
              </Typography>
            )}
            <Typography affects={["small", "muted"]} className="truncate">
              {song.releaseYear && `${song.releaseYear} • `}
              {formatTime(song.duration)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          name={isCurrentlyPlaying ? "Pause" : "Play"}
          isLoading={isTrackLoading}
          className="size-14 shrink-0 rounded-full [&_svg]:size-6"
          tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
          onClick={handlePlayPause}
          disabled={!canPlay}
        />
        <IconButton
          name="Heart"
          isFilled={song.isFavorite}
          tooltip={song.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <SongStatsSheet song={song} />
        <SongActions songId={song.id} />
        {streak >= 2 && <Lottie animationData={StreakLottie} className="size-8" />}
      </div>
    </Header>
  )
}

export { SongInfoHeader }
