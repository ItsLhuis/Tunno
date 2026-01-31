import { Fragment, memo, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedUnmount } from "@hooks/useDelayedUnmount"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchSongByIdWithMainRelations } from "../hooks/useFetchSongByIdWithMainRelations"

import { useRemoveSongsFromPlaylist } from "@features/playlists/hooks/useRemoveSongsFromPlaylist"

import { useToggleSongFavorite } from "../hooks/useToggleSongFavorite"

import { cn } from "@lib/utils"

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
  Spinner,
  Typography,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { SongForm } from "../forms/SongForm"
import { DeleteSongDialog } from "./DeleteSongDialog"

import { AddToPlaylistForm } from "@features/playlists/forms"

import { State } from "@track-player/web"

import { type SongWithMainRelations } from "@repo/api"

type SongActionsProps = {
  songId?: number
  list?: VirtualizedListController<SongWithMainRelations>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditSong?: (song: SongWithMainRelations) => void
  onDeleteSong?: (song: SongWithMainRelations) => void
  queueIndex?: number
  playlistId?: number
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  song: SongWithMainRelations | null
  songIds: number[]
}

type SongActionsContentProps = {
  songId?: number
  list?: VirtualizedListController<SongWithMainRelations>
  variant: "dropdown" | "context"
  queueIndex?: number
  playlistId?: number
  onOpenDialog: (type: DialogType, song: SongWithMainRelations | null, songIds: number[]) => void
}

