import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { cn } from "@lib/utils"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { State } from "react-track-player-web"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import {
  Button,
  Checkbox,
  ContextMenu,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Fade,
  Icon,
  IconButton,
  Marquee,
  SafeLink,
  Thumbnail,
  Typography
} from "@components/ui"

import { formatRelativeDate, formatTime } from "@repo/utils"

import { type SongWithRelations } from "@repo/api"
import { RowContextMenuContentComponent } from "./RowContextMenu"

type SongItemProps = {
  song: SongWithRelations
  index: number
  selected: boolean
  onToggle: () => void
  songs: SongWithRelations[]
}

export const SongItem = ({ song, index, selected, onToggle, songs }: SongItemProps) => {
  const { t, i18n } = useTranslation()

  const { loadTracks, play, currentTrack, playbackState, isTrackLoading } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      currentTrack: state.currentTrack,
      playbackState: state.playbackState,
      isTrackLoading: state.isTrackLoading
    }))
  )

  const handlePlaySong = async () => {
    if (!songs) return

    if (currentTrack) {
      if (currentTrack.id === song.id && playbackState === State.Playing) {
        await usePlayerStore.getState().pause()
        return
      }

      if (currentTrack.id === song.id && playbackState === State.Paused) {
        await play()
        return
      }
    }

    await loadTracks(songs, index, "queue")
    await play()
  }

  const isCurrentlyPlaying = currentTrack?.id === song.id && playbackState === State.Playing

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
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
                  <SafeLink>
                    <Typography className="truncate">{song.name}</Typography>
                  </SafeLink>
                </Button>
              </Marquee>
              <Marquee>
                {song.artists.length > 0 ? (
                  <Button variant="link" asChild>
                    <SafeLink to={`/artists`}>
                      <Typography className="truncate" affects={["muted", "small"]}>
                        {song.artists.map((artist) => artist.artist.name).join(", ")}
                      </Typography>
                    </SafeLink>
                  </Button>
                ) : (
                  <Typography className="truncate" affects={["muted", "small"]}>
                    Unknown artist
                  </Typography>
                )}
              </Marquee>
            </div>
          </div>
          <div className="truncate">
            {song.album ? (
              <Typography className="truncate">{song.album.name}</Typography>
            ) : (
              <Typography affects={["muted"]}>Unknown</Typography>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton name="MoreHorizontal" variant="ghost" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handlePlaySong}>
                    <Icon name="Play" />
                    {t("common.play")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Forward" />
                    {t("common.playNext")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon name="Plus" />
                      {t("common.addTo")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Icon name="ListVideo" />
                        {t("common.queue")}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="Plus" />
                        {t("common.playlist")}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Icon name="DiscAlbum" />
                    {t("common.goToAlbum")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="User" />
                    {t("common.goToArtist")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Edit" />
                    {t("form.buttons.update")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <RowContextMenuContentComponent />
    </ContextMenu>
  )
}
