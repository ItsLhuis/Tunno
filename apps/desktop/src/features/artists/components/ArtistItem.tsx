import { useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { useFetchSongIdsByArtistId } from "../hooks/useFetchSongIdsByArtistId"

import { cn } from "@lib/utils"

import { ArtistActions } from "./ArtistActions"

import {
  Button,
  Checkbox,
  IconButton,
  Marquee,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import { formatNumber, formatRelativeDate } from "@repo/utils"

import { type Artist } from "@repo/api"

type ArtistItemProps = {
  artist: Artist
  variant?: "list" | "card"
  selected?: boolean
  onToggle?: () => void
}

const ArtistItem = ({ artist, variant = "card", selected = false, onToggle }: ArtistItemProps) => {
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
    if (songIds.length === 0) return

    await loadTracks(songIds, 0, "artist", artist.id)
    await play()
  }

  const canPlay = songIds.length > 0

  const showCheckbox = !!onToggle

  if (variant === "card") {
    return (
      <ArtistActions variant="context" artist={artist}>
        <div className="group relative flex w-fit flex-col items-start rounded-lg p-2 transition-colors hover:bg-accent">
          <div className="mb-3">
            <Thumbnail
              fileName={artist.thumbnail}
              alt={artist.name}
              containerClassName="size-32 rounded-full"
              className={artist.thumbnail ? "size-32" : "size-8"}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-2 truncate">
            <Button variant="link" asChild>
              <SafeLink to="/artists" params={{ id: artist.id.toString() }}>
                <Typography className="w-full truncate">{artist.name}</Typography>
              </SafeLink>
            </Button>
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <ArtistActions artist={artist} />
            </div>
          </div>
          {canPlay && (
            <div className="absolute bottom-12 right-2 z-10 opacity-0 transition-all group-hover:opacity-100">
              <IconButton
                name="Play"
                tooltip={t("common.play")}
                onClick={handlePlayArtist}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          )}
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
          "group grid w-full items-center gap-6 rounded-lg p-2 transition-colors hover:bg-accent",
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
          <div className="z-10 opacity-0 transition-opacity group-hover:opacity-100">
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
            fileName={artist.thumbnail}
            alt={artist.name}
            containerClassName="rounded-full"
          />
          <div className="w-full truncate">
            <Marquee>
              <Button variant="link" asChild>
                <SafeLink to="/artists" params={{ id: artist.id.toString() }}>
                  <Typography className="truncate">{artist.name}</Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              <Typography affects={["muted", "small"]}>
                {songIds.length} {songIds.length === 1 ? t("common.song") : t("songs.title")}
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
              : "Never played"}
          </Typography>
        </div>
        <div className="truncate">
          <Typography className="truncate">
            {formatRelativeDate(artist.createdAt, i18n.language, t)}
          </Typography>
        </div>
        <div className="flex items-center justify-center">
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <ArtistActions artist={artist} />
          </div>
        </div>
      </div>
    </ArtistActions>
  )
}

export { ArtistItem }
