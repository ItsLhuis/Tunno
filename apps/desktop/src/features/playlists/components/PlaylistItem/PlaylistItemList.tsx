import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { usePlaylistPlayback } from "./hooks"

import { cn } from "@lib/utils"

import { Checkbox, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type PlaylistItemListProps } from "./types"

const PlaylistItemList = memo(
  ({ playlist, index = 0, selected = false, onToggle }: PlaylistItemListProps) => {
    const { t, i18n } = useTranslation()

    const { isBelow } = useBreakpoint()

    const { isLoading, isTrackLoading, handlePlayPlaylist } = usePlaylistPlayback(
      playlist.id,
      playlist.totalTracks
    )

    const canPlay = playlist.totalTracks > 0

    const showCheckbox = !!onToggle

    const showCheckboxColumn = showCheckbox && !isBelow("sm")
    const showPlayCountColumn = !isBelow("md")
    const showLastPlayedColumn = !isBelow("lg")
    const showDateColumn = !isBelow("xl")

    const gridTemplateColumns = useMemo(() => {
      const cols: string[] = []

      if (showCheckboxColumn) cols.push("24px")
      cols.push("60px", "1fr")
      if (showPlayCountColumn) cols.push("0.5fr")
      if (showLastPlayedColumn) cols.push("0.5fr")
      if (showDateColumn) cols.push("0.5fr")
      cols.push("40px")

      return cols.join(" ")
    }, [showCheckboxColumn, showPlayCountColumn, showLastPlayedColumn, showDateColumn])

    return (
      <PlaylistActions variant="context" playlistId={playlist.id}>
        <div
          className={cn(
            "group focus-within:bg-accent hover:bg-accent grid w-full items-center gap-3 rounded p-2 transition-colors",
            selected && "bg-accent"
          )}
          style={{ gridTemplateColumns }}
        >
          {showCheckboxColumn && (
            <div className="flex items-center justify-center">
              <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Select row" />
            </div>
          )}
          <div className="relative flex items-center justify-center">
            <Typography
              className={cn(
                "absolute z-10 max-w-16 truncate transition-opacity group-focus-within:opacity-0 group-hover:opacity-0"
              )}
              affects={["small", "muted"]}
            >
              {index + 1}
            </Typography>
            <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <IconButton
                name="Play"
                tooltip={canPlay ? t("common.play") : "No songs available"}
                onClick={handlePlayPlaylist}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 truncate">
            <Thumbnail
              placeholderIcon="ListMusic"
              fileName={playlist.thumbnail}
              alt={playlist.name}
            />
            <div className="flex w-full flex-col gap-1 truncate">
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
          </div>
          {showPlayCountColumn && (
            <div className="truncate">
              <Typography className="truncate">{formatNumber(playlist.playCount)}</Typography>
            </div>
          )}
          {showLastPlayedColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {playlist.lastPlayedAt
                  ? formatRelativeDate(playlist.lastPlayedAt, i18n.language, t)
                  : t("common.neverPlayed")}
              </Typography>
            </div>
          )}
          {showDateColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {formatRelativeDate(playlist.createdAt, i18n.language, t)}
              </Typography>
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <PlaylistActions playlistId={playlist.id} />
            </div>
          </div>
        </div>
      </PlaylistActions>
    )
  }
)

export { PlaylistItemList }
