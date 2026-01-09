import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { SongForm } from "../../forms"

import { cn } from "@lib/utils"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type SongsListStickyHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations>
  allSongIds: number[]
  className?: string
}

const SongsListStickyHeader = ({ list, allSongIds, className }: SongsListStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || allSongIds.length === 0) return

    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3", className)}>
      <SongForm
        trigger={<IconButton name="Plus" variant="ghost" tooltip={t("form.titles.createSong")} />}
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="size-11 [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows || allSongIds.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h4" className="truncate">
        {t("songs.title")}
      </Typography>
    </StickyHeader>
  )
}

export { SongsListStickyHeader }
