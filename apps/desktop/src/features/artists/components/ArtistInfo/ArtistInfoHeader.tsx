import { Fragment } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useImageSrc } from "@hooks/useImageSrc"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  Header,
  IconButton,
  Thumbnail,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { AnimatePresence, motion } from "motion/react"

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

  const imageSrc = useImageSrc({ thumbnail: artist?.thumbnail })

  const { dominantColor, imageRef } = useImageColorAndPalette({ imageSrc })

  return (
    <Header className="flex flex-col gap-6">
      <AnimatePresence>
        <motion.div
          key={dominantColor}
          className="absolute inset-0 h-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={
            dominantColor
              ? {
                  background: `
                    linear-gradient(
                      to bottom,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 1)")} 0%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.85)")} 18%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.6)")} 36%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.35)")} 54%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.18)")} 70%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.08)")} 84%,
                      transparent 100%
                    )
                  `
                }
              : undefined
          }
        />
      </AnimatePresence>
      <div className="flex flex-1 items-end gap-6">
        <div className="aspect-square w-80 shrink-0">
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              style={{ display: "none" }}
              crossOrigin="anonymous"
            />
          )}
          <Thumbnail
            placeholderIcon="User"
            fileName={artist.thumbnail}
            alt={artist.name}
            containerClassName="size-full rounded-full"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 truncate">
          <Badge variant="muted" className="w-fit">
            {t("common.artist")}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-1 truncate text-4xl text-pretty md:text-6xl lg:text-7xl xl:text-8xl"
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
