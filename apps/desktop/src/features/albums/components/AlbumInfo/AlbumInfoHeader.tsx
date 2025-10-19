import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useToggleAlbumFavorite } from "../../hooks/useToggleAlbumFavorite"

import { AlbumActions } from "../AlbumActions"

import { Badge, Header, IconButton, Thumbnail, Typography } from "@components/ui"

import { formatDuration } from "@repo/utils"

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumInfoHeaderProps = {
  album: AlbumWithAllRelations
}

const AlbumInfoHeader = ({ album }: AlbumInfoHeaderProps) => {
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
    <Header className="flex flex-col gap-6">
      <div className="flex flex-1 items-end gap-6">
        <div className="h-64 w-64">
          <Thumbnail
            placeholderIcon="Disc"
            fileName={album.thumbnail}
            alt={album.name}
            className={album.thumbnail ? "h-full w-full" : "size-24"}
            containerClassName="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t(`albums.filters.${album.albumType}`)}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-2 break-all text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {album.name}
          </Typography>
          <Typography affects={["small", "muted"]}>
            {formatDuration(album.totalDuration, t)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name="Shuffle"
          className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
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
          className="shrink-0"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <AlbumActions albumId={album.id} />
      </div>
    </Header>
  )
}

export { AlbumInfoHeader }
