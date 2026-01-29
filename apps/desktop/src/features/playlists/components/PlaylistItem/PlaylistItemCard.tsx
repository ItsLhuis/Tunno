import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { usePlaylistPlayback } from "./hooks"

import { IconButton, Marquee, SafeLink, Skeleton, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { formatDuration } from "@repo/utils"

import { type PlaylistItemCardProps } from "./types"

const PlaylistItemCardPlaceholder = () => (
  <div className="flex size-full flex-col gap-3 rounded p-2">
    <Skeleton className="aspect-square w-full rounded" />
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-3.5 w-32 rounded" />
      <Skeleton className="h-3.25 w-24 rounded" />
    </div>
  </div>
)

const PlaylistItemCard = memo(function PlaylistItemCard({
  playlist,
  index = 0
}: PlaylistItemCardProps) {
  const { t } = useTranslation()

  const { isLoading, isTrackLoading, handlePlayPlaylist } = usePlaylistPlayback(
    playlist.id,
    playlist.totalTracks
  )

  const canPlay = playlist.totalTracks > 0

  const { shouldRender } = useDelayedRender({
    index
  })

  if (!shouldRender) {
    return <PlaylistItemCardPlaceholder />
  }

  return (
    <PlaylistActions variant="context" playlistId={playlist.id}>
      <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
        <div className="mb-2 size-full">
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
            containerClassName="size-full rounded"
            className="size-full"
          />
        </div>
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Marquee>
              <SafeLink to="/playlists/$id" params={{ id: playlist.id.toString() }}>
                <Typography className="w-full truncate">{playlist.name}</Typography>
              </SafeLink>
            </Marquee>
            <Marquee>
              <Typography affects={["muted", "small"]}>
                {t("common.songsPlayed", { count: playlist.totalTracks })}
                {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
              </Typography>
            </Marquee>
          </div>
          <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
            <PlaylistActions playlistId={playlist.id}>
              <IconButton name="MoreHorizontal" variant="secondary" tooltip={t("common.more")} />
            </PlaylistActions>
          </div>
        </div>
        <div className="absolute right-2 bottom-13 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
          {canPlay && (
            <IconButton
              name="Play"
              tooltip={t("common.play")}
              onClick={handlePlayPlaylist}
              isLoading={isTrackLoading || isLoading}
              disabled={!canPlay}
            />
          )}
        </div>
      </div>
    </PlaylistActions>
  )
})

export { PlaylistItemCard }
