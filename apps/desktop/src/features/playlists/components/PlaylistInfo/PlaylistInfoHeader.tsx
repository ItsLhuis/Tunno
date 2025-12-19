import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useTogglePlaylistFavorite } from "../../hooks/useTogglePlaylistFavorite"

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

import { PlaylistActions } from "../PlaylistActions"

import type { PlaylistWithAllRelations, SongWithMainRelations } from "@repo/api"

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

  const imageSrc = useImageSrc({ thumbnail: playlist?.thumbnail })

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
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 truncate">
          <Badge variant="muted" className="w-fit">
            {t("common.playlist")}
          </Badge>
          <Typography
            variant="h1"
            className="line-clamp-1 truncate text-4xl text-pretty md:text-6xl lg:text-7xl xl:text-8xl"
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
        <PlaylistActions playlistId={playlist.id} />
      </div>
    </Header>
  )
}

export { PlaylistInfoHeader }
