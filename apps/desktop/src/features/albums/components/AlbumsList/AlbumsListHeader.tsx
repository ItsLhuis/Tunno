import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useNavigate, useSearch } from "@tanstack/react-router"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "@features/albums/stores/useAlbumsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

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

  const navigate = useNavigate()

  const { create } = useSearch({ from: "/albums/" })

  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (create) {
      requestAnimationFrame(() => setIsFormOpen(true))
    }
  }, [create])

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open)

    if (!open && create) {
      navigate({
        to: "/albums",
        search: (prev) => ({ ...prev, create: undefined }),
        replace: true
      })
    }
  }

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

  const { data: allSongIds, isLoading } = useFetchSongIdsByAlbumIds(allAlbumIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex flex-col gap-6 md:flex-row md:items-center md:gap-3">
      <AlbumForm
        open={isFormOpen}
        onOpen={handleOpenChange}
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createAlbum")}
          />
        }
      />
      <div className="grid flex-1 grid-cols-[auto_1fr_auto] items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 rounded-full [&_svg]:size-6"
          isLoading={isShuffling || isLoading}
          disabled={hasSelectedRows || !allSongIds || allSongIds.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <Typography variant="h1" className="truncate">
          {t("albums.title")}
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

export { AlbumsListHeader }
