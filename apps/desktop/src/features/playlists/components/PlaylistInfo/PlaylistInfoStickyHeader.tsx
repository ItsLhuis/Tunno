import { useTranslation } from "@repo/i18n"

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

import { type PlaylistWithAllRelations, type SongWithMainRelations } from "@repo/api"

type PlaylistInfoStickyHeaderProps = {
  playlist: PlaylistWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
  className?: string
}

const PlaylistInfoStickyHeader = ({ playlist, list, className }: PlaylistInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !playlist.songs || playlist.songs.length === 0) return
    const songIds = playlist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "playlist", playlist.id)
  }

  const hasSelectedRows = list?.hasSelection ?? false

  return (
    <StickyHeader className={cn("flex items-center gap-3 pb-9", className)}>
      <IconButton
        name="Shuffle"
        isLoading={isShuffling}
        variant="text"
        className="size-11 [&_svg]:size-5"
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
        disabled={hasSelectedRows || !playlist.songs || playlist.songs.length === 0}
      />
      <div className="flex flex-1 items-center gap-3 truncate">
        <Thumbnail placeholderIcon="ListMusic" fileName={playlist.thumbnail} alt={playlist.name} />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{playlist.name}</Typography>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {t("common.songsPlayed", { count: playlist.songs?.length || 0 })}
              {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
            </Typography>
          </Marquee>
        </div>
      </div>
    </StickyHeader>
  )
}

export { PlaylistInfoStickyHeader }
