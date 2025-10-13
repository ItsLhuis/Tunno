import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByAlbumIds } from "@features/songs/hooks/useFetchSongsByAlbumIds"

import { cn } from "@lib/utils"

import { AlbumForm } from "../../forms/AlbumForm"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Album } from "@repo/api"

type AlbumsListStickyHeaderProps = {
  list: VirtualizedListController<Album>
  allAlbumIds: number[]
  className?: string
}

const AlbumsListStickyHeader = ({ list, allAlbumIds, className }: AlbumsListStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongs } = useFetchSongsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongs || allSongs.length === 0) return
    const songIds = allSongs.map((song) => song.id)
    shuffleAndPlay(songIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3", className)}>
      <AlbumForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createAlbum")}
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
        {t("albums.title")}
      </Typography>
    </StickyHeader>
  )
}

export { AlbumsListStickyHeader }
