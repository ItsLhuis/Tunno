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

import { type ArtistWithAllRelations, type SongWithMainRelations } from "@repo/api"

type ArtistInfoStickyHeaderProps = {
  artist: ArtistWithAllRelations
  list: VirtualizedListController<SongWithMainRelations> | null
  className?: string
}

const ArtistInfoStickyHeader = ({ artist, list, className }: ArtistInfoStickyHeaderProps) => {
  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || !artist.songs || artist.songs.length === 0) return
    const songIds = artist.songs.map((song) => song.songId)
    shuffleAndPlay(songIds, "artist", artist.id)
  }

  const hasSelectedRows = list?.hasSelection ?? false

  return (
    <StickyHeader className={cn("flex items-center gap-3 pb-9", className)}>
      <IconButton
        name="Shuffle"
        isLoading={isShuffling}
        variant="text"
        className="h-11 w-11 [&_svg]:size-5"
        tooltip={t("common.shuffleAndPlay")}
        onClick={handleShuffleAndPlay}
        disabled={hasSelectedRows || !artist.songs || artist.songs.length === 0}
      />
      <div className="flex flex-1 items-center gap-3 truncate">
        <Thumbnail
          placeholderIcon="User"
          fileName={artist.thumbnail}
          alt={artist.name}
          containerClassName="rounded-full"
        />
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography className="truncate">{artist.name}</Typography>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {t("common.songsPlayed", { count: artist.songs?.length || 0 })}
              {artist.totalDuration > 0 && ` • ${formatDuration(artist.totalDuration, t)}`}
            </Typography>
          </Marquee>
        </div>
      </div>
    </StickyHeader>
  )
}

export { ArtistInfoStickyHeader }
