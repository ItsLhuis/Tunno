import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { useFetchSongIdsByAlbumId } from "../hooks/useFetchSongIdsByAlbumId"

import { cn } from "@lib/utils"

import { AlbumActions } from "./AlbumActions"

import { Checkbox, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type Album } from "@repo/api"

type AlbumItemProps = {
  album: Album
  variant?: "list" | "card"
  selected?: boolean
  onToggle?: () => void
}

const AlbumItem = memo(
  ({ album, variant = "card", selected = false, onToggle }: AlbumItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, isTrackLoading } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading
      }))
    )

    const { data, isLoading } = useFetchSongIdsByAlbumId(album.id)

    const songIds = useMemo(() => {
      if (!data) return []
      return data
    }, [data])

    const handlePlayAlbum = async () => {
      if (album.totalTracks === 0) return

      await loadTracks(songIds, 0, "album", album.id)
      await play()
    }

    const canPlay = album.totalTracks > 0

    const showCheckbox = !!onToggle

    if (variant === "card") {
      return (
        <AlbumActions variant="context" albumId={album.id}>
          <div className="group relative flex h-full w-full flex-col items-start rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent">
            <div className="mb-3 h-full w-full">
              <Thumbnail
                placeholderIcon="Disc"
                fileName={album.thumbnail}
                alt={album.name}
                containerClassName="h-full w-full rounded-lg"
                className={cn("h-full w-full", !album.thumbnail && "p-[25%]")}
              />
            </div>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="min-w-0 flex-1 pb-1">
                <Marquee>
                  <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
                    <Typography className="w-full truncate">{album.name}</Typography>
                  </SafeLink>
                </Marquee>
                <Marquee>
                  <Typography affects={["muted", "small"]}>
                    {album.totalTracks}{" "}
                    {album.totalTracks === 1 ? t("common.song") : t("songs.title")} •{" "}
                    {formatDuration(album.totalDuration, t)}
                  </Typography>
                </Marquee>
              </div>
              <div className="flex-shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <AlbumActions albumId={album.id}>
                  <IconButton
                    name="MoreHorizontal"
                    variant="secondary"
                    tooltip={t("common.more")}
                  />
                </AlbumActions>
              </div>
            </div>
            <div className="absolute bottom-14 right-2 z-10 flex justify-start opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
              {canPlay && (
                <IconButton
                  name="Play"
                  tooltip={t("common.play")}
                  onClick={handlePlayAlbum}
                  isLoading={isTrackLoading || isLoading}
                  disabled={!canPlay}
                />
              )}
            </div>
          </div>
        </AlbumActions>
      )
    }

    const gridCols = showCheckbox
      ? "grid-cols-[24px_40px_1fr_0.5fr_0.5fr_0.5fr_40px]"
      : "grid-cols-[40px_1fr_0.5fr_0.5fr_0.5fr_40px]"

    return (
      <AlbumActions variant="context" albumId={album.id}>
        <div
          className={cn(
            "group grid w-full items-center gap-6 rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent",
            gridCols,
            selected && "bg-accent"
          )}
        >
          {showCheckbox && (
            <div className="flex items-center justify-center">
              <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Select row" />
            </div>
          )}
          <div className="relative flex items-center justify-center">
            <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <IconButton
                name="Play"
                tooltip={canPlay ? t("common.play") : "No songs available"}
                onClick={handlePlayAlbum}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 truncate">
            <Thumbnail
              placeholderIcon="Disc"
              fileName={album.thumbnail}
              alt={album.name}
              containerClassName="rounded-lg"
            />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
                  <Typography className="truncate">{album.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                <Typography affects={["muted", "small"]}>
                  {album.totalTracks}{" "}
                  {album.totalTracks === 1 ? t("common.song") : t("songs.title")} •{" "}
                  {formatDuration(album.totalDuration, t)}
                </Typography>
              </Marquee>
            </div>
          </div>
          <div className="truncate">
            <Typography className="truncate">{formatNumber(album.playCount)}</Typography>
          </div>
          <div className="truncate">
            <Typography className="truncate">
              {album.lastPlayedAt
                ? formatRelativeDate(album.lastPlayedAt, i18n.language, t)
                : t("common.neverPlayed")}
            </Typography>
          </div>
          <div className="truncate">
            <Typography className="truncate">
              {formatRelativeDate(album.createdAt, i18n.language, t)}
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <AlbumActions albumId={album.id} />
            </div>
          </div>
        </div>
      </AlbumActions>
    )
  }
)

export { AlbumItem }
