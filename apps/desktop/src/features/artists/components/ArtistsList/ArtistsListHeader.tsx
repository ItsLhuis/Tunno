import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "@features/artists/stores/useArtistsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

import { ArtistForm } from "../../forms/ArtistForm"

import {
  Header,
  Icon,
  IconButton,
  Tabs,
  TabsList,
  TabsTrigger,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistsListHeaderProps = {
  list: VirtualizedListController<Artist>
  allArtistIds: number[]
}

const ArtistsListHeader = ({ list, allArtistIds }: ArtistsListHeaderProps) => {
  const { t } = useTranslation()

  const { viewMode, setViewMode } = useArtistsStore(
    useShallow((state) => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode
    }))
  )

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongIds, isLoading } = useFetchSongIdsByArtistIds(allArtistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex flex-col gap-6 md:flex-row md:items-center md:gap-3">
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
      <div className="grid flex-1 grid-cols-[auto_1fr_auto] items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 rounded-full [&_svg]:size-7"
          isLoading={isShuffling || isLoading}
          disabled={hasSelectedRows || !allSongIds || allSongIds.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <Typography variant="h1" className="truncate">
          {t("artists.title")}
        </Typography>
        <Tabs defaultValue={viewMode}>
          <TabsList className="h-auto">
            <TabsTrigger className="p-2" value="grid" onClick={() => setViewMode("grid")}>
              <Icon name="Grid" />
            </TabsTrigger>
            <TabsTrigger className="p-2" value="list" onClick={() => setViewMode("list")}>
              <Icon name="List" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Header>
  )
}

export { ArtistsListHeader }
