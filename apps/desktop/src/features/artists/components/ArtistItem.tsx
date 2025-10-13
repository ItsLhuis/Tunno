import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { useFetchSongIdsByArtistId } from "../hooks/useFetchSongIdsByArtistId"

import { cn } from "@lib/utils"

import { ArtistActions } from "./ArtistActions"

import { Checkbox, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type Artist } from "@repo/api"

type ArtistItemProps = {
  artist: Artist
  variant?: "list" | "card"
  selected?: boolean
  onToggle?: () => void
}

const ArtistItem = memo(
  ({ artist, variant = "card", selected = false, onToggle }: ArtistItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, isTrackLoading } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading
      }))
    )

    const { data, isLoading } = useFetchSongIdsByArtistId(artist.id)

    const songIds = useMemo(() => {
      if (!data) return []
      return data
    }, [data])

    const handlePlayArtist = async () => {
      if (artist.totalTracks === 0) return

      await loadTracks(songIds, 0, "artist", artist.id)
      await play()
    }

    const canPlay = artist.totalTracks > 0

    const showCheckbox = !!onToggle

    if (variant === "card") {
      return (
        <ArtistActions variant="context" artist={artist}>
          <div className="group relative flex h-full w-full flex-col items-start rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent">
            <div className="mb-3 h-full w-full">
              <Thumbnail
                placeholderIcon="User"
                fileName={artist.thumbnail}
                alt={artist.name}
                containerClassName="h-full w-full rounded-full"
                className={cn("h-full w-full", !artist.thumbnail && "p-[25%]")}
              />
            </div>
            <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
              <Typography className="w-full truncate">{artist.name}</Typography>
            </SafeLink>
            <Marquee className="pb-1">
              <Typography affects={["muted", "small"]}>
                {artist.totalTracks}{" "}
                {artist.totalTracks === 1 ? t("common.song") : t("songs.title")} •{" "}
                {formatDuration(artist.totalDuration, t)}
              </Typography>
            </Marquee>
            <div className="absolute bottom-10 left-2 right-2 z-10 flex justify-between opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
              {canPlay && (
                <IconButton
                  name="Play"
                  tooltip={t("common.play")}
                  onClick={handlePlayArtist}
                  isLoading={isTrackLoading || isLoading}
                  disabled={!canPlay}
                />
              )}
              <ArtistActions artist={artist}>
                <IconButton
                  name="MoreHorizontal"
                  variant="secondary"
                  tooltip={t("common.more")}
                  className="ml-auto"
                />
              </ArtistActions>
            </div>
          </div>
        </ArtistActions>
      )
    }

    const gridCols = showCheckbox
      ? "grid-cols-[24px_40px_1fr_0.5fr_0.5fr_0.5fr_40px]"
      : "grid-cols-[40px_1fr_0.5fr_0.5fr_0.5fr_40px]"

    return (
      <ArtistActions variant="context" artist={artist}>
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
                onClick={handlePlayArtist}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 truncate">
            <Thumbnail
              placeholderIcon="User"
              fileName={artist.thumbnail}
              alt={artist.name}
              containerClassName="rounded-full"
            />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
                  <Typography className="truncate">{artist.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                <Typography affects={["muted", "small"]}>
                  {artist.totalTracks}{" "}
                  {artist.totalTracks === 1 ? t("common.song") : t("songs.title")} •{" "}
                  {formatDuration(artist.totalDuration, t)}
                </Typography>
              </Marquee>
            </div>
          </div>
          <div className="truncate">
            <Typography className="truncate">{formatNumber(artist.playCount)}</Typography>
          </div>
          <div className="truncate">
            <Typography className="truncate">
              {artist.lastPlayedAt
                ? formatRelativeDate(artist.lastPlayedAt, i18n.language, t)
                : t("common.neverPlayed")}
            </Typography>
          </div>
          <div className="truncate">
            <Typography className="truncate">
              {formatRelativeDate(artist.createdAt, i18n.language, t)}
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <ArtistActions artist={artist} />
            </div>
          </div>
        </div>
      </ArtistActions>
    )
  }
)

export { ArtistItem }
