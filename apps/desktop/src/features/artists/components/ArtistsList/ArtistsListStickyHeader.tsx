import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByArtistIds } from "@features/songs/hooks/useFetchSongsByArtistIds"

import { cn } from "@lib/utils"

import { ArtistForm } from "../../forms/ArtistForm"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistsListStickyHeaderProps = {
  list: VirtualizedListController<Artist>
  allArtistIds: number[]
  className?: string
}

const ArtistsListStickyHeader = ({
  list,
  allArtistIds,
  className
}: ArtistsListStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongs } = useFetchSongsByArtistIds(allArtistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongs || allSongs.length === 0) return
    const songIds = allSongs.map((song) => song.id)
    shuffleAndPlay(songIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3", className)}>
      <ArtistForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createArtist")}
          />
        }
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows || !allSongs || allSongs.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h4" className="truncate">
        {t("artists.title")}
      </Typography>
    </StickyHeader>
  )
}

export { ArtistsListStickyHeader }
