import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import { State } from "react-track-player-web"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import { SongActions } from "./SongActions"

import {
  Checkbox,
  Fade,
  IconButton,
  Marquee,
  Thumbnail,
  Typography,
  Button,
  SafeLink
} from "@components/ui"

import { formatRelativeDate, formatTime } from "@repo/utils"

import { type SongWithMainRelations } from "@repo/api"

type SongItemProps = {
  song: SongWithMainRelations
  selected: boolean
  allSongIds: number[]
  onToggle: () => void
}

export const SongItem = ({ song, allSongIds, selected, onToggle }: SongItemProps) => {
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
    if (!allSongIds) return

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

    const targetIdIndex = allSongIds.findIndex((id) => id === song.id)
    if (targetIdIndex >= 0) {
      await loadTracks(allSongIds, targetIdIndex, "queue")
      await play()
    }
  }

  const isCurrentlyPlaying = currentTrack?.id === song.id && playbackState === State.Playing

  return (
    <SongActions variant="context" song={song}>
      <div
        className={cn(
          "group grid w-full grid-cols-[24px_24px_1fr_1fr_0.5fr_80px_40px] items-center gap-6 rounded-lg p-2 transition-colors hover:bg-accent/50",
          selected && "bg-accent/50"
        )}
      >
        <div className="flex items-center justify-center">
          <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Select row" />
        </div>
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
            <Lottie animationData={PlayingLottie} className="group-hover:opacity-0" />
          </Fade>
        </div>
        <div className="flex flex-1 items-center gap-3 truncate">
          <Thumbnail fileName={song.thumbnail} alt={song.name} />
          <div className="w-full truncate">
            <Marquee>
              <Button variant="link" asChild>
                <SafeLink to={`/songs/$id`} params={{ id: song.id.toString() }}>
                  <Typography className="truncate">{song.name}</Typography>
                </SafeLink>
              </Button>
            </Marquee>
            <Marquee>
              {song.artists.length > 0 ? (
                <Typography className="truncate" affects={["muted", "small"]}>
                  {song.artists.map((artist) => artist.artist.name).join(", ")}
                </Typography>
              ) : (
                <Typography className="truncate" affects={["muted", "small"]}>
                  {t("common.unknown")}
                </Typography>
              )}
            </Marquee>
          </div>
        </div>
        <div className="truncate">
          {song.album ? (
            <Typography className="truncate">{song.album.name}</Typography>
          ) : (
            <Typography affects={["muted"]}>{t("common.unknown")}</Typography>
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
            <SongActions variant="dropdown" song={song} />
          </div>
        </div>
      </div>
    </SongActions>
  )
}
