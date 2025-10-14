import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "@features/playlists/stores/usePlaylistsStore"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

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
    <Header className="flex items-center gap-3">
      <PlaylistForm
        trigger={
          <IconButton
            name="Plus"
            className="[&_svg]:size-5"
            variant="ghost"
            tooltip={t("form.titles.createPlaylist")}
          />
        }
      />
      <IconButton
        name="Shuffle"
        className="h-14 w-14 shrink-0 rounded-full [&_svg]:size-7"
        isLoading={isShuffling || isLoading}
        disabled={hasSelectedRows || !allSongIds || allSongIds.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h1" className="truncate">
        {t("playlists.title")}
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

export { PlaylistsListHeader }
