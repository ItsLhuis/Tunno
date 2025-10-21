import { Fragment, memo, type ReactNode, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../stores/usePlayerStore"

import { useFetchSongByIdWithMainRelations } from "../hooks/useFetchSongByIdWithMainRelations"

import { useToggleSongFavorite } from "../hooks/useToggleSongFavorite"

import { cn } from "@lib/utils"

import { State } from "react-track-player-web"

import { SongForm } from "../forms/SongForm"
import { DeleteSongDialog } from "./DeleteSongDialog"

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
  ScrollArea,
  Spinner,
  Typography,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

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
}

const SongActions = memo(
  ({
    songId,
    list,
    variant = "dropdown",
    children,
    className,
    onEditSong,
    onDeleteSong,
    queueIndex
  }: SongActionsProps) => {
    const { t } = useTranslation()

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const artistsScrollRef = useRef<HTMLDivElement | null>(null)

    const {
      loadTracks,
      play,
      pause,
      currentTrack,
      playbackState,
      isTrackLoading,
      addToQueue,
      removeFromQueue
    } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        pause: state.pause,
        currentTrack: state.currentTrack,
        playbackState: state.playbackState,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue,
        removeFromQueue: state.removeFromQueue
      }))
    )

    const toggleFavoriteMutation = useToggleSongFavorite()

    const hasMultipleSelections = list && list.selectedIds.length > 1
    const hasSingleSelection = list && list.selectedIds.length === 1
    const shouldFetchSong = songId !== undefined && !hasSingleSelection
    const resolvedSongId = songId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

    const {
      data: targetSong,
      isLoading: isSongLoading,
      isError: isSongError
    } = useFetchSongByIdWithMainRelations(shouldFetchSong ? resolvedSongId : null)

    const finalTargetSong =
      hasMultipleSelections || hasSingleSelection
        ? list.data.find((song) => song.id === Number(list.selectedIds[0]))
        : targetSong

    const handlePlaySong = async () => {
      if (finalTargetSong && !hasMultipleSelections) {
        if (
          currentTrack &&
          currentTrack.id === finalTargetSong.id &&
          playbackState === State.Playing
        ) {
          await pause()
          return
        }

        if (
          currentTrack &&
          currentTrack.id === finalTargetSong.id &&
          playbackState === State.Paused
        ) {
          await play()
          return
        }

        await loadTracks([finalTargetSong.id], 0, "songs")
        await play()
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedIds = list.selectedIds.map((id) => Number(id))
        await loadTracks(selectedIds, 0, "songs")
        await play()
      }
    }

    const handlePlayNext = async () => {
      if (finalTargetSong) {
        await addToQueue([finalTargetSong.id], "next")
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedIds = list.selectedIds.map((id) => Number(id))
        await addToQueue(selectedIds, "next")
      }
    }

    const handleAddToQueue = async () => {
      if (finalTargetSong) {
        await addToQueue([finalTargetSong.id], "end")
        return
      }

      if (list && list.selectedIds.length > 0) {
        const selectedIds = list.selectedIds.map((id) => Number(id))
        await addToQueue(selectedIds, "end")
      }
    }

    const handleToggleFavorite = async () => {
      if (finalTargetSong) {
        await toggleFavoriteMutation.mutateAsync({ id: finalTargetSong.id })
      }
    }

    const isCurrentlyPlaying = finalTargetSong
      ? currentTrack?.id === finalTargetSong.id && playbackState === State.Playing
      : false

    const handleEditClick = () => {
      if (finalTargetSong) {
        if (onEditSong) {
          onEditSong(finalTargetSong)
        } else {
          setIsEditOpen(true)
        }
      }
    }

    const handleDeleteClick = () => {
      if (finalTargetSong) {
        if (onDeleteSong) {
          onDeleteSong(finalTargetSong)
        } else {
          setIsDeleteOpen(true)
        }
      }
    }

    const handleRemoveFromQueue = async () => {
      if (queueIndex !== undefined && queueIndex !== null) {
        await removeFromQueue(queueIndex)
      }
    }

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const renderPlaybackActions = () => {
      if (hasMultipleSelections) {
        return (
          <>
            <MenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
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

      return (
        <>
          <MenuItem onClick={handlePlaySong} disabled={isTrackLoading}>
            <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} />
            {isCurrentlyPlaying ? t("common.pause") : t("common.play")}
          </MenuItem>
          <MenuItem onClick={handlePlayNext}>
            <Icon name="Forward" />
            {t("common.playNext")}
          </MenuItem>
        </>
      )
    }

    const renderNavigationActions = () => {
      if (!finalTargetSong) return []

      const actions = [
        <MenuItem key="goToSong" asChild>
          <SafeLink to="/songs/$id" params={{ id: finalTargetSong.id.toString() }}>
            <Icon name="Music" />
            {t("common.goToSong")}
          </SafeLink>
        </MenuItem>
      ]

      if (finalTargetSong.album) {
        actions.push(
          <MenuItem key="goToAlbum" asChild>
            <SafeLink to="/albums/$id" params={{ id: finalTargetSong.album.id.toString() }}>
              <Icon name="Disc" />
              {t("common.goToAlbum")}
            </SafeLink>
          </MenuItem>
        )
      }

      if (finalTargetSong.artists?.length === 1) {
        actions.push(
          <MenuItem key="goToArtist" asChild>
            <SafeLink
              to="/artists/$id"
              params={{ id: finalTargetSong.artists?.[0]?.artistId.toString() }}
            >
              <Icon name="User" />
              {t("common.goToArtist")}
            </SafeLink>
          </MenuItem>
        )
      }

      if (finalTargetSong.artists?.length > 1) {
        actions.push(
          <MenuSub key="goToArtists">
            <MenuSubTrigger>
              <Icon name="User" />
              {t("common.goToArtist")}
            </MenuSubTrigger>
            <MenuSubContent className="p-0">
              <ScrollArea className="p-1" ref={artistsScrollRef}>
                <VirtualizedList
                  scrollRef={artistsScrollRef}
                  data={finalTargetSong.artists || []}
                  keyExtractor={(artist) => artist.artistId.toString()}
                  renderItem={({ item: artist }) => (
                    <MenuItem asChild>
                      <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                        <Icon name="User" />
                        <Typography className="line-clamp-none truncate">
                          {artist.artist.name}
                        </Typography>
                      </SafeLink>
                    </MenuItem>
                  )}
                  estimateItemHeight={32}
                  containerClassName="max-h-52"
                />
              </ScrollArea>
            </MenuSubContent>
          </MenuSub>
        )
      }

      return actions
    }

    const renderActions = () => {
      const actions = []

      actions.push(
        <MenuSub key="addTo">
          <MenuSubTrigger>
            <Icon name="Plus" />
            {t("common.addTo")}
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem onClick={handleAddToQueue}>
              <Icon name="ListVideo" />
              {t("common.queue")}
            </MenuItem>
            <MenuItem>
              <Icon name="ListMusic" />
              {t("common.playlist")}
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
      )

      if (!hasMultipleSelections && finalTargetSong) {
        actions.push(
          <MenuItem
            key="favorite"
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
          >
            <Icon
              name="Heart"
              isFilled={finalTargetSong.isFavorite}
              className={cn(finalTargetSong.isFavorite && "!text-primary")}
            />
            {finalTargetSong.isFavorite ? t("common.unfavorite") : t("common.favorite")}
          </MenuItem>
        )

        const navigationActions = renderNavigationActions()
        if (navigationActions.length > 0) {
          actions.push(...navigationActions)
        }

        if (queueIndex !== undefined && queueIndex !== null) {
          actions.push(
            <MenuItem key="removeFromQueue" onClick={handleRemoveFromQueue}>
              <Icon name="ListX" />
              {t("common.removeFromQueue")}
            </MenuItem>
          )
        }

        actions.push(
          <MenuItem key="edit" onClick={handleEditClick}>
            <Icon name="Edit" />
            {t("form.buttons.update")}
          </MenuItem>,
          <MenuItem key="delete" onClick={handleDeleteClick}>
            <Icon name="Trash2" />
            {t("form.buttons.delete")}
          </MenuItem>
        )
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
      if (hasMultipleSelections || !shouldFetchSong) {
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
              data={finalTargetSong}
              isLoading={isSongLoading}
              isError={isSongError}
              loadingComponent={
                <ContextMenuContent>
                  <div className="flex items-center justify-center p-4">
                    <Spinner />
                  </div>
                </ContextMenuContent>
              }
              errorComponent={
                <ContextMenuContent>
                  <div className="flex items-center justify-center p-4">
                    {t("common.noResultsFound")}
                  </div>
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
            data={finalTargetSong}
            isLoading={isSongLoading}
            isError={isSongError}
            loadingComponent={
              <DropdownMenuContent>
                <div className="flex items-center justify-center p-4">
                  <Spinner />
                </div>
              </DropdownMenuContent>
            }
            errorComponent={
              <DropdownMenuContent>
                <div className="flex items-center justify-center p-4">
                  {t("common.noResultsFound")}
                </div>
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
        {finalTargetSong && !hasMultipleSelections && (
          <>
            <SongForm
              songId={finalTargetSong.id}
              mode="update"
              open={isEditOpen}
              onOpen={setIsEditOpen}
            />
            <DeleteSongDialog song={finalTargetSong} open={isDeleteOpen} onOpen={setIsDeleteOpen} />
          </>
        )}
      </Fragment>
    )
  }
)

export { SongActions }
