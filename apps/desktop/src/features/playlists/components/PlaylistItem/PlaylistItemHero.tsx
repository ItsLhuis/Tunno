import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { usePlaylistPlayback } from "./hooks"

import { Badge, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { formatDuration } from "@repo/utils"

import { type PlaylistItemHeroProps } from "./types"

const PlaylistItemHero = memo(({ playlist, heroLabel }: PlaylistItemHeroProps) => {
  const { t } = useTranslation()

  const { songIds, isShuffling, handleShuffleAndPlay } = usePlaylistPlayback(
    playlist.id,
    playlist.totalTracks
  )

  return (
    <div className="flex flex-1 items-end gap-6">
      <div className="aspect-square w-100 shrink-0">
        <Thumbnail
          placeholderIcon="ListMusic"
          fileName={playlist.thumbnail}
          alt={playlist.name}
          className={playlist.thumbnail ? "size-full" : "size-24"}
          containerClassName="size-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-1 flex-col gap-2">
          {heroLabel && (
            <Badge variant="muted" className="w-fit">
              {heroLabel}
            </Badge>
          )}
          <SafeLink to="/playlists/$id" params={{ id: playlist.id.toString() }}>
            <Typography
              variant="h1"
              className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
            >
              {playlist.name}
            </Typography>
          </SafeLink>
          <Typography affects={["muted", "small"]}>
            {t("common.songsPlayed", { count: playlist.totalTracks })}
            {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
          </Typography>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <IconButton
            name="Shuffle"
            className="size-14 shrink-0 rounded-full [&_svg]:size-7"
            isLoading={isShuffling}
            disabled={!songIds || songIds.length === 0}
            tooltip={t("common.shuffleAndPlay")}
            onClick={handleShuffleAndPlay}
          />
          <PlaylistActions playlistId={playlist.id} />
        </div>
      </div>
    </div>
  )
})

export { PlaylistItemHero }
