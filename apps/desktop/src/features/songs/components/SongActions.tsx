import { Fragment, type ReactNode, useRef, useState, memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../stores/usePlayerStore"

import { State } from "react-track-player-web"

import { SongForm } from "../forms/SongForm"
import { DeleteSongDialog } from "./DeleteSongDialog"

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
  SafeLink,
  ScrollArea,
  Typography,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type SongActionsProps = {
  song?: SongWithMainRelations
  list?: VirtualizedListController<SongWithMainRelations>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditSong?: (song: SongWithMainRelations) => void
  onDeleteSong?: (song: SongWithMainRelations) => void
}

const SongActions = memo(
  ({
    song,
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

    const targetSong =
      song ||
      (list && list.selectedIds.length === 1
        ? list.data.find((s) => s.id === Number(list.selectedIds[0]))
        : null)

    const handlePlaySong = async () => {
      if (targetSong) {
        if (currentTrack && currentTrack.id === targetSong.id && playbackState === State.Playing) {
          await pause()
          return
        }

        if (currentTrack && currentTrack.id === targetSong.id && playbackState === State.Paused) {
          await play()
          return
        }

        await loadTracks([targetSong.id], 0, "queue")
        await play()
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedIds = list.selectedIds.map((id) => Number(id))
        await loadTracks(selectedIds, 0, "queue")
        await play()
      }
    }

    const handlePlayNext = async () => {
      if (targetSong) {
        await addToQueue([targetSong], "next")
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedSongs = list.data.filter((s) => list.selectedIds.includes(String(s.id)))
        await addToQueue(selectedSongs, "next")
      }
    }

    const handleAddToQueue = async () => {
      if (targetSong) {
        await addToQueue([targetSong], "end")
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedSongs = list.data.filter((s) => list.selectedIds.includes(String(s.id)))
        await addToQueue(selectedSongs, "end")
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
          <ContextMenuItem asChild>
            <SafeLink to="/songs/$id" params={{ id: targetSong.id.toString() }}>
              <Icon name="Music" />
              {t("common.goToSong")}
            </SafeLink>
          </ContextMenuItem>
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
                    keyExtractor={(artist) => artist.artistId.toString()}
                    renderItem={({ item: artist }) => (
                      <ContextMenuItem onClick={() => handleArtistClick(artist)}>
                        <Icon name="User" />
                        <Typography className="line-clamp-none truncate">
                          {artist.artist.name}
                        </Typography>
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
          <DropdownMenuItem asChild>
            <SafeLink to="/songs/$id" params={{ id: targetSong.id.toString() }}>
              <Icon name="Music" />
              {t("common.goToSong")}
            </SafeLink>
          </DropdownMenuItem>
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
                    keyExtractor={(artist) => artist.artistId.toString()}
                    renderItem={({ item: artist }) => (
                      <DropdownMenuItem onClick={() => handleArtistClick(artist)}>
                        <Icon name="User" />
                        <Typography className="line-clamp-none truncate">
                          {artist.artist.name}
                        </Typography>
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
            {children || <IconButton name="MoreHorizontal" variant="ghost" className={className} />}
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
)

export { SongActions }
