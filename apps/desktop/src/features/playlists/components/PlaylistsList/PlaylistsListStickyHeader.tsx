import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { cn } from "@lib/utils"

import { PlaylistForm } from "../../forms/PlaylistForm"

import {
  IconButton,
  StickyHeader,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { type Playlist } from "@repo/api"

type PlaylistsListStickyHeaderProps = {
  list: VirtualizedListController<Playlist>
  allPlaylistIds: number[]
  className?: string
}

const PlaylistsListStickyHeader = ({
  list,
  allPlaylistIds,
  className
}: PlaylistsListStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const { data: allSongIds } = useFetchSongIdsByPlaylistIds(allPlaylistIds)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !allSongIds || allSongIds.length === 0) return
    shuffleAndPlay(allSongIds, "songs")
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3", className)}>
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
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        isLoading={isShuffling}
        disabled={hasSelectedRows || !allSongIds || allSongIds.length === 0}
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
      />
      <Typography variant="h4" className="truncate">
        {t("playlists.title")}
      </Typography>
    </StickyHeader>
  )
}

export { PlaylistsListStickyHeader }
