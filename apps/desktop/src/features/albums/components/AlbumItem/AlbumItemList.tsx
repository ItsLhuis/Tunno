import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { useAlbumPlayback } from "./hooks"

import { cn } from "@lib/utils"

import {
  Checkbox,
  IconButton,
  Marquee,
  SafeLink,
  Skeleton,
  Thumbnail,
  Typography
} from "@components/ui"

import { AlbumActions } from "../AlbumActions"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type AlbumItemListProps } from "./types"

const AlbumItemListPlaceholder = ({
  gridTemplateColumns,
  showCheckboxColumn,
  showPlayCountColumn,
  showLastPlayedColumn,
  showDateColumn
}: {
  gridTemplateColumns: string
  showCheckboxColumn: boolean
  showPlayCountColumn: boolean
  showLastPlayedColumn: boolean
  showDateColumn: boolean
}) => (
  <div className="grid w-full items-center gap-3 rounded p-2" style={{ gridTemplateColumns }}>
    {showCheckboxColumn && (
      <div className="flex items-center justify-center">
        <Skeleton className="border-foreground/30 bg-sidebar/75 size-4 rounded-sm border" />
      </div>
    )}
    <div className="flex items-center justify-center">
      <Skeleton className="h-3.25 w-8 rounded" />
    </div>
    <div className="flex flex-1 items-center gap-3">
      <Skeleton className="aspect-square size-14 rounded" />
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-3.25 w-24 rounded" />
      </div>
    </div>
    {showPlayCountColumn && <Skeleton className="h-3.5 w-8 rounded" />}
    {showLastPlayedColumn && <Skeleton className="h-3.5 w-32 rounded" />}
    {showDateColumn && <Skeleton className="h-3.5 w-32 rounded" />}
  </div>
)

const AlbumItemList = memo(
  ({ album, index = 0, selected = false, onToggle }: AlbumItemListProps) => {
    const { t, i18n } = useTranslation()

    const { isBelow } = useBreakpoint()

    const { isLoading, isTrackLoading, handlePlayAlbum } = useAlbumPlayback(album.id)

    const canPlay = album.totalTracks > 0

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

    const { shouldRender } = useDelayedRender({
      index
    })

    if (!shouldRender) {
      return (
        <AlbumItemListPlaceholder
          gridTemplateColumns={gridTemplateColumns}
          showCheckboxColumn={showCheckboxColumn}
          showPlayCountColumn={showPlayCountColumn}
          showLastPlayedColumn={showLastPlayedColumn}
          showDateColumn={showDateColumn}
        />
      )
    }

    return (
      <AlbumActions variant="context" albumId={album.id}>
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
                onClick={handlePlayAlbum}
                isLoading={isTrackLoading || isLoading}
                disabled={!canPlay}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 truncate">
            <Thumbnail placeholderIcon="Disc" fileName={album.thumbnail} alt={album.name} />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
                  <Typography className="truncate">{album.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                <Typography affects={["muted", "small"]}>
                  {t("common.songsPlayed", { count: album.totalTracks })}
                  {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
                </Typography>
              </Marquee>
            </div>
          </div>
          {showPlayCountColumn && (
            <div className="truncate">
              <Typography className="truncate">{formatNumber(album.playCount)}</Typography>
            </div>
          )}
          {showLastPlayedColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {album.lastPlayedAt
                  ? formatRelativeDate(album.lastPlayedAt, i18n.language, t)
                  : t("common.neverPlayed")}
              </Typography>
            </div>
          )}
          {showDateColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {formatRelativeDate(album.createdAt, i18n.language, t)}
              </Typography>
            </div>
          )}
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

export { AlbumItemList }
