import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { SongForm } from "../../forms"

import { Header, IconButton, Typography, type VirtualizedListController } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type SongsListHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations>
  allSongIds: number[]
}

const SongsListHeader = ({ list, allSongIds }: SongsListHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || allSongIds.length === 0) return

    shuffleAndPlay(allSongIds, "queue")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex items-center gap-3">
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
        className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
        isLoading={isShuffling}
        disabled={hasSelectedRows || allSongIds.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h1" className="truncate">
        {t("songs.title")}
      </Typography>
    </Header>
  )
}

export { SongsListHeader }
