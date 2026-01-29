import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

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

import { ArtistActions } from "../ArtistActions"
import { ArtistStatsSheet } from "./ArtistStatsSheet"

import { type ArtistWithAllRelations, type SongWithMainRelations } from "@repo/api"

type ArtistInfoHeaderProps = {
  artist: ArtistWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
}

const ArtistInfoHeader = ({ artist, list }: ArtistInfoHeaderProps) => {
  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !artist.songs || artist.songs.length === 0) return
    const songIds = artist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "artist", artist.id)
  }

  const toggleFavoriteMutation = useToggleArtistFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: artist.id })
  }

  const hasSelectedRows = list?.hasSelection ?? false

  return (
    <Header className="flex flex-col gap-6">
      <DominantColorGradient thumbnail={artist.thumbnail} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="aspect-square w-full shrink-0 md:w-100">
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            containerClassName="size-full rounded-full"
            className="size-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.artist")}
          </Badge>
          <Typography
            variant="h1"
            className="truncate text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            {artist.name}
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.songsPlayed", { count: artist.totalTracks })}
            </Typography>
            {artist.totalDuration > 0 && (
              <Typography affects={["muted", "small"]} className="truncate">
                {formatDuration(artist.totalDuration, t)}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 shrink-0 rounded-full [&_svg]:size-6"
          isLoading={isShuffling}
          disabled={hasSelectedRows || !artist.songs || artist.songs.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <IconButton
          name="Heart"
          isFilled={artist.isFavorite}
          tooltip={artist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          variant="text"
          className="shrink-0"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
        />
        <ArtistStatsSheet artist={artist} />
        <ArtistActions artistId={artist.id} />
      </div>
    </Header>
  )
}

export { ArtistInfoHeader }