const SongActionsContent = memo(
  ({ songId, list, variant, queueIndex, playlistId, onOpenDialog }: SongActionsContentProps) => {
    const { t } = useTranslation()

    const artistsScrollRef = useRef<HTMLDivElement | null>(null)

    const keyExtractor = useCallback(
      (artist: { artistId: number }) => artist.artistId.toString(),
      []
    )

    const currentTrack = usePlayerStore((state) => state.currentTrack)
    const playbackState = usePlayerStore((state) => state.playbackState)
    const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
    const loadTracks = usePlayerStore((state) => state.loadTracks)
    const play = usePlayerStore((state) => state.play)
    const pause = usePlayerStore((state) => state.pause)
    const addToQueue = usePlayerStore((state) => state.addToQueue)
    const removeFromQueue = usePlayerStore((state) => state.removeFromQueue)

    const toggleFavoriteMutation = useToggleSongFavorite()
    const removeFromPlaylistMutation = useRemoveSongsFromPlaylist()

    const hasMultipleSelections = list && list.selectedIds.length > 1
    const hasSingleSelection = list && list.selectedIds.length === 1
    const shouldFetchSong = songId !== undefined && !hasSingleSelection
    const resolvedSongId = songId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

    const {
      data: fetchedSong,
      isPending,
      isError
    } = useFetchSongByIdWithMainRelations(shouldFetchSong ? resolvedSongId : null)

    const targetSong: SongWithMainRelations | undefined =
      hasMultipleSelections || hasSingleSelection
        ? list?.data.find((song) => song.id === Number(list.selectedIds[0]))
        : fetchedSong

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlaySong = async () => {
      if (targetSong && !hasMultipleSelections) {
        if (currentTrack?.id === targetSong.id) {
          if (playbackState === State.Playing) {
            await pause()
          } else {
            await play()
          }
          return
        }
        await loadTracks([targetSong.id], 0, "songs")
        await play()
        return
      }

      if (list && list.selectedIds.length > 0) {
        await loadTracks(list.selectedIds.map(Number), 0, "songs")
        await play()
      }
    }

    const handlePlayNext = async () => {
      const ids = list?.selectedIds.length
        ? list.selectedIds.map(Number)
        : targetSong
          ? [targetSong.id]
          : []
      if (ids.length) await addToQueue(ids, "next")
    }

    const handleAddToQueue = async () => {
      const ids = list?.selectedIds.length
        ? list.selectedIds.map(Number)
        : targetSong
          ? [targetSong.id]
          : []
      if (ids.length) await addToQueue(ids, "end")
    }

    const handleToggleFavorite = async () => {
      if (targetSong) await toggleFavoriteMutation.mutateAsync({ id: targetSong.id })
    }

    const handleRemoveFromQueue = async () => {
      if (queueIndex !== undefined) await removeFromQueue(queueIndex)
    }

    const handleRemoveFromPlaylist = async () => {
      if (playlistId && targetSong) {
        await removeFromPlaylistMutation.mutateAsync({
          playlistId,
          songIds: [targetSong.id]
        })
      }
    }

    const handleOpenPlaylist = () => {
      const ids = list?.selectedIds.length
        ? list.selectedIds.map(Number)
        : targetSong
          ? [targetSong.id]
          : []
      onOpenDialog("playlist", targetSong ?? null, ids)
    }

    const isCurrentlyPlaying = targetSong
      ? currentTrack?.id === targetSong.id && playbackState === State.Playing
      : false

    if (shouldFetchSong && isPending) {
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner />
        </div>
      )
    }

    if (shouldFetchSong && (isError || !targetSong)) {
      return (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center p-4">
          {t("common.noResultsFound")}
        </Typography>
      )
    }

    return (
      <Fragment>
        <MenuLabel>{t("common.playback")}</MenuLabel>
        <MenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
          <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} />
          {isCurrentlyPlaying ? t("common.pause") : t("common.play")}
        </MenuItem>
        <MenuItem onClick={handlePlayNext}>
          <Icon name="Forward" />
          {t("common.playNext")}
        </MenuItem>
        <MenuSeparator />
        <MenuLabel>{t("common.actions")}</MenuLabel>
        <MenuSub>
          <MenuSubTrigger>
            <Icon name="Plus" />
            {t("common.addTo")}
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem onClick={handleAddToQueue}>
              <Icon name="ListVideo" />
              {t("common.queue")}
            </MenuItem>
            <MenuItem onClick={handleOpenPlaylist}>
              <Icon name="ListMusic" />
              {t("common.playlist")}
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
        {!hasMultipleSelections && targetSong && (
          <Fragment>
            <MenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                isFilled={targetSong.isFavorite}
                className={cn(targetSong.isFavorite && "text-primary!")}
              />
              {targetSong.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            </MenuItem>
            <MenuItem asChild>
              <SafeLink to="/songs/$id" params={{ id: targetSong.id.toString() }}>
                <Icon name="Music" />
                {t("common.goToSong")}
              </SafeLink>
            </MenuItem>
            {targetSong.album && (
              <MenuItem asChild>
                <SafeLink to="/albums/$id" params={{ id: targetSong.album.id.toString() }}>
                  <Icon name="Disc" />
                  {t("common.goToAlbum")}
                </SafeLink>
              </MenuItem>
            )}
            {targetSong.artists?.length === 1 && (
              <MenuItem asChild>
                <SafeLink
                  to="/artists/$id"
                  params={{ id: targetSong.artists[0].artistId.toString() }}
                >
                  <Icon name="User" />
                  {t("common.goToArtist")}
                </SafeLink>
              </MenuItem>
            )}
            {targetSong.artists && targetSong.artists.length > 1 && (
              <MenuSub>
                <MenuSubTrigger>
                  <Icon name="User" />
                  {t("common.goToArtist")}
                </MenuSubTrigger>
                <MenuSubContent className="p-0">
                  <ScrollArea className="p-1" ref={artistsScrollRef}>
                    <VirtualizedList
                      scrollRef={artistsScrollRef}
                      data={targetSong.artists}
                      keyExtractor={keyExtractor}
                      renderItem={({ item: artist }) => (
                        <MenuItem asChild>
                          <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                            <Typography className="line-clamp-none truncate">
                              {artist.artist.name}
                            </Typography>
                          </SafeLink>
                        </MenuItem>
                      )}
                      estimateItemHeight={30}
                      containerClassName="max-h-52"
                    />
                  </ScrollArea>
                </MenuSubContent>
              </MenuSub>
            )}
            {queueIndex !== undefined && (
              <MenuItem onClick={handleRemoveFromQueue}>
                <Icon name="ListX" />
                {t("common.removeFromQueue")}
              </MenuItem>
            )}
            {playlistId !== undefined && (
              <MenuItem
                onClick={handleRemoveFromPlaylist}
                disabled={removeFromPlaylistMutation.isPending}
              >
                <Icon name="ListMusic" />
                {t("common.removeFromPlaylist")}
              </MenuItem>
            )}
            <MenuItem onClick={() => onOpenDialog("edit", targetSong, [targetSong.id])}>
              <Icon name="Edit" />
              {t("form.buttons.update")}
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("delete", targetSong, [targetSong.id])}>
              <Icon name="Trash2" />
              {t("form.buttons.delete")}
            </MenuItem>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

const SongActions = memo(
  ({
    songId,
    list,
    variant = "dropdown",
    children,
    className,
    onEditSong,
    onDeleteSong,
    queueIndex,
    playlistId
  }: SongActionsProps) => {
    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      song: null,
      songIds: []
    })

    const shouldRenderContent = useDelayedUnmount(isOpen)
    const shouldRenderEditDialog = useDelayedUnmount(dialogState.type === "edit")
    const shouldRenderDeleteDialog = useDelayedUnmount(dialogState.type === "delete")
    const shouldRenderPlaylistDialog = useDelayedUnmount(dialogState.type === "playlist")

    const lastValidSongRef = useRef<SongWithMainRelations | null>(null)

    const lastValidSongIdsRef = useRef<number[]>([])

    useEffect(() => {
      if (dialogState.song) {
        lastValidSongRef.current = dialogState.song
      }
    }, [dialogState.song])

    useEffect(() => {
      if (dialogState.songIds.length > 0) {
        lastValidSongIdsRef.current = dialogState.songIds
      } else if (dialogState.song) {
        lastValidSongIdsRef.current = [dialogState.song.id]
      }
    }, [dialogState.songIds, dialogState.song])

    const handleOpenDialog = useCallback(
      (type: DialogType, song: SongWithMainRelations | null, songIds: number[]) => {
        if (type === "edit" && onEditSong && song) {
          onEditSong(song)
          return
        }

        if (type === "delete" && onDeleteSong && song) {
          onDeleteSong(song)
          return
        }

        setDialogState({ type, song, songIds })
      },
      [onEditSong, onDeleteSong]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, song: null, songIds: [] })
    }, [])

    const Root = variant === "context" ? ContextMenu : DropdownMenu
    const Trigger = variant === "context" ? ContextMenuTrigger : DropdownMenuTrigger
    const Content = variant === "context" ? ContextMenuContent : DropdownMenuContent

    const trigger =
      variant === "context"
        ? children
        : (children ?? (
            <IconButton
              name="MoreHorizontal"
              variant="ghost"
              className={cn(className, "shrink-0")}
              tooltip={t("common.more")}
            />
          ))

    const dialogSong = dialogState.song ?? lastValidSongRef.current

    const dialogSongIds =
      dialogState.songIds.length > 0
        ? dialogState.songIds
        : dialogSong
          ? [dialogSong.id]
          : lastValidSongIdsRef.current

    return (
      <Fragment>
        <Root onOpenChange={setIsOpen}>
          <Trigger
            asChild={variant === "dropdown"}
            className={variant === "context" ? className : undefined}
          >
            {trigger}
          </Trigger>
          <Content>
            {shouldRenderContent && (
              <SongActionsContent
                songId={songId}
                list={list}
                variant={variant}
                queueIndex={queueIndex}
                playlistId={playlistId}
                onOpenDialog={handleOpenDialog}
              />
            )}
          </Content>
        </Root>
        {shouldRenderEditDialog && dialogSong && (
          <SongForm
            songId={dialogSong.id}
            mode="update"
            open={dialogState.type === "edit"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
        {shouldRenderDeleteDialog && dialogSong && (
          <DeleteSongDialog
            song={dialogSong}
            open={dialogState.type === "delete"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
        {shouldRenderPlaylistDialog && dialogSongIds.length > 0 && (
          <AddToPlaylistForm
            songIds={dialogSongIds}
            open={dialogState.type === "playlist"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
      </Fragment>
    )
  }
)

export { SongActions }
