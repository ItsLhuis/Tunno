import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useToggleAlbumFavorite } from "../../hooks/useToggleAlbumFavorite"

import { AlbumActions } from "../AlbumActions"

import { Badge, IconButton, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumInfoStickyHeaderProps = {
  album: AlbumWithAllRelations
}

const AlbumInfoStickyHeader = ({ album }: AlbumInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !album.songs || album.songs.length === 0) return
    const songIds = album.songs.map((song) => song.id)
    shuffleAndPlay(songIds, "album", album.id)
  }

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: album.id })
  }

  return (
    <div className="flex w-full items-center gap-4 border-b bg-background/95 px-9 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            {album.thumbnail ? (
              <img
                src={album.thumbnail}
                alt={album.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <span className="text-lg font-bold">{album.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="muted" className="text-xs">
              {t(`albums.filters.${album.albumType}`)}
            </Badge>
            <Typography variant="h3" className="truncate">
              {album.name}
            </Typography>
          </div>
          <Typography affects={["small", "muted"]} className="truncate">
            {t("common.song")} ({album.totalTracks}) • {formatDuration(album.totalDuration, t)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          name="Shuffle"
          className="h-10 w-10 shrink-0 rounded-full [&_svg]:size-5"
          isLoading={isShuffling}
          disabled={!album.songs || album.songs.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <IconButton
          name="Heart"
          isFilled={album.isFavorite}
          tooltip={album.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <AlbumActions albumId={album.id} />
      </div>
    </div>
  )
}

export { AlbumInfoStickyHeader }
