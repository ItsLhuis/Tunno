import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { cn } from "@lib/utils"

import { formatDuration } from "@repo/utils"

import { IconButton, Marquee, StickyHeader, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoStickyHeaderProps = {
  playlist: PlaylistWithAllRelations
  className?: string
}

const PlaylistInfoStickyHeader = ({ playlist, className }: PlaylistInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || !playlist.songs || playlist.songs.length === 0) return
    const songIds = playlist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "playlist", playlist.id)
  }

  return (
    <StickyHeader className={cn("flex items-center justify-between gap-3 pb-9", className)}>
      <IconButton
        name="Shuffle"
        isLoading={isShuffling}
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
        disabled={!playlist.songs || playlist.songs.length === 0}
      />
      <div className="flex flex-1 items-center gap-3 truncate">
        <Thumbnail placeholderIcon="ListMusic" fileName={playlist.thumbnail} alt={playlist.name} />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{playlist.name}</Typography>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {playlist.songs?.length || 0}{" "}
              {(playlist.songs?.length || 0) === 1 ? t("common.song") : t("songs.title")}
              {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
            </Typography>
          </Marquee>
        </div>
      </div>
      <div className="shrink-0">
        <PlaylistActions playlistId={playlist.id} />
      </div>
    </StickyHeader>
  )
}

export { PlaylistInfoStickyHeader }
