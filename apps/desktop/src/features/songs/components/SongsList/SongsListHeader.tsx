import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useNavigate, useSearch } from "@tanstack/react-router"

import { useSongsStore } from "../../stores/useSongsStore"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { SongForm } from "../../forms"

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

import { type SongWithMainRelations } from "@repo/api"

type SongsListHeaderProps = {
  list: VirtualizedListController<SongWithMainRelations>
  allSongIds: number[]
}

const SongsListHeader = ({ list, allSongIds }: SongsListHeaderProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { create } = useSearch({ from: "/songs/" })

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
        to: "/songs",
        search: (prev) => ({ ...prev, create: undefined }),
        replace: true
      })
    }
  }

  const viewMode = useSongsStore((state) => state.viewMode)
  const setViewMode = useSongsStore((state) => state.setViewMode)

  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)
  const isShuffling = usePlayerStore((state) => state.isShuffling)

  const handleShuffleAndPlay = () => {
    if (isShuffling || allSongIds.length === 0) return

    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <Header className="flex flex-col gap-6 md:flex-row md:items-center md:gap-3">
      <SongForm
        open={isFormOpen}
        onOpen={handleOpenChange}
        trigger={<IconButton name="Plus" variant="ghost" tooltip={t("form.titles.createSong")} />}
      />
      <div className="grid flex-1 grid-cols-[auto_1fr_auto] items-center gap-3">
        <IconButton
          name="Shuffle"
          className="size-14 rounded-full [&_svg]:size-6"
          isLoading={isShuffling}
          disabled={hasSelectedRows || allSongIds.length === 0}
          tooltip={t("common.shuffleAndPlay")}
          onClick={handleShuffleAndPlay}
        />
        <Typography variant="h1" className="truncate">
          {t("songs.title")}
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

export { SongsListHeader }
