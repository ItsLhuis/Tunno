import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleAlbumFavorite } from "../../hooks/useToggleAlbumFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  Header,
  IconButton,
  SafeLink,
  Thumbnail,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { AlbumActions } from "../AlbumActions"
import { AlbumStatsSheet } from "./AlbumStatsSheet"

import { type AlbumWithAllRelations, type SongWithMainRelations } from "@repo/api"

type AlbumInfoHeaderProps = {
  album: AlbumWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
}

const AlbumInfoHeader = ({ album, list }: AlbumInfoHeaderProps) => {
  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !album.songs || album.songs.length === 0) return
    const songIds = album.songs.map((song) => song.id)
    shuffleAndPlay(songIds, "album", album.id)
  }

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: album.id })
  }

  const hasSelectedRows = list?.hasSelection ?? false

  return (
    <Header className="flex flex-col gap-6">
      <DominantColorGradient thumbnail={album.thumbnail} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="aspect-square w-full shrink-0 md:w-100">
          <Thumbnail
            placeholderIcon="Disc"
            fileName={album.thumbnail}
            alt={album.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t(`albums.filters.${album.albumType}`)}
          </Badge>
          <Typography
            variant="h1"
            className="truncate text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            {album.name}
          </Typography>
          <div className="flex flex-col gap-1">
            {album.artists.length > 0 ? (
              <SafeLink to="/artists/$id" params={{ id: album.artists[0].artistId.toString() }}>
                <Typography affects={["small"]} className="truncate">
                  {album.artists[0].artist.name}
                </Typography>
              </SafeLink>
            ) : (
              <Typography affects={["small", "muted"]} className="truncate">
                {t("common.unknownArtist")}
              </Typography>
            )}
            <Typography affects={["small", "muted"]} className="truncate">
              {album.releaseYear && `${album.releaseYear} • `}
              {album.totalDuration > 0 && formatDuration(album.totalDuration, t)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 shrink-0 rounded-full [&_svg]:size-6"
          isLoading={isShuffling}
          disabled={hasSelectedRows || !album.songs || album.songs.length === 0}
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
        <AlbumStatsSheet album={album} />
        <AlbumActions albumId={album.id} />
      </div>
    </Header>
  )
}

export { AlbumInfoHeader }
