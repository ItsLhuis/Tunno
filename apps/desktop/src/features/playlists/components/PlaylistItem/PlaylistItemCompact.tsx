import { Fragment, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { usePlaylistPlayback } from "./hooks"

import {
  IconButton,
  Marquee,
  SafeLink,
  ScopedTheme,
  Skeleton,
  Thumbnail,
  Typography
} from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { formatDuration } from "@repo/utils"

import { type PlaylistItemCompactProps } from "./types"

const PlaylistItemCompactPlaceholder = () => (
  <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2">
    <Skeleton className="size-14 rounded" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-32 rounded" />
      <Skeleton className="h-3.25 w-24 rounded" />
    </div>
  </div>
)

const PlaylistItemCompact = memo(({ playlist, index = 0 }: PlaylistItemCompactProps) => {
  const { t } = useTranslation()

  const { shouldRender } = useDelayedRender({ index })

  const { isLoading, isTrackLoading, handlePlayPlaylist } = usePlaylistPlayback(
    playlist.id,
    playlist.totalTracks
  )

  const canPlay = playlist.totalTracks > 0

  if (!shouldRender) {
    return <PlaylistItemCompactPlaceholder />
  }

  return (
    <PlaylistActions variant="context" playlistId={playlist.id}>
      <div className="group focus-within:bg-accent hover:bg-accent grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded p-2 transition-colors">
        <div className="relative overflow-hidden rounded">
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
          />
          {canPlay && (
            <Fragment>
              <div className="absolute inset-0 w-full bg-black/50 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100" />
              <ScopedTheme
                theme="dark"
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
              >
                <IconButton
                  name="Play"
                  variant="ghost"
                  tooltip={t("common.play")}
                  onClick={handlePlayPlaylist}
                  isLoading={isTrackLoading || isLoading}
                />
              </ScopedTheme>
            </Fragment>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Marquee>
            <SafeLink to="/playlists/$id" params={{ id: playlist.id.toString() }}>
              <Typography className="truncate">{playlist.name}</Typography>
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
          <PlaylistActions playlistId={playlist.id} />
        </div>
      </div>
    </PlaylistActions>
  )
})

export { PlaylistItemCompact }
