import { Fragment } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  Header,
  IconButton,
  Thumbnail,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import type { ArtistWithAllRelations, SongWithMainRelations } from "@repo/api"

type ArtistInfoHeaderProps = {
  artist: ArtistWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
}

const ArtistInfoHeader = ({ artist, list }: ArtistInfoHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

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
      <div className="flex flex-1 items-end gap-6">
        <div
          className="shrink-0"
          style={{
            width: "clamp(16rem, 16vw, 28rem)",
            height: "clamp(16rem, 16vw, 28rem)"
          }}
        >
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            className={artist.thumbnail ? "h-full w-full" : "size-24"}
            containerClassName="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Badge variant="muted" className="w-fit">
            {t("common.artist")}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-2 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {artist.name}
          </Typography>
          <Typography affects={["muted", "small"]}>
            {t("common.songsPlayed", { count: artist.totalTracks })}
            {artist.totalDuration > 0 && (
              <Fragment> • {formatDuration(artist.totalDuration, t)}</Fragment>
            )}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-3">
        <IconButton
          name="Shuffle"
          className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
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
        <ArtistActions artistId={artist.id} />
      </div>
    </Header>
  )
}

export { ArtistInfoHeader }
