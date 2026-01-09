import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useNavigate, useSearch } from "@tanstack/react-router"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "@features/playlists/stores/usePlaylistsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { PlaylistForm } from "../../forms/PlaylistForm"

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

import { type Playlist } from "@repo/api"

type PlaylistsListHeaderProps = {
  list: VirtualizedListController<Playlist>
  allPlaylistIds: number[]
}

const PlaylistsListHeader = ({ list, allPlaylistIds }: PlaylistsListHeaderProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { create } = useSearch({ from: "/playlists/" })

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
        to: "/playlists",
        search: (prev) => ({ ...prev, create: undefined }),
        replace: true
      })
    }
  }

  const { viewMode, setViewMode } = usePlaylistsStore(
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

  const { data: allSongIds, isLoading } = useFetchSongIdsByPlaylistIds(allPlaylistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex flex-col gap-6 md:flex-row md:items-center md:gap-3">
      <PlaylistForm
        open={isFormOpen}
        onOpen={handleOpenChange}
        trigger={
          <IconButton name="Plus" variant="ghost" tooltip={t("form.titles.createPlaylist")} />
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
          {t("playlists.title")}
        </Typography>
        <Tabs defaultValue={viewMode}>
          <TabsList className="h-auto">
            <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
              <Icon name="Grid" />
            </TabsTrigger>
            <TabsTrigger value="list" onClick={() => setViewMode("list")}>
              <Icon name="List" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Header>
  )
}

export { PlaylistsListHeader }
