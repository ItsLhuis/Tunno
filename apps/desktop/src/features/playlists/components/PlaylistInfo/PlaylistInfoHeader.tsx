import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useTogglePlaylistFavorite } from "../../hooks/useTogglePlaylistFavorite"

import { PlaylistActions } from "../PlaylistActions"

import { Badge, Header, IconButton, Thumbnail, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoHeaderProps = {
  playlist: PlaylistWithAllRelations
}

const PlaylistInfoHeader = ({ playlist }: PlaylistInfoHeaderProps) => {
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
    <Header className="flex flex-col gap-6">
      <div className="flex flex-1 items-end gap-6">
        <div className="h-64 w-64">
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
            className={playlist.thumbnail ? "h-full w-full" : "size-24"}
            containerClassName="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.playlist")}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-2 break-all text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {playlist.name}
          </Typography>
          {playlist.totalDuration > 0 && (
            <Typography affects={["small", "muted"]}>
              {formatDuration(playlist.totalDuration, t)}
            </Typography>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name="Shuffle"
          className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
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
          className="shrink-0"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <PlaylistActions playlistId={playlist.id} />
      </div>
    </Header>
  )
}

export { PlaylistInfoHeader }
