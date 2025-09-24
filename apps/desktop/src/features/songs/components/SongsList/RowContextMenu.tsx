import { type ReactNode } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { State } from "react-track-player-web"

import { SongForm } from "../../forms/SongForm"
import { DeleteSongDialog } from "../DeleteSongDialog"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Icon,
  Typography
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type RowContextMenuComponentProps = {
  song: SongWithMainRelations
  index: number
  songs: SongWithMainRelations[]
  children: ReactNode
}

const RowContextMenuComponent = ({
  song,
  index,
  songs,
  children
}: RowContextMenuComponentProps) => {
  const { t } = useTranslation()

  const { loadTracks, play, pause, currentTrack, playbackState, isTrackLoading, addToQueue } =
    usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        pause: state.pause,
        currentTrack: state.currentTrack,
        playbackState: state.playbackState,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue
      }))
    )

  const handlePlaySong = async () => {
    if (!songs) return

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

    await loadTracks(songs, index, "queue")
    await play()
  }

  const handlePlayNext = async () => {
    await addToQueue(song, "next")
  }

  const handleAddToQueue = async () => {
    await addToQueue(song, "end")
  }

  const isCurrentlyPlaying = currentTrack?.id === song.id && playbackState === State.Playing

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{t("common.playback")}</ContextMenuLabel>
        <ContextMenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
          <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} />
          {isCurrentlyPlaying ? t("common.pause") : t("common.play")}
        </ContextMenuItem>
        <ContextMenuItem onClick={handlePlayNext}>
          <Icon name="Forward" />
          {t("common.playNext")}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icon name="Plus" />
            {t("common.addTo")}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={handleAddToQueue}>
              <Icon name="ListVideo" />
              {t("common.queue")}
            </ContextMenuItem>
            <ContextMenuItem>
              <Icon name="Plus" />
              {t("common.playlist")}
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        {song.album && (
          <ContextMenuItem>
            <Icon name="DiscAlbum" />
            {t("common.goToAlbum")} <Typography affects="muted">{song.album.name}</Typography>
          </ContextMenuItem>
        )}
        {song.artists.length === 1 && (
          <ContextMenuItem>
            <Icon name="User" />
            {t("common.goToArtist")}{" "}
            <Typography affects="muted">{song.artists[0].artist.name}</Typography>
          </ContextMenuItem>
        )}
        {song.artists.length > 1 && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Icon name="User" />
              {t("common.goToArtist")}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {song.artists.map((artistLink) => (
                <ContextMenuItem key={artistLink.artistId}>
                  {artistLink.artist.name}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        <SongForm
          song={{
            ...song,
            artists: song.artists.map((artist) => artist.artistId)
          }}
          mode="update"
          trigger={
            <ContextMenuItem onSelect={(e) => e.preventDefault()}>
              <Icon name="Edit" />
              {t("form.buttons.update")}
            </ContextMenuItem>
          }
        />
        <DeleteSongDialog
          song={song}
          trigger={
            <ContextMenuItem onSelect={(e) => e.preventDefault()}>
              <Icon name="Trash2" />
              {t("form.buttons.delete")}
            </ContextMenuItem>
          }
        />
      </ContextMenuContent>
    </ContextMenu>
  )
}

export { RowContextMenuComponent }
