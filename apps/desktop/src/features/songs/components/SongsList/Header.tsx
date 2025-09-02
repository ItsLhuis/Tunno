import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { SongForm } from "../../forms"

import { Header, IconButton, Typography, type VirtualizedListController } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type HeaderComponentProps = {
  list: VirtualizedListController<SongWithMainRelations>
}

const HeaderComponent = ({ list }: HeaderComponentProps) => {
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
        className="h-11 w-11 shrink-0 rounded-full [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h1" className="truncate">
        {t("songs.title")}
      </Typography>
    </Header>
  )
}

export { HeaderComponent }
