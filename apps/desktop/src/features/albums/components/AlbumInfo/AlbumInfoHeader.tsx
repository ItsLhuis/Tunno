import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useToggleAlbumFavorite } from "../../hooks/useToggleAlbumFavorite"

import { formatDuration } from "@repo/utils"

import { AlbumActions } from "../AlbumActions"

import { Badge, Header, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

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
          <div className="flex items-end gap-1">
            {album.artists.length > 0 ? (
              <SafeLink to="/artists/$id" params={{ id: album.artists[0].artistId.toString() }}>
                <Typography affects={["small"]}>{album.artists[0].artist.name}</Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]}>{t("common.unknownArtist")}</Typography>
            )}
            {album.releaseYear && (
              <div className="leading-none">
                <Typography affects={["small", "muted"]}>• {album.releaseYear}</Typography>
              </div>
            )}
            {album.totalDuration > 0 && (
              <div className="leading-none">
                <Typography affects={["small", "muted"]}>
                  • {formatDuration(album.totalDuration, t)}
                </Typography>
              </div>
            )}
          </div>
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
