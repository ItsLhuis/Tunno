import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { cn } from "@lib/utils"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { Checkbox, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { PlaylistActions } from "./PlaylistActions"

import { type Playlist } from "@repo/api"

type ColumnKey = "checkbox" | "title" | "playCount" | "lastPlayed" | "date"

type PlaylistItemProps = {
  playlist: Playlist
  variant?: "list" | "card" | "compact"
  selected?: boolean
  onToggle?: () => void
  visibleColumns?: ColumnKey[]
}

const PlaylistItem = memo(
  ({
    playlist,
    variant = "card",
    selected = false,
    onToggle,
    visibleColumns
  }: PlaylistItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, isTrackLoading } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading
      }))
    )

    const { data, isLoading } = useFetchSongIdsByPlaylistIds([playlist.id])

    const songIds = useMemo(() => {
      if (!data) return []
      return data
    }, [data])

    const handlePlayPlaylist = async () => {
      if (playlist.totalTracks === 0) return

      await loadTracks(songIds, 0, "playlist", playlist.id)
      await play()
    }

    const canPlay = playlist.totalTracks > 0

    const showCheckbox = !!onToggle

    const allColumns: ColumnKey[] = ["checkbox", "title", "playCount", "lastPlayed", "date"]
    const columnsToShow = visibleColumns || allColumns

    const showCheckboxColumn = columnsToShow.includes("checkbox") && showCheckbox
    const showTitleColumn = columnsToShow.includes("title")
    const showPlayCountColumn = columnsToShow.includes("playCount")
    const showLastPlayedColumn = columnsToShow.includes("lastPlayed")
    const showDateColumn = columnsToShow.includes("date")

    if (variant === "card") {
      return (
        <PlaylistActions variant="context" playlistId={playlist.id}>
          <div className="group relative flex h-full w-full flex-col items-start rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent">
            <div className="mb-2 h-full w-full">
              <Thumbnail
                placeholderIcon="ListMusic"
                fileName={playlist.thumbnail}
                alt={playlist.name}
                containerClassName="h-full w-full rounded-lg"
                className={cn("h-full w-full", !playlist.thumbnail && "p-[25%]")}
              />
            </div>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Marquee>
                  <SafeLink to="/playlists/$id" params={{ id: playlist.id.toString() }}>
                    <Typography className="w-full truncate">{playlist.name}</Typography>
                  </SafeLink>
                </Marquee>
                <Marquee>
                  <Typography affects={["muted", "small"]}>
                    {playlist.totalTracks}{" "}
                    {playlist.totalTracks === 1 ? t("common.song") : t("songs.title")}
                    {playlist.totalDuration > 0 &&
                      ` • ${formatDuration(playlist.totalDuration, t)}`}
                  </Typography>
                </Marquee>
              </div>
              <div className="flex-shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <PlaylistActions playlistId={playlist.id}>
                  <IconButton
                    name="MoreHorizontal"
                    variant="secondary"
                    tooltip={t("common.more")}
                  />
                </PlaylistActions>
              </div>
            </div>
            <div className="absolute bottom-[3.225rem] right-2 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
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
    }

    if (variant === "compact") {
      return (
        <PlaylistActions variant="context" playlistId={playlist.id}>
          <div className="group relative flex h-full w-full flex-col items-start rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent">
            <div className="h-full w-full">
              <Thumbnail
                placeholderIcon="ListMusic"
                fileName={playlist.thumbnail}
                alt={playlist.name}
                containerClassName="h-full w-full rounded-lg"
                className={cn("h-full w-full", !playlist.thumbnail && "p-[25%]")}
              />
            </div>
            <div className="absolute bottom-2 right-2 flex items-center justify-center">
              <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
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
          </div>
        </PlaylistActions>
      )
    }

    const getGridTemplateColumns = () => {
      const cols: string[] = []

      if (showCheckboxColumn) cols.push("24px")
      cols.push("40px")
      if (showTitleColumn) cols.push("1fr")
      if (showPlayCountColumn) cols.push("0.5fr")
      if (showLastPlayedColumn) cols.push("0.5fr")
      if (showDateColumn) cols.push("0.5fr")
      cols.push("40px")

      return cols.join(" ")
    }

    return (
      <PlaylistActions variant="context" playlistId={playlist.id}>
        <div
          className={cn(
            "group grid w-full items-center gap-3 rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent",
            selected && "bg-accent"
          )}
          style={{ gridTemplateColumns: getGridTemplateColumns() }}
        >
          {showCheckboxColumn && (
            <div className="flex items-center justify-center">
              <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Select row" />
            </div>
          )}
          <div className="relative flex items-center justify-center">
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
          {showTitleColumn && (
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
                    {playlist.totalTracks}{" "}
                    {playlist.totalTracks === 1 ? t("common.song") : t("songs.title")}
                    {playlist.totalDuration > 0 &&
                      ` • ${formatDuration(playlist.totalDuration, t)}`}
                  </Typography>
                </Marquee>
              </div>
            </div>
          )}
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

export { PlaylistItem }
