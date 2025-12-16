import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useArtistPlayback } from "./hooks"

import { cn } from "@lib/utils"

import { Checkbox, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type ArtistItemListProps, type ColumnKey } from "./types"

const ALL_COLUMNS: ColumnKey[] = ["checkbox", "title", "playCount", "lastPlayed", "date"]

const ArtistItemList = memo(
  ({ artist, index = 0, selected = false, onToggle, visibleColumns }: ArtistItemListProps) => {
    const { t, i18n } = useTranslation()

    const { isLoading, isTrackLoading, handlePlayArtist } = useArtistPlayback(artist.id)

    const canPlay = artist.totalTracks > 0

    const showCheckbox = !!onToggle
    const columnsToShow = visibleColumns || ALL_COLUMNS

    const showCheckboxColumn = columnsToShow.includes("checkbox") && showCheckbox
    const showTitleColumn = columnsToShow.includes("title")
    const showPlayCountColumn = columnsToShow.includes("playCount")
    const showLastPlayedColumn = columnsToShow.includes("lastPlayed")
    const showDateColumn = columnsToShow.includes("date")

    const gridTemplateColumns = useMemo(() => {
      const cols: string[] = []

      if (showCheckboxColumn) cols.push("24px")
      cols.push("60px")
      if (showTitleColumn) cols.push("1fr")
      if (showPlayCountColumn) cols.push("0.5fr")
      if (showLastPlayedColumn) cols.push("0.5fr")
      if (showDateColumn) cols.push("0.5fr")
      cols.push("40px")

      return cols.join(" ")
    }, [
      showCheckboxColumn,
      showTitleColumn,
      showPlayCountColumn,
      showLastPlayedColumn,
      showDateColumn
    ])

    return (
      <ArtistActions variant="context" artistId={artist.id}>
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
                onClick={handlePlayArtist}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          </div>
          {showTitleColumn && (
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
                    {t("common.songsPlayed", { count: artist.totalTracks })}
                    {artist.totalDuration > 0 && ` • ${formatDuration(artist.totalDuration, t)}`}
                  </Typography>
                </Marquee>
              </div>
            </div>
          )}
          {showPlayCountColumn && (
            <div className="truncate">
              <Typography className="truncate">{formatNumber(artist.playCount)}</Typography>
            </div>
          )}
          {showLastPlayedColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {artist.lastPlayedAt
                  ? formatRelativeDate(artist.lastPlayedAt, i18n.language, t)
                  : t("common.neverPlayed")}
              </Typography>
            </div>
          )}
          {showDateColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {formatRelativeDate(artist.createdAt, i18n.language, t)}
              </Typography>
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <ArtistActions artistId={artist.id} />
            </div>
          </div>
        </div>
      </ArtistActions>
    )
  }
)

export { ArtistItemList }
