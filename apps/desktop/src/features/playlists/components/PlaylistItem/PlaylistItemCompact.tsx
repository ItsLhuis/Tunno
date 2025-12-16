import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { usePlaylistPlayback } from "./hooks"

import { cn } from "@lib/utils"

import { IconButton, Marquee, SafeLink, ScopedTheme, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { type PlaylistItemCompactProps } from "./types"

const PlaylistItemCompact = memo(({ playlist }: PlaylistItemCompactProps) => {
  const { t } = useTranslation()

  const { isLoading, isTrackLoading, handlePlayPlaylist } = usePlaylistPlayback(
    playlist.id,
    playlist.totalTracks
  )

  const canPlay = playlist.totalTracks > 0

  return (
    <PlaylistActions variant="context" playlistId={playlist.id}>
      <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
        <div className="size-full">
          <Thumbnail
            placeholderIcon="ListMusic"
            fileName={playlist.thumbnail}
            alt={playlist.name}
            containerClassName="size-full"
            className={cn("size-full", !playlist.thumbnail && "p-[25%]")}
          />
        </div>
        <div className="absolute inset-x-2 bottom-2 h-14 rounded-b-lg bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100" />
        <div className="absolute right-2 bottom-2 left-4 z-10 flex items-center justify-between gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <ScopedTheme theme="dark" className={cn("min-w-0 flex-1", !canPlay && "mb-2")}>
            <Marquee>
              <SafeLink to="/playlists/$id" params={{ id: playlist.id.toString() }}>
                <Typography className="truncate drop-shadow-lg">{playlist.name}</Typography>
              </SafeLink>
            </Marquee>
          </ScopedTheme>
          {canPlay && (
            <div className="shrink-0">
              <IconButton
                name="Play"
                tooltip={t("common.play")}
                onClick={handlePlayPlaylist}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          )}
        </div>
      </div>
    </PlaylistActions>
  )
})

export { PlaylistItemCompact }
