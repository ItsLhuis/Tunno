import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { cn } from "@lib/utils"

import { formatRelativeDate, formatTime } from "@repo/utils"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import {
  Badge,
  Checkbox,
  Fade,
  IconButton,
  Marquee,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import { SongActions } from "./SongActions"

import { State } from "react-track-player-web"

import { type PlaySource } from "@features/player/types/playSource"

import { type SongWithMainRelations } from "@repo/api"

type ColumnKey = "checkbox" | "title" | "album" | "date" | "duration"

type SongItemProps = {
  song: SongWithMainRelations
  variant?: "list" | "card" | "hero"
  selected?: boolean
  allSongIds?: number[]
  onToggle?: () => void
  playSource?: PlaySource
  sourceContextId?: number
  visibleColumns?: ColumnKey[]
  queueIndex?: number
  playlistId?: number
  heroLabel?: string
}

const SongItem = memo(
  ({
    song,
    allSongIds,
    variant = "list",
    selected = false,
    onToggle,
    playSource = "songs",
    sourceContextId,
    visibleColumns,
    queueIndex,
    playlistId,
    heroLabel
  }: SongItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, pause, currentTrackId, playbackState, isTrackLoading } =
      usePlayerStore(
        useShallow((state) => ({
          loadTracks: state.loadTracks,
          play: state.play,
          pause: state.pause,
          currentTrackId: state.currentTrackId,
          playbackState: state.playbackState,
          isTrackLoading: state.isTrackLoading
        }))
      )

    const handlePlaySong = async () => {
      if (currentTrackId !== null) {
        if (currentTrackId === song.id && playbackState === State.Playing) {
          await pause()
          return
        }

        if (currentTrackId === song.id && playbackState === State.Paused) {
          await play()
          return
        }
      }

      if (allSongIds && allSongIds.length > 0) {
        const targetIdIndex = allSongIds.findIndex((id) => id === song.id)
        if (targetIdIndex >= 0) {
          await loadTracks(allSongIds, targetIdIndex, playSource, sourceContextId)
          await play()
        }
      } else {
        await loadTracks([song.id], 0, playSource, sourceContextId)
        await play()
      }
    }

    const isCurrentlyPlaying = currentTrackId === song.id && playbackState === State.Playing

    const showCheckbox = !!onToggle

    const allColumns: ColumnKey[] = ["checkbox", "title", "album", "date", "duration"]
    const columnsToShow = visibleColumns || allColumns

    const showCheckboxColumn = columnsToShow.includes("checkbox") && showCheckbox
    const showTitleColumn = columnsToShow.includes("title")
    const showAlbumColumn = columnsToShow.includes("album")
    const showDateColumn = columnsToShow.includes("date")
    const showDurationColumn = columnsToShow.includes("duration")

    if (variant === "hero") {
      return (
        <div className="flex flex-1 items-end gap-6">
          <div
            className="shrink-0"
            style={{
              width: "clamp(16rem, 16vw, 28rem)",
              height: "clamp(16rem, 16vw, 28rem)"
            }}
          >
            <Thumbnail
              placeholderIcon="Music"
              fileName={song.thumbnail}
              alt={song.name}
              className={song.thumbnail ? "size-full" : "size-24"}
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
              <Typography
                variant="h1"
                className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
              >
                {song.name}
              </Typography>
              <div className="flex items-end gap-1">
                {song.artists.length > 0 ? (
                  <SafeLink to="/artists/$id" params={{ id: song.artists[0].artistId.toString() }}>
                    <Typography affects={["small"]}>{song.artists[0].artist.name}</Typography>{" "}
                    <Typography affects={["small", "muted"]}>•</Typography>
                  </SafeLink>
                ) : (
                  <Typography affects={["small", "muted"]}>
                    {t("common.unknownArtist")} •
                  </Typography>
                )}
                {song.album ? (
                  <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                    <Typography affects={["small", "muted"]}>{song.album.name}</Typography>
                  </SafeLink>
                ) : (
                  <Typography affects={["small", "muted"]}>{t("common.unknownAlbum")}</Typography>
                )}
                {song.releaseYear && (
                  <div className="leading-none">
                    <Typography affects={["small", "muted"]}>• {song.releaseYear}</Typography>
                  </div>
                )}
                <div className="leading-none">
                  <Typography affects={["small", "muted"]}>
                    • {formatTime(song.duration)}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <IconButton
                name={isCurrentlyPlaying ? "Pause" : "Play"}
                className="size-14 shrink-0 rounded-full [&_svg]:size-7"
                tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
                onClick={handlePlaySong}
                isLoading={isTrackLoading}
              />
              <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId} />
            </div>
          </div>
        </div>
      )
    }

    if (variant === "card") {
      return (
        <SongActions
          variant="context"
          songId={song.id}
          queueIndex={queueIndex}
          playlistId={playlistId}
        >
          <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
            <div className="mb-2 size-full">
              <Thumbnail
                placeholderIcon="Music"
                fileName={song.thumbnail}
                alt={song.name}
                containerClassName="size-full"
                className={cn("size-full", !song.thumbnail && "p-[25%]")}
              />
            </div>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Marquee>
                  <SafeLink to="/songs/$id" params={{ id: song.id.toString() }}>
                    <Typography className="w-full truncate">{song.name}</Typography>
                  </SafeLink>
                </Marquee>
                <Marquee>
                  {song.artists.length > 0 ? (
                    song.artists.map((artist, index) => (
                      <span key={artist.artistId}>
                        <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                          <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                        </SafeLink>
                        {index < song.artists.length - 1 && (
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
              <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId}>
                  <IconButton
                    name="MoreHorizontal"
                    variant="secondary"
                    tooltip={t("common.more")}
                  />
                </SongActions>
              </div>
              <div className="absolute right-4 bottom-5 -z-10 shrink-0 opacity-100 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0">
                <Fade show={isCurrentlyPlaying}>
                  <Lottie animationData={PlayingLottie} className="size-5" />
                </Fade>
              </div>
            </div>
            <div className="absolute right-2 bottom-[3.225rem] z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
              <div className="relative">
                <IconButton
                  name={isCurrentlyPlaying ? "Pause" : "Play"}
                  tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
                  onClick={handlePlaySong}
                  isLoading={isTrackLoading}
                />
              </div>
            </div>
          </div>
        </SongActions>
      )
    }

    const getGridTemplateColumns = () => {
      const cols: string[] = []

      if (showCheckboxColumn) cols.push("24px")
      cols.push("40px")
      if (showTitleColumn) cols.push("1fr")
      if (showAlbumColumn) cols.push("1fr")
      if (showDateColumn) cols.push("0.5fr")
      if (showDurationColumn) cols.push("80px")
      cols.push("40px")

      return cols.join(" ")
    }

    return (
      <SongActions
        variant="context"
        songId={song.id}
        queueIndex={queueIndex}
        playlistId={playlistId}
      >
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
                    song.artists.map((artist, index) => (
                      <span key={artist.artistId}>
                        <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                          <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                        </SafeLink>
                        {index < song.artists.length - 1 && (
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

export { SongItem }
