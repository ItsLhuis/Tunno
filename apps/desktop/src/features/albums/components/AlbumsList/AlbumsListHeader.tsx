import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "@features/albums/stores/useAlbumsStore"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByAlbumIds } from "@features/songs/hooks/useFetchSongsByAlbumIds"

import { AlbumForm } from "../../forms/AlbumForm"

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

import { type Album } from "@repo/api"

type AlbumsListHeaderProps = {
  list: VirtualizedListController<Album>
  allAlbumIds: number[]
}

const AlbumsListHeader = ({ list, allAlbumIds }: AlbumsListHeaderProps) => {
  const { t } = useTranslation()

  const { viewMode, setViewMode } = useAlbumsStore(
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

  const { data: allSongs, isLoading } = useFetchSongsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongs || allSongs.length === 0) return
    const songIds = allSongs.map((song) => song.id)
    shuffleAndPlay(songIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex items-center gap-3">
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
        className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
        isLoading={isShuffling || isLoading}
        disabled={hasSelectedRows || !allSongs || allSongs.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h1" className="truncate">
        {t("albums.title")}
      </Typography>
      <Tabs defaultValue={viewMode} className="ml-auto">
        <TabsList className="h-auto">
          <TabsTrigger className="p-2" value="grid" onClick={() => setViewMode("grid")}>
            <Icon name="Grid" />
          </TabsTrigger>
          <TabsTrigger className="p-2" value="list" onClick={() => setViewMode("list")}>
            <Icon name="List" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Header>
  )
}

export { AlbumsListHeader }
