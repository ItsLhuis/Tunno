import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

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

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const { data: allSongIds } = useFetchSongIdsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3", className)}>
      <AlbumForm
        trigger={<IconButton name="Plus" variant="ghost" tooltip={t("form.titles.createAlbum")} />}
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows || !allSongIds || allSongIds.length === 0}
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
