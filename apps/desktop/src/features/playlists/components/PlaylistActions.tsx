import { Fragment, memo, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedUnmount } from "@hooks/useDelayedUnmount"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchPlaylistByIdWithSongs } from "../hooks/useFetchPlaylistByIdWithSongs"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { useTogglePlaylistFavorite } from "../hooks/useTogglePlaylistFavorite"

import { useIsInSidebar } from "@features/sidebar/hooks/useIsInSidebar"
import { useToggleSidebarItem } from "@features/sidebar/hooks/useToggleSidebarItem"

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
  Spinner,
  Typography,
  type VirtualizedListController
} from "@components/ui"

import { PlaylistForm } from "../forms/PlaylistForm"
import { DeletePlaylistDialog } from "./DeletePlaylistDialog"

import { AddToPlaylistForm } from "./AddToPlaylistForm"

import { type Playlist } from "@repo/api"

type PlaylistActionsProps = {
  playlistId?: number
  list?: VirtualizedListController<Playlist>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditPlaylist?: (playlist: Playlist) => void
  onDeletePlaylist?: (playlist: Playlist) => void
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  playlist: Playlist | null
  songIds: number[]
}

type PlaylistActionsContentProps = {
  playlistId?: number
  list?: VirtualizedListController<Playlist>
  variant: "dropdown" | "context"
  onOpenDialog: (type: DialogType, playlist: Playlist | null, songIds: number[]) => void
}

