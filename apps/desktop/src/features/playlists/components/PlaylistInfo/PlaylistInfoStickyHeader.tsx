import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useTogglePlaylistFavorite } from "../../hooks/useTogglePlaylistFavorite"

import { PlaylistActions } from "../PlaylistActions"

import { Badge, IconButton, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoStickyHeaderProps = {
  playlist: PlaylistWithAllRelations
}

const PlaylistInfoStickyHeader = ({ playlist }: PlaylistInfoStickyHeaderProps) => {
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

  return (
    <div className="flex w-full items-center gap-4 border-b bg-background/95 px-9 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            {playlist.thumbnail ? (
              <img
                src={playlist.thumbnail}
                alt={playlist.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <span className="text-lg font-bold">{playlist.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="muted" className="text-xs">
              {t("common.playlist")}
            </Badge>
            <Typography variant="h3" className="truncate">
              {playlist.name}
            </Typography>
          </div>
          <Typography affects={["small", "muted"]} className="truncate">
            {t("common.song")} ({playlist.totalTracks}) •{" "}
            {formatDuration(playlist.totalDuration, t)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          name="Shuffle"
          className="h-10 w-10 shrink-0 rounded-full [&_svg]:size-5"
          isLoading={isShuffling}
          disabled={!playlist.songs || playlist.songs.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <IconButton
          name="Heart"
          isFilled={playlist.isFavorite}
          tooltip={playlist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <PlaylistActions playlistId={playlist.id} />
      </div>
    </div>
  )
}

export { PlaylistInfoStickyHeader }
