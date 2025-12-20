import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleSongFavorite } from "../../hooks/useToggleSongFavorite"

import { formatTime } from "@repo/utils"

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

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: song.id })
  }

  return (
    <Header className="flex flex-col gap-6">
      <DominantColorGradient thumbnail={song.thumbnail} />
      <div className="flex flex-1 items-end gap-6">
        <div className="aspect-square w-100 shrink-0">
          <Thumbnail
            placeholderIcon="Music"
            fileName={song.thumbnail}
            alt={song.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 truncate">
          <Badge variant="muted" className="w-fit">
            {t("common.song")}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-1 truncate text-4xl text-pretty md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {song.name}
          </Typography>
          <div className="flex items-end gap-1">
            {song.artists.length > 0 ? (
              <SafeLink to="/artists/$id" params={{ id: song.artists[0].artistId.toString() }}>
                <Typography affects={["small"]}>{song.artists[0].artist.name}</Typography>{" "}
                <Typography affects={["small", "muted"]}>•</Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]}>{t("common.unknownArtist")} •</Typography>
            )}
            {song.album ? (
              <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                <Typography affects={["small", "muted"]}>{song.album.name}</Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]}>{t("common.unknownAlbum")}</Typography>
            )}
            {song.releaseYear && (
              <div className="leading-none">
                <Typography affects={["small", "muted"]}>• {song.releaseYear}</Typography>
              </div>
            )}
            <div className="leading-none">
              <Typography affects={["small", "muted"]}>• {formatTime(song.duration)}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name={isCurrentlyPlaying ? "Pause" : "Play"}
          isLoading={isTrackLoading}
          className="size-14 shrink-0 rounded-full [&_svg]:size-7"
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
        <SongActions songId={song.id} />
      </div>
    </Header>
  )
}

export { SongInfoHeader }