const PlaylistActionsContent = memo(
  ({ playlistId, list, variant, onOpenDialog }: PlaylistActionsContentProps) => {
    const { t } = useTranslation()

    const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue
      }))
    )

    const toggleFavoriteMutation = useTogglePlaylistFavorite()
    const toggleSidebarMutation = useToggleSidebarItem()

    const hasMultipleSelections = list && list.selectedIds.length > 1
    const hasSingleSelection = list && list.selectedIds.length === 1
    const shouldFetchPlaylist = playlistId !== undefined && !hasSingleSelection
    const resolvedPlaylistId =
      playlistId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

    const {
      data: fetchedPlaylist,
      isLoading,
      isError
    } = useFetchPlaylistByIdWithSongs(shouldFetchPlaylist ? resolvedPlaylistId : null)

    const selectedPlaylistIds = hasMultipleSelections
      ? list.selectedIds.map((id) => Number(id))
      : []
    const playlistsWithSongs = hasMultipleSelections
      ? selectedPlaylistIds.filter((playlistId) => {
          const playlist = list.data.find((p) => p.id === playlistId)
          return playlist && playlist.totalTracks > 0
        })
      : []
    const { data: multipleSongIds } = useFetchSongIdsByPlaylistIds(
      hasMultipleSelections ? playlistsWithSongs : null
    )

    const { data: isInSidebar } = useIsInSidebar(
      "playlist",
      !hasMultipleSelections ? resolvedPlaylistId : null
    )

    const targetPlaylist: Playlist | undefined =
      hasMultipleSelections || hasSingleSelection
        ? list?.data.find((playlist) => playlist.id === Number(list.selectedIds[0]))
        : fetchedPlaylist

    const playlistSongs = fetchedPlaylist?.songs?.map((song) => song.song) || []
    const hasSongsInSelection = hasMultipleSelections
      ? selectedPlaylistIds.some((playlistId) => {
          const playlist = list.data.find((p) => p.id === playlistId)
          return playlist && playlist.totalTracks > 0
        })
      : false
    const hasSongs =
      playlistSongs.length > 0 ||
      (hasSingleSelection && targetPlaylist && targetPlaylist.totalTracks > 0) ||
      hasSongsInSelection ||
      (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlayPlaylist = async () => {
      if (hasMultipleSelections && multipleSongIds?.length) {
        await loadTracks(multipleSongIds, 0, "playlist")
        await play()
      } else if (playlistSongs.length > 0) {
        const songIds = playlistSongs.map((song) => song.id)
        await loadTracks(songIds, 0, "playlist", targetPlaylist?.id)
        await play()
      }
    }

    const handlePlayNext = async () => {
      if (hasMultipleSelections && multipleSongIds?.length) {
        await addToQueue(multipleSongIds, "next")
      } else if (playlistSongs.length > 0) {
        await addToQueue(
          playlistSongs.map((song) => song.id),
          "next"
        )
      }
    }

    const handleAddToQueue = async () => {
      if (hasMultipleSelections && multipleSongIds?.length) {
        await addToQueue(multipleSongIds, "end")
      } else if (playlistSongs.length > 0) {
        await addToQueue(
          playlistSongs.map((song) => song.id),
          "end"
        )
      }
    }

    const handleToggleFavorite = async () => {
      if (targetPlaylist) {
        await toggleFavoriteMutation.mutateAsync(targetPlaylist.id)
      }
    }

    const handleToggleSidebar = async () => {
      if (targetPlaylist) {
        await toggleSidebarMutation.mutateAsync({
          entityType: "playlist",
          entityId: targetPlaylist.id,
          name: targetPlaylist.name
        })
      }
    }

    const handleOpenPlaylist = () => {
      const ids =
        hasMultipleSelections && multipleSongIds?.length
          ? multipleSongIds
          : playlistSongs.length > 0
            ? playlistSongs.map((song) => song.id)
            : []
      onOpenDialog("playlist", targetPlaylist ?? null, ids)
    }

    if (shouldFetchPlaylist && isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner />
        </div>
      )
    }

    if (shouldFetchPlaylist && (isError || !targetPlaylist)) {
      return (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center p-4">
          {t("common.noResultsFound")}
        </Typography>
      )
    }

    const hasAnyActions = hasSongs || (!hasMultipleSelections && targetPlaylist)

    if (!hasAnyActions) {
      return (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center p-4">
          {t("common.noResultsFound")}
        </Typography>
      )
    }

    return (
      <Fragment>
        {hasSongs && (
          <Fragment>
            <MenuLabel>{t("common.playback")}</MenuLabel>
            <MenuItem onClick={handlePlayPlaylist} disabled={isTrackLoading}>
              <Icon name="Play" />
              {t("common.play")}
            </MenuItem>
            <MenuItem onClick={handlePlayNext}>
              <Icon name="Forward" />
              {t("common.playNext")}
            </MenuItem>
            <MenuSeparator />
          </Fragment>
        )}
        <MenuLabel>{t("common.actions")}</MenuLabel>
        {hasSongs && (
          <MenuSub>
            <MenuSubTrigger>
              <Icon name="Plus" />
              {t("common.addTo")}
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem onClick={handleAddToQueue}>
                <Icon name="ListMusic" />
                {t("common.queue")}
              </MenuItem>
              <MenuItem onClick={handleOpenPlaylist}>
                <Icon name="ListMusic" />
                {t("common.playlist")}
              </MenuItem>
            </MenuSubContent>
          </MenuSub>
        )}
        {!hasMultipleSelections && targetPlaylist && (
          <Fragment>
            <MenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                isFilled={targetPlaylist.isFavorite}
                className={cn(targetPlaylist.isFavorite && "text-primary!")}
              />
              {targetPlaylist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            </MenuItem>
            <MenuItem onClick={handleToggleSidebar} disabled={toggleSidebarMutation.isPending}>
              <Icon name="PanelLeft" />
              {isInSidebar ? t("common.removeFromSidebar") : t("common.addToSidebar")}
            </MenuItem>
            <MenuItem asChild>
              <SafeLink to="/playlists/$id" params={{ id: targetPlaylist.id.toString() }}>
                <Icon name="ListMusic" />
                {t("common.goToPlaylist")}
              </SafeLink>
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("edit", targetPlaylist, [])}>
              <Icon name="Edit" />
              {t("form.buttons.update")}
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("delete", targetPlaylist, [])}>
              <Icon name="Trash2" />
              {t("form.buttons.delete")}
            </MenuItem>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

const PlaylistActions = memo(
  ({
    playlistId,
    list,
    variant = "dropdown",
    children,
    className,
    onEditPlaylist,
    onDeletePlaylist
  }: PlaylistActionsProps) => {
    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      playlist: null,
      songIds: []
    })

    const shouldRenderContent = useDelayedUnmount(isOpen)
    const shouldRenderEditDialog = useDelayedUnmount(dialogState.type === "edit")
    const shouldRenderDeleteDialog = useDelayedUnmount(dialogState.type === "delete")
    const shouldRenderPlaylistDialog = useDelayedUnmount(dialogState.type === "playlist")

    const lastValidPlaylistRef = useRef<Playlist | null>(null)
    const lastValidSongIdsRef = useRef<number[]>([])

    useEffect(() => {
      if (dialogState.playlist) {
        lastValidPlaylistRef.current = dialogState.playlist
      }
    }, [dialogState.playlist])

    useEffect(() => {
      if (dialogState.songIds.length > 0) {
        lastValidSongIdsRef.current = dialogState.songIds
      }
    }, [dialogState.songIds])

    const handleOpenDialog = useCallback(
      (type: DialogType, playlist: Playlist | null, songIds: number[]) => {
        if (type === "edit" && onEditPlaylist && playlist) {
          onEditPlaylist(playlist)
          return
        }

        if (type === "delete" && onDeletePlaylist && playlist) {
          onDeletePlaylist(playlist)
          return
        }

        setDialogState({ type, playlist, songIds })
      },
      [onEditPlaylist, onDeletePlaylist]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, playlist: null, songIds: [] })
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

    const dialogPlaylist = dialogState.playlist ?? lastValidPlaylistRef.current
    const dialogSongIds =
      dialogState.songIds.length > 0 ? dialogState.songIds : lastValidSongIdsRef.current

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
              <PlaylistActionsContent
                playlistId={playlistId}
                list={list}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            )}
          </Content>
        </Root>
        {shouldRenderEditDialog && dialogPlaylist && (
          <PlaylistForm
            playlistId={dialogPlaylist.id}
            mode="update"
            open={dialogState.type === "edit"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
        {shouldRenderDeleteDialog && dialogPlaylist && (
          <DeletePlaylistDialog
            playlist={dialogPlaylist}
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

export { PlaylistActions }
