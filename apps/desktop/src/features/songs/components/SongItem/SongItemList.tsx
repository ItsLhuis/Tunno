import { memo, useMemo } from "react"

import { useTranslation } from "@repo/i18n"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useBreakpoint } from "@hooks/useBreakpoint"

import { useDelayedRender } from "@hooks/useDelayedRender"

import { useSongPlayback } from "./hooks"

import { cn } from "@lib/utils"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import {
  Checkbox,
  Fade,
  IconButton,
  Marquee,
  SafeLink,
  Skeleton,
  Thumbnail,
  Typography
} from "@components/ui"

import { SongActions } from "../SongActions"

import { formatRelativeDate, formatTime } from "@repo/utils"

import { type ColumnKey, type SongItemListProps } from "./types"

const ALL_COLUMNS: ColumnKey[] = ["checkbox", "title", "album", "date", "duration"]

const SongItemPlaceholder = ({
  gridTemplateColumns,
  showCheckboxColumn,
  showTitleColumn,
  showAlbumColumn,
  showDateColumn,
  showDurationColumn
}: {
  gridTemplateColumns: string
  showCheckboxColumn: boolean
  showTitleColumn: boolean
  showAlbumColumn: boolean
  showDateColumn: boolean
  showDurationColumn: boolean
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
    {showTitleColumn && (
      <div className="flex flex-1 items-center gap-3">
        <Skeleton className="aspect-square size-14 rounded" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-3.25 w-24 rounded" />
        </div>
      </div>
    )}
    {showAlbumColumn && <Skeleton className="h-3.5 w-32 rounded" />}
    {showDateColumn && <Skeleton className="h-3.5 w-32 rounded" />}
    {showDurationColumn && (
      <div className="flex items-center justify-center">
        <Skeleton className="h-3.5 w-12 rounded" />
      </div>
    )}
  </div>
)

const SongItemList = memo(
  ({
    song,
    index = 0,
    allSongIds,
    selected = false,
    onToggle,
    playSource = "songs",
    sourceContextId,
    visibleColumns,
    queueIndex,
    playlistId,
    queuePlayback = false,
    sortableId
  }: SongItemListProps) => {
    const { t, i18n } = useTranslation()

    const { isBelow } = useBreakpoint()

    const { isCurrentlyPlaying, isTrackLoading, handlePlaySong } = useSongPlayback(
      song.id,
      allSongIds,
      playSource,
      sourceContextId,
      { queuePlayback, queueIndex }
    )

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: sortableId ?? "",
      disabled: !sortableId
    })

    const sortableStyle = sortableId
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: isDragging ? 9999 : undefined
        }
      : {}

    const showCheckbox = !!onToggle
    const columnsToShow = visibleColumns || ALL_COLUMNS

    const showCheckboxColumn = columnsToShow.includes("checkbox") && showCheckbox && !isBelow("sm")
    const showTitleColumn = columnsToShow.includes("title")
    const showAlbumColumn = columnsToShow.includes("album") && !isBelow("md")
    const showDateColumn = columnsToShow.includes("date") && !isBelow("lg")
    const showDurationColumn = columnsToShow.includes("duration") && !isBelow("sm")

    const gridTemplateColumns = useMemo(() => {
      const cols: string[] = []

      if (showCheckboxColumn) cols.push("24px")
      cols.push("60px")
      if (showTitleColumn) cols.push("1fr")
      if (showAlbumColumn) cols.push("1fr")
      if (showDateColumn) cols.push("0.5fr")
      if (showDurationColumn) cols.push("80px")
      cols.push("40px")

      return cols.join(" ")
    }, [showCheckboxColumn, showTitleColumn, showAlbumColumn, showDateColumn, showDurationColumn])

    const { shouldRender } = useDelayedRender({
      index
    })

    if (!shouldRender) {
      return (
        <SongItemPlaceholder
          gridTemplateColumns={gridTemplateColumns}
          showCheckboxColumn={showCheckboxColumn}
          showTitleColumn={showTitleColumn}
          showAlbumColumn={showAlbumColumn}
          showDateColumn={showDateColumn}
          showDurationColumn={showDurationColumn}
        />
      )
    }

    return (
      <SongActions
        variant="context"
        songId={song.id}
        queueIndex={queueIndex}
        playlistId={playlistId}
      >
        <div
          ref={sortableId ? setNodeRef : undefined}
          className={cn(
            "group focus-within:bg-accent hover:bg-accent grid w-full items-center gap-3 rounded p-2 transition-colors",
            selected && "bg-accent"
          )}
          style={{ gridTemplateColumns, ...sortableStyle }}
          {...(sortableId ? { ...attributes, ...listeners } : {})}
        >
          {showCheckboxColumn && (
            <div className="flex items-center justify-center">
              <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Select row" />
            </div>
          )}
          <div className="relative flex items-center justify-center">
            <Typography
              className={cn(
                "absolute z-10 max-w-16 truncate transition-opacity group-focus-within:opacity-0 group-hover:opacity-0",
                isCurrentlyPlaying && "opacity-0"
              )}
              affects={["small", "muted"]}
            >
              {index + 1}
            </Typography>
            <div className="z-10 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <IconButton
                name={isCurrentlyPlaying ? "Pause" : "Play"}
                tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
                onClick={handlePlaySong}
                isLoading={isTrackLoading}
              />
            </div>
            <Fade show={isCurrentlyPlaying} className="absolute z-0 size-5">
              <Lottie
                animationData={PlayingLottie}
                className="group-focus-within:opacity-0 group-hover:opacity-0"
              />
            </Fade>
          </div>
          {showTitleColumn && (
            <div className="flex flex-1 items-center gap-3 truncate">
              <Thumbnail placeholderIcon="Music" fileName={song.thumbnail} alt={song.name} />
              <div className="flex w-full flex-col gap-1 truncate">
                <Marquee>
                  <SafeLink to={`/songs/$id`} params={{ id: song.id.toString() }}>
                    <Typography className="truncate">{song.name}</Typography>
                  </SafeLink>
                </Marquee>
                <Marquee>
                  {song.artists.length > 0 ? (
                    song.artists.map((artist, artistIndex) => (
                      <span key={artist.artistId}>
                        <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                          <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                        </SafeLink>
                        {artistIndex < song.artists.length - 1 && (
                          <Typography affects={["muted", "small"]}>, </Typography>
                        )}
                      </span>
                    ))
                  ) : (
                    <Typography affects={["muted", "small"]}>
                      {t("common.unknownArtist")}
                    </Typography>
                  )}
                </Marquee>
              </div>
            </div>
          )}
          {showAlbumColumn && (
            <div className="truncate">
              {song.album ? (
                <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                  <Typography className="truncate">{song.album.name}</Typography>
                </SafeLink>
              ) : (
                <Typography affects={["muted"]}>{t("common.unknownAlbum")}</Typography>
              )}
            </div>
          )}
          {showDateColumn && (
            <div className="truncate">
              <Typography className="truncate">
                {formatRelativeDate(song.createdAt, i18n.language, t)}
              </Typography>
            </div>
          )}
          {showDurationColumn && (
            <div className="flex items-center justify-center">
              <Typography className="truncate">{formatTime(song.duration)}</Typography>
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId} />
            </div>
          </div>
        </div>
      </SongActions>
    )
  }
)

export { SongItemList }
