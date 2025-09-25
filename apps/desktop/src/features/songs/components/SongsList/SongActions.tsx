import { Fragment, type ReactNode, useRef, useState } from "react"

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  IconButton,
  ScrollArea,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type SongActionsProps = {
  song?: SongWithMainRelations
  songs?: SongWithMainRelations[]
  index?: number
  list?: VirtualizedListController<SongWithMainRelations>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditSong?: (song: SongWithMainRelations) => void
  onDeleteSong?: (song: SongWithMainRelations) => void
}

const SongActions = ({
  song,
  songs = [],
  index = 0,
  list,
  variant = "dropdown",
  children,
  className,
  onEditSong,
  onDeleteSong
}: SongActionsProps) => {
  const { t } = useTranslation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const artistsScrollRef = useRef<HTMLDivElement | null>(null)

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

  const targetSongs = list
    ? list.data.filter((s) => list.selectedIds.includes(s.id.toString()))
    : songs
  const targetSong = song || (targetSongs.length === 1 ? targetSongs[0] : null)
  const targetIndex = song ? index : 0

  const handlePlaySong = async () => {
    if (!targetSongs.length) return

    if (currentTrack && targetSong) {
      if (currentTrack.id === targetSong.id && playbackState === State.Playing) {
        await pause()
        return
      }

      if (currentTrack.id === targetSong.id && playbackState === State.Paused) {
        await play()
        return
      }
    }

    await loadTracks(targetSongs, targetIndex, "queue")
    await play()
  }

  const handlePlayNext = async () => {
    if (targetSong) {
      await addToQueue(targetSong, "next")
    }
  }

  const handleAddToQueue = async () => {
    if (targetSong) {
      await addToQueue(targetSong, "end")
    }
  }

  const isCurrentlyPlaying = targetSong
    ? currentTrack?.id === targetSong.id && playbackState === State.Playing
    : false

  const handleEditClick = () => {
    if (targetSong) {
      if (onEditSong) {
        onEditSong(targetSong)
      } else {
        setIsEditOpen(true)
      }
    }
  }

  const handleDeleteClick = () => {
    if (targetSong) {
      if (onDeleteSong) {
        onDeleteSong(targetSong)
      } else {
        setIsDeleteOpen(true)
      }
    }
  }

  const renderPlaybackActions = () => (
    <>
      <ContextMenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
        <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} />
        {isCurrentlyPlaying ? t("common.pause") : t("common.play")}
      </ContextMenuItem>
      <ContextMenuItem onClick={handlePlayNext}>
        <Icon name="Forward" />
        {t("common.playNext")}
      </ContextMenuItem>
    </>
  )

  const renderDropdownPlaybackActions = () => (
    <>
      <DropdownMenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
        <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} />
        {isCurrentlyPlaying ? t("common.pause") : t("common.play")}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handlePlayNext}>
        <Icon name="Forward" />
        {t("common.playNext")}
      </DropdownMenuItem>
    </>
  )

  const renderAddToActions = () => (
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
  )

  const renderDropdownAddToActions = () => (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Icon name="Plus" />
        {t("common.addTo")}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem onClick={handleAddToQueue}>
          <Icon name="ListVideo" />
          {t("common.queue")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="Plus" />
          {t("common.playlist")}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )

  const renderNavigationActions = () => {
    if (!targetSong) return null

    const handleArtistClick = (artist: { artistId: number; artist: { name: string } }) => {
      console.log("Navigate to artist:", artist.artist.name)
    }

    return (
      <>
        {targetSong.album && (
          <ContextMenuItem>
            <Icon name="DiscAlbum" />
            {t("common.goToAlbum")}
          </ContextMenuItem>
        )}
        {targetSong.artists.length === 1 && (
          <ContextMenuItem onClick={() => handleArtistClick(targetSong.artists[0])}>
            <Icon name="User" />
            {t("common.goToArtist")}
          </ContextMenuItem>
        )}
        {targetSong.artists.length > 1 && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Icon name="User" />
              {t("common.goToArtist")}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="p-0">
              <ScrollArea className="p-1" ref={artistsScrollRef}>
                <VirtualizedList
                  scrollRef={artistsScrollRef}
                  data={targetSong.artists}
                  keyExtractor={(artist) => String(artist.artistId)}
                  renderItem={({ item: artist }) => (
                    <ContextMenuItem onClick={() => handleArtistClick(artist)}>
                      <Icon name="User" />
                      {artist.artist.name}
                    </ContextMenuItem>
                  )}
                  estimateItemHeight={32}
                  containerClassName="max-h-52"
                />
              </ScrollArea>
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
      </>
    )
  }

  const renderDropdownNavigationActions = () => {
    if (!targetSong) return null

    const handleArtistClick = (artist: { artistId: number; artist: { name: string } }) => {
      console.log("Navigate to artist:", artist.artist.name)
    }

    return (
      <>
        {targetSong.album && (
          <DropdownMenuItem>
            <Icon name="DiscAlbum" />
            {t("common.goToAlbum")}
          </DropdownMenuItem>
        )}
        {targetSong.artists.length === 1 && (
          <DropdownMenuItem onClick={() => handleArtistClick(targetSong.artists[0])}>
            <Icon name="User" />
            {t("common.goToArtist")}
          </DropdownMenuItem>
        )}
        {targetSong.artists.length > 1 && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon name="User" />
              {t("common.goToArtist")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <ScrollArea className="p-1" ref={artistsScrollRef}>
                <VirtualizedList
                  scrollRef={artistsScrollRef}
                  data={targetSong.artists}
                  keyExtractor={(artist) => String(artist.artistId)}
                  renderItem={({ item: artist }) => (
                    <DropdownMenuItem onClick={() => handleArtistClick(artist)}>
                      <Icon name="User" />
                      {artist.artist.name}
                    </DropdownMenuItem>
                  )}
                  estimateItemHeight={32}
                  containerClassName="max-h-52"
                />
              </ScrollArea>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </>
    )
  }

  const renderFormActions = () => {
    if (!targetSong) return null

    return (
      <Fragment>
        {variant === "context" ? (
          <ContextMenuItem onClick={handleEditClick}>
            <Icon name="Edit" />
            {t("form.buttons.update")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleEditClick}>
            <Icon name="Edit" />
            {t("form.buttons.update")}
          </DropdownMenuItem>
        )}
        {variant === "context" ? (
          <ContextMenuItem onClick={handleDeleteClick}>
            <Icon name="Trash2" />
            {t("form.buttons.delete")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleDeleteClick}>
            <Icon name="Trash2" />
            {t("form.buttons.delete")}
          </DropdownMenuItem>
        )}
      </Fragment>
    )
  }

  const renderContent = () => {
    if (variant === "context") {
      return (
        <ContextMenu>
          <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>{t("common.playback")}</ContextMenuLabel>
            {renderPlaybackActions()}
            <ContextMenuSeparator />
            <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
            {renderAddToActions()}
            {renderNavigationActions()}
            {renderFormActions()}
          </ContextMenuContent>
        </ContextMenu>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton name="MoreHorizontal" variant="ghost" className={className} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
          {renderDropdownPlaybackActions()}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
          {renderDropdownAddToActions()}
          {renderDropdownNavigationActions()}
          {renderFormActions()}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {targetSong && (
        <SongForm
          song={{
            ...targetSong,
            artists: targetSong.artists.map((artist) => artist.artistId)
          }}
          mode="update"
          open={isEditOpen}
          onOpen={setIsEditOpen}
        />
      )}

      {targetSong && (
        <DeleteSongDialog song={targetSong} open={isDeleteOpen} onOpen={setIsDeleteOpen} />
      )}
    </Fragment>
  )
}

export { SongActions }
