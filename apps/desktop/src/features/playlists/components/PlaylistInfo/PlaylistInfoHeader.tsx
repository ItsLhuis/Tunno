import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useTogglePlaylistFavorite } from "../../hooks/useTogglePlaylistFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  Header,
  IconButton,
  Thumbnail,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"
import { PlaylistStatsSheet } from "./PlaylistStatsSheet"

import { type PlaylistWithAllRelations, type SongWithMainRelations } from "@repo/api"

type PlaylistInfoHeaderProps = {
  playlist: PlaylistWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
}

const PlaylistInfoHeader = ({ playlist, list }: PlaylistInfoHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !playlist.songs || playlist.songs.length === 0) return
    const songIds = playlist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "playlist", playlist.id)
  }

  const toggleFavoriteMutation = useTogglePlaylistFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(playlist.id)
  }

  const hasSelectedRows = list?.hasSelection ?? false

  return (
    <Header className="flex flex-col gap-6">
      <DominantColorGradient thumbnail={playlist.thumbnail} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="aspect-square w-full shrink-0 md:w-100">
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.playlist")}
          </Badge>
          <Typography
            variant="h1"
            className="truncate text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            {playlist.name}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.songsPlayed", { count: playlist.songs?.length ?? 0 })}
            </Typography>
            {playlist.totalDuration > 0 && (
              <Typography affects={["muted", "small"]} className="truncate">
                {formatDuration(playlist.totalDuration, t)}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 shrink-0 rounded-full [&_svg]:size-7"
          isLoading={isShuffling}
          disabled={hasSelectedRows || !playlist.songs || playlist.songs.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <IconButton
          name="Heart"
          isFilled={playlist.isFavorite}
          tooltip={playlist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <PlaylistStatsSheet playlist={playlist} />
        <PlaylistActions playlistId={playlist.id} />
      </div>
    </Header>
  )
}

export { PlaylistInfoHeader }
