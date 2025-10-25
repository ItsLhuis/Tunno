import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchPlaylistByIdWithSongs } from "../hooks/useFetchPlaylistByIdWithSongs"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import { useTogglePlaylistFavorite } from "../hooks/useTogglePlaylistFavorite"

import { cn } from "@lib/utils"

import { PlaylistForm } from "../forms/PlaylistForm"
import { AddToPlaylistForm } from "./AddToPlaylistForm"
import { DeletePlaylistDialog } from "./DeletePlaylistDialog"

import {
  AsyncState,
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

const PlaylistActions = ({
  playlistId,
  list,
  variant = "dropdown",
  children,
  className,
  onEditPlaylist,
  onDeletePlaylist
}: PlaylistActionsProps) => {
  const { t } = useTranslation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false)

  const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      addToQueue: state.addToQueue
    }))
  )

  const toggleFavoriteMutation = useTogglePlaylistFavorite()

  const hasMultipleSelections = list && list.selectedIds.length > 1
  const hasSingleSelection = list && list.selectedIds.length === 1
  const shouldFetchPlaylist = playlistId !== undefined || hasSingleSelection
  const resolvedPlaylistId = playlistId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

  const {
    data: targetPlaylist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError
  } = useFetchPlaylistByIdWithSongs(shouldFetchPlaylist ? resolvedPlaylistId : null)

  const selectedPlaylistIds = hasMultipleSelections ? list.selectedIds.map((id) => Number(id)) : []
  const playlistsWithSongs = hasMultipleSelections
    ? selectedPlaylistIds.filter((playlistId) => {
        const playlist = list.data.find((p) => p.id === playlistId)
        return playlist && playlist.totalTracks > 0
      })
    : []
  const { data: multipleSongIds } = useFetchSongIdsByPlaylistIds(
    hasMultipleSelections ? playlistsWithSongs : null
  )

  const finalTargetPlaylist =
    hasMultipleSelections || hasSingleSelection
      ? list.data.find((playlist) => playlist.id === Number(list.selectedIds[0]))
      : targetPlaylist

  const playlistSongs = targetPlaylist?.songs?.map((song) => song.song) || []
  const hasSongsInSelection = hasMultipleSelections
    ? selectedPlaylistIds.some((playlistId) => {
        const playlist = list.data.find((p) => p.id === playlistId)
        return playlist && playlist.totalTracks > 0
      })
    : false
  const hasSongs =
    playlistSongs.length > 0 ||
    (hasSingleSelection && finalTargetPlaylist && finalTargetPlaylist.totalTracks > 0) ||
    hasSongsInSelection ||
    (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

  const handlePlayPlaylist = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await loadTracks(multipleSongIds, 0, "playlist")
      await play()
    } else if (playlistSongs.length > 0) {
      const songIds = playlistSongs.map((song) => song.id)
      await loadTracks(songIds, 0, "playlist", finalTargetPlaylist?.id)
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
    if (finalTargetPlaylist) {
      await toggleFavoriteMutation.mutateAsync(finalTargetPlaylist.id)
    }
  }

  const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
  const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
  const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
  const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
  const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
  const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

  const renderPlaybackActions = () => {
    if (!hasSongs) return null

    return (
      <>
        <MenuItem onClick={handlePlayPlaylist} disabled={isTrackLoading}>
          <Icon name="Play" />
          {t("common.play")}
        </MenuItem>
        <MenuItem onClick={handlePlayNext}>
          <Icon name="Forward" />
          {t("common.playNext")}
        </MenuItem>
      </>
    )
  }

  const renderNavigationActions = () => {
    if (!finalTargetPlaylist) return []

    return [
      <MenuItem key="goTo" asChild>
        <SafeLink to="/playlists/$id" params={{ id: finalTargetPlaylist.id.toString() }}>
          <Icon name="ListMusic" />
          {t("common.goToPlaylist")}
        </SafeLink>
      </MenuItem>
    ]
  }

  const renderFormActions = () => {
    if (!finalTargetPlaylist) return []

    return [
      <MenuItem
        key="edit"
        onClick={() => (onEditPlaylist ? onEditPlaylist(finalTargetPlaylist) : setIsEditOpen(true))}
      >
        <Icon name="Edit" />
        {t("form.buttons.update")}
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() =>
          onDeletePlaylist ? onDeletePlaylist(finalTargetPlaylist) : setIsDeleteOpen(true)
        }
      >
        <Icon name="Trash2" />
        {t("form.buttons.delete")}
      </MenuItem>
    ]
  }

  const renderActions = () => {
    const actions = []

    if (hasSongs) {
      actions.push(
        <MenuSub key="addTo">
          <MenuSubTrigger>
            <Icon name="Plus" />
            {t("common.addTo")}
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem onClick={handleAddToQueue}>
              <Icon name="ListMusic" />
              {t("common.queue")}
            </MenuItem>
            <MenuItem onClick={() => setIsAddToPlaylistOpen(true)}>
              <Icon name="ListMusic" />
              {t("common.playlist")}
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
      )
    }

    if (!hasMultipleSelections && finalTargetPlaylist) {
      actions.push(
        <MenuItem
          key="favorite"
          onClick={handleToggleFavorite}
          disabled={toggleFavoriteMutation.isPending}
        >
          <Icon
            name="Heart"
            isFilled={finalTargetPlaylist.isFavorite}
            className={cn(finalTargetPlaylist.isFavorite && "!text-primary")}
          />
          {finalTargetPlaylist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
        </MenuItem>
      )

      const navigationActions = renderNavigationActions()
      if (navigationActions.length > 0) {
        actions.push(...navigationActions)
      }

      const formActions = renderFormActions()
      if (formActions.length > 0) {
        actions.push(...formActions)
      }
    }

    return actions.length > 0 ? actions : null
  }

  const playbackActions = renderPlaybackActions()
  const actionItems = renderActions()
  const hasAnyActions = playbackActions || actionItems

  const MenuContent = variant === "context" ? ContextMenuContent : DropdownMenuContent

  const renderMenuContent = () => (
    <MenuContent>
      {!hasAnyActions ? (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center py-3">
          {t("common.noResultsFound")}
        </Typography>
      ) : (
        <>
          {playbackActions && (
            <>
              <MenuLabel>{t("common.playback")}</MenuLabel>
              {playbackActions}
              {actionItems && <MenuSeparator />}
            </>
          )}
          {actionItems && (
            <>
              <MenuLabel>{t("common.actions")}</MenuLabel>
              {actionItems}
            </>
          )}
        </>
      )}
    </MenuContent>
  )

  const renderContent = () => {
    if (hasMultipleSelections || !shouldFetchPlaylist) {
      if (variant === "context") {
        return (
          <ContextMenu>
            <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
            {renderMenuContent()}
          </ContextMenu>
        )
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {children || (
              <IconButton
                name="MoreHorizontal"
                variant="ghost"
                className={cn(className, "shrink-0")}
                tooltip={t("common.more")}
              />
            )}
          </DropdownMenuTrigger>
          {renderMenuContent()}
        </DropdownMenu>
      )
    }

    if (variant === "context") {
      return (
        <ContextMenu>
          <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
          <AsyncState
            data={finalTargetPlaylist}
            isLoading={isPlaylistLoading}
            isError={isPlaylistError}
            loadingComponent={
              <ContextMenuContent>
                <div className="flex items-center justify-center p-4">
                  <Spinner />
                </div>
              </ContextMenuContent>
            }
            errorComponent={
              <ContextMenuContent>
                <Typography
                  affects={["muted"]}
                  className="flex h-full items-center justify-center py-3"
                >
                  {t("common.noResultsFound")}
                </Typography>
              </ContextMenuContent>
            }
          >
            {renderMenuContent()}
          </AsyncState>
        </ContextMenu>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children || (
            <IconButton
              name="MoreHorizontal"
              variant="ghost"
              className={cn(className, "shrink-0")}
              tooltip={t("common.more")}
            />
          )}
        </DropdownMenuTrigger>
        <AsyncState
          data={finalTargetPlaylist}
          isLoading={isPlaylistLoading}
          isError={isPlaylistError}
          loadingComponent={
            <DropdownMenuContent>
              <div className="flex items-center justify-center p-4">
                <Spinner />
              </div>
            </DropdownMenuContent>
          }
          errorComponent={
            <DropdownMenuContent>
              <Typography
                affects={["muted"]}
                className="flex h-full items-center justify-center py-3"
              >
                {t("common.noResultsFound")}
              </Typography>
            </DropdownMenuContent>
          }
        >
          {renderMenuContent()}
        </AsyncState>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {finalTargetPlaylist && !hasMultipleSelections && (
        <>
          <PlaylistForm
            playlistId={finalTargetPlaylist.id}
            mode="update"
            open={isEditOpen}
            onOpen={setIsEditOpen}
          />
          <DeletePlaylistDialog
            playlist={finalTargetPlaylist}
            open={isDeleteOpen}
            onOpen={setIsDeleteOpen}
          />
        </>
      )}
      <AddToPlaylistForm
        songIds={
          hasMultipleSelections && multipleSongIds
            ? multipleSongIds
            : playlistSongs.length > 0
              ? playlistSongs.map((song) => song.id)
              : []
        }
        open={isAddToPlaylistOpen}
        onOpen={setIsAddToPlaylistOpen}
      />
    </Fragment>
  )
}

export { PlaylistActions }
