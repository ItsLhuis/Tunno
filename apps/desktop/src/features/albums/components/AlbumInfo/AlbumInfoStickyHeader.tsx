import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { cn } from "@lib/utils"

import { formatDuration } from "@repo/utils"

import {
  IconButton,
  Marquee,
  StickyHeader,
  Thumbnail,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import type { AlbumWithAllRelations, SongWithMainRelations } from "@repo/api"

type AlbumInfoStickyHeaderProps = {
  album: AlbumWithAllRelations
  list: VirtualizedListController<SongWithMainRelations>
  className?: string
}

const AlbumInfoStickyHeader = ({ album, list, className }: AlbumInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !album.songs || album.songs.length === 0) return
    const songIds = album.songs.map((song) => song.id)
    shuffleAndPlay(songIds, "album", album.id)
  }

  const hasSelectedRows = list.hasSelection

  return (
    <StickyHeader className={cn("flex items-center gap-3 pb-9", className)}>
      <IconButton
        name="Shuffle"
        isLoading={isShuffling}
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
        disabled={hasSelectedRows || !album.songs || album.songs.length === 0}
      />
      <div className="flex flex-1 items-center gap-3 truncate">
        <Thumbnail placeholderIcon="Disc" fileName={album.thumbnail} alt={album.name} />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{album.name}</Typography>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {t("common.songsPlayed", { count: album.songs?.length || 0 })}
              {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
            </Typography>
          </Marquee>
        </div>
      </div>
    </StickyHeader>
  )
}

export { AlbumInfoStickyHeader }
