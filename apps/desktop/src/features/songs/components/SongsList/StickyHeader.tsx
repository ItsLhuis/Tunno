import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { SongForm } from "../../forms"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type StickyHeaderComponentProps = {
  list: VirtualizedListController<SongWithMainRelations>
}

const StickyHeaderComponent = ({ list }: StickyHeaderComponentProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const songs = list.data

  const handleShuffleAndPlay = () => {
    if (isShuffling) return

    shuffleAndPlay(songs, "queue")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className="flex items-center gap-3">
      <SongForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createSong")}
          />
        }
      />
      <IconButton
        name="Shuffle"
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h4" className="truncate">
        {t("songs.title")}
      </Typography>
    </StickyHeader>
  )
}

export { StickyHeaderComponent }
