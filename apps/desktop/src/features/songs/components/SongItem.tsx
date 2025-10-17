import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../stores/usePlayerStore"

import { cn } from "@lib/utils"

import { State } from "react-track-player-web"

import { type PlaySource } from "../types/playSource"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import { SongActions } from "./SongActions"

import {
  Checkbox,
  Fade,
  IconButton,
  Marquee,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import { formatRelativeDate, formatTime } from "@repo/utils"

import { type SongWithMainRelations } from "@repo/api"

type SongItemProps = {
  song: SongWithMainRelations
  variant?: "list" | "card"
  selected?: boolean
  allSongIds?: number[]
  onToggle?: () => void
  playSource?: PlaySource
  sourceContextId?: number
}

const SongItem = memo(
  ({
    song,
    allSongIds,
    variant = "list",
    selected = false,
    onToggle,
    playSource = "songs",
    sourceContextId
  }: SongItemProps) => {
    const { t, i18n } = useTranslation()

    const { loadTracks, play, pause, currentTrack, playbackState, isTrackLoading } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        pause: state.pause,
        currentTrack: state.currentTrack,
        playbackState: state.playbackState,
        isTrackLoading: state.isTrackLoading
      }))
    )

    const handlePlaySong = async () => {
      if (currentTrack) {
        if (currentTrack.id === song.id && playbackState === State.Playing) {
          await pause()
          return
        }

        if (currentTrack.id === song.id && playbackState === State.Paused) {
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

    const isCurrentlyPlaying = currentTrack?.id === song.id && playbackState === State.Playing

    const showCheckbox = !!onToggle

    if (variant === "card") {
      return (
        <SongActions variant="context" songId={song.id}>
          <div className="group relative flex h-full w-full flex-col items-start rounded-lg p-2 transition-colors focus-within:bg-accent hover:bg-accent">
            <div className="mb-3 h-full w-full">
              <Thumbnail
                placeholderIcon="Music"
                fileName={song.thumbnail}
                alt={song.name}
                containerClassName="h-full w-full rounded-lg"
                className={cn("h-full w-full", !song.thumbnail && "p-[25%]")}
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
              <div className="flex-shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                <SongActions songId={song.id}>
                  <IconButton
                    name="MoreHorizontal"
                    variant="secondary"
                    tooltip={t("common.more")}
                  />
                </SongActions>
              </div>
              <div className="absolute bottom-5 right-4 -z-10 flex-shrink-0 opacity-100 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0">
                <Fade show={isCurrentlyPlaying}>
                  <Lottie animationData={PlayingLottie} className="size-5" />
                </Fade>
              </div>
            </div>
            <div className="absolute bottom-14 right-2 z-10 flex justify-start opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
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

    const gridCols = showCheckbox
      ? "grid-cols-[24px_40px_1fr_1fr_0.5fr_80px_40px]"
      : "grid-cols-[40px_1fr_1fr_0.5fr_80px_40px]"

    return (
      <SongActions variant="context" songId={song.id}>
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
                  <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
                )}
              </Marquee>
            </div>
          </div>
          <div className="truncate">
            {song.album ? (
              <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                <Typography className="truncate">{song.album.name}</Typography>
              </SafeLink>
            ) : (
              <Typography affects={["muted"]}>{t("common.unknownAlbum")}</Typography>
            )}
          </div>
          <div className="truncate">
            <Typography className="truncate">
              {formatRelativeDate(song.createdAt, i18n.language, t)}
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <Typography className="truncate">{formatTime(song.duration)}</Typography>
          </div>
          <div className="flex items-center justify-center">
            <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <SongActions songId={song.id} />
            </div>
          </div>
        </div>
      </SongActions>
    )
  }
)

export { SongItem }
