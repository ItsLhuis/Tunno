import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchArtistByIdWithSongs } from "../hooks/useFetchArtistByIdWithSongs"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

import { useToggleArtistFavorite } from "../hooks/useToggleArtistFavorite"

import { cn } from "@lib/utils"

import { ArtistForm } from "../forms/ArtistForm"
import { DeleteArtistDialog } from "./DeleteArtistDialog"

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
  type VirtualizedListController
} from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistActionsProps = {
  artistId?: number
  list?: VirtualizedListController<Artist>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditArtist?: (artist: Artist) => void
  onDeleteArtist?: (artist: Artist) => void
}

const ArtistActions = ({
  artistId,
  list,
  variant = "dropdown",
  children,
  className,
  onEditArtist,
  onDeleteArtist
}: ArtistActionsProps) => {
  const { t } = useTranslation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      addToQueue: state.addToQueue
    }))
  )

  const toggleFavoriteMutation = useToggleArtistFavorite()

  const hasMultipleSelections = list && list.selectedIds.length > 1
  const hasSingleSelection = list && list.selectedIds.length === 1
  const shouldFetchArtist = artistId !== undefined && !hasSingleSelection
  const resolvedArtistId = artistId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

  const {
    data: targetArtist,
    isLoading: isArtistLoading,
    isError: isArtistError
  } = useFetchArtistByIdWithSongs(shouldFetchArtist ? resolvedArtistId : null)

  const selectedArtistIds = hasMultipleSelections ? list.selectedIds.map((id) => Number(id)) : []
  const artistsWithSongs = hasMultipleSelections
    ? selectedArtistIds.filter((artistId) => {
        const artist = list.data.find((a) => a.id === artistId)
        return artist && artist.totalTracks > 0
      })
    : []
  const { data: multipleSongIds } = useFetchSongIdsByArtistIds(
    hasMultipleSelections ? artistsWithSongs : null
  )

  const finalTargetArtist =
    hasMultipleSelections || hasSingleSelection
      ? list.data.find((artist) => artist.id === Number(list.selectedIds[0]))
      : targetArtist

  const artistSongs = targetArtist?.songs?.map((song) => song.song) || []
  const hasSongsInSelection = hasMultipleSelections
    ? selectedArtistIds.some((artistId) => {
        const artist = list.data.find((a) => a.id === artistId)
        return artist && artist.totalTracks > 0
      })
    : false
  const hasSongs =
    artistSongs.length > 0 ||
    hasSongsInSelection ||
    (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

  const handleEditClick = () => {
    if (finalTargetArtist) {
      if (onEditArtist) onEditArtist(finalTargetArtist)
      else setIsEditOpen(true)
    }
  }

  const handleDeleteClick = () => {
    if (finalTargetArtist) {
      if (onDeleteArtist) onDeleteArtist(finalTargetArtist)
      else setIsDeleteOpen(true)
    }
  }

  const handlePlayArtist = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await loadTracks(multipleSongIds, 0, "artist")
      await play()
    } else if (artistSongs.length > 0) {
      const songIds = artistSongs.map((song) => song.id)
      await loadTracks(songIds, 0, "artist", finalTargetArtist?.id)
      await play()
    }
  }

  const handlePlayNext = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await addToQueue(multipleSongIds, "next")
    } else if (artistSongs.length > 0) {
      await addToQueue(
        artistSongs.map((song) => song.id),
        "next"
      )
    }
  }

  const handleAddToQueue = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await addToQueue(multipleSongIds, "end")
    } else if (artistSongs.length > 0) {
      await addToQueue(
        artistSongs.map((song) => song.id),
        "end"
      )
    }
  }

  const handleToggleFavorite = async () => {
    if (finalTargetArtist) {
      await toggleFavoriteMutation.mutateAsync({ id: finalTargetArtist.id })
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
        <MenuItem onClick={handlePlayArtist} disabled={isTrackLoading}>
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
    if (!finalTargetArtist) return []

    return [
      <MenuItem key="goTo" asChild>
        <SafeLink to="/artists/$id" params={{ id: finalTargetArtist.id.toString() }}>
          <Icon name="User" />
          {t("common.goToArtist")}
        </SafeLink>
      </MenuItem>
    ]
  }

  const renderFormActions = () => {
    if (!finalTargetArtist) return []

    return [
      <MenuItem key="edit" onClick={handleEditClick}>
        <Icon name="Edit" />
        {t("form.buttons.update")}
      </MenuItem>,
      <MenuItem key="delete" onClick={handleDeleteClick}>
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
            <MenuItem>
              <Icon name="ListMusic" />
              {t("common.playlist")}
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
      )
    }

    if (!hasMultipleSelections && finalTargetArtist) {
      actions.push(
        <MenuItem
          key="favorite"
          onClick={handleToggleFavorite}
          disabled={toggleFavoriteMutation.isPending}
        >
          <Icon
            name="Heart"
            isFilled={finalTargetArtist.isFavorite}
            className={cn(finalTargetArtist.isFavorite && "!text-primary")}
          />
          {finalTargetArtist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
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
        <div className="flex items-center justify-center p-4">{t("common.noResultsFound")}</div>
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
    if (hasMultipleSelections || !shouldFetchArtist) {
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
                className={className}
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
            data={finalTargetArtist}
            isLoading={isArtistLoading}
            isError={isArtistError}
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
            {() => renderMenuContent()}
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
              className={className}
              tooltip={t("common.more")}
            />
          )}
        </DropdownMenuTrigger>
        <AsyncState
          data={finalTargetArtist}
          isLoading={isArtistLoading}
          isError={isArtistError}
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
          {() => renderMenuContent()}
        </AsyncState>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {finalTargetArtist && !hasMultipleSelections && (
        <>
          <ArtistForm
            artistId={finalTargetArtist.id}
            mode="update"
            open={isEditOpen}
            onOpen={setIsEditOpen}
          />
          <DeleteArtistDialog
            artist={finalTargetArtist}
            open={isDeleteOpen}
            onOpen={setIsDeleteOpen}
          />
        </>
      )}
    </Fragment>
  )
}

export { ArtistActions }
