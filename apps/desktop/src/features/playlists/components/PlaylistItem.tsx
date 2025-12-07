import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { cn } from "@lib/utils"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import {
  Badge,
  Checkbox,
  IconButton,
  Marquee,
  SafeLink,
  ScopedTheme,
  Thumbnail,
  Typography,
  buttonVariants
} from "@components/ui"

import { PlaylistActions } from "./PlaylistActions"

import { type Playlist } from "@repo/api"

type ColumnKey = "checkbox" | "title" | "playCount" | "lastPlayed" | "date"

type PlaylistItemProps = {
  playlist: Playlist
  variant?: "list" | "card" | "compact" | "hero" | "select"
  selected?: boolean
  onToggle?: () => void
  visibleColumns?: ColumnKey[]
  heroLabel?: string
}

const PlaylistItem = memo(
  ({
    playlist,
    variant = "card",
    selected = false,
    onToggle,
    visibleColumns,
    heroLabel
  }: PlaylistItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, isTrackLoading, shuffleAndPlay, isShuffling } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading,
        shuffleAndPlay: state.shuffleAndPlay,
        isShuffling: state.isShuffling
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

    const handleShuffleAndPlay = () => {
      if (isShuffling || !songIds || songIds.length === 0) return
      shuffleAndPlay(songIds, "playlist", playlist.id)
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

    if (variant === "select") {
      return (
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "flex h-auto w-full flex-row items-center justify-between gap-3 rounded p-3 text-left transition-colors focus:ring-0 focus:outline-hidden"
          )}
        >
          <div className="flex w-full items-center gap-3">
            <div
              className="flex items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <Checkbox tabIndex={-1} checked={selected} onCheckedChange={onToggle} />
            </div>
            <Thumbnail
              placeholderIcon="ListMusic"
              fileName={playlist.thumbnail}
              alt={playlist.name}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Marquee>
                <Typography className="truncate font-medium">{playlist.name}</Typography>
              </Marquee>
              <Marquee>
                <Typography affects={["muted", "small"]} className="truncate">
                  {t("common.songsPlayed", { count: playlist.totalTracks })}
                  {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
                </Typography>
              </Marquee>
            </div>
          </div>
        </button>
      )
    }

    if (variant === "card") {
      return (
        <PlaylistActions variant="context" playlistId={playlist.id}>
          <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
            <div className="mb-2 size-full">
              <Thumbnail
                placeholderIcon="ListMusic"
                fileName={playlist.thumbnail}
                alt={playlist.name}
                containerClassName="size-full"
                className={cn("size-full", !playlist.thumbnail && "p-[25%]")}
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
                    {t("common.songsPlayed", { count: playlist.totalTracks })}
                    {playlist.totalDuration > 0 &&
                      ` • ${formatDuration(playlist.totalDuration, t)}`}
                  </Typography>
                </Marquee>
              </div>
              <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <PlaylistActions playlistId={playlist.id}>
                  <IconButton
                    name="MoreHorizontal"
                    variant="secondary"
                    tooltip={t("common.more")}
                  />
                </PlaylistActions>
              </div>
            </div>
            <div className="absolute right-2 bottom-14 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
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
    }

    if (variant === "hero") {
      return (
        <div className="flex flex-1 items-end gap-6">
          <div
            className="shrink-0"
            style={{
              width: "clamp(20rem, 20vw, 35rem)",
              height: "clamp(20rem, 20vw, 35rem)"
            }}
          >
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
            "group focus-within:bg-accent hover:bg-accent grid w-full items-center gap-3 rounded p-2 transition-colors",
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
                    {t("common.songsPlayed", { count: playlist.totalTracks })}
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
