import { Fragment, type ReactNode, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchAlbumByIdWithSongsAndArtists } from "../hooks/useFetchAlbumByIdWithSongsAndArtists"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

import { useToggleAlbumFavorite } from "../hooks/useToggleAlbumFavorite"

import { cn } from "@lib/utils"

import { AlbumForm } from "../forms/AlbumForm"
import { DeleteAlbumDialog } from "./DeleteAlbumDialog"

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

import { type Album, type AlbumWithSongsAndArtists } from "@repo/api"

type AlbumActionsProps = {
  albumId?: number
  list?: VirtualizedListController<Album>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditAlbum?: (album: Album) => void
  onDeleteAlbum?: (album: Album) => void
}

const AlbumActions = ({
  albumId,
  list,
  variant = "dropdown",
  children,
  className,
  onEditAlbum,
  onDeleteAlbum
}: AlbumActionsProps) => {
  const { t } = useTranslation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const artistsScrollRef = useRef<HTMLDivElement | null>(null)

  const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      addToQueue: state.addToQueue
    }))
  )

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const hasMultipleSelections = list && list.selectedIds.length > 1
  const hasSingleSelection = list && list.selectedIds.length === 1
  const shouldFetchAlbum = albumId !== undefined && !hasSingleSelection
  const resolvedAlbumId = albumId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

  const {
    data: targetAlbum,
    isLoading: isAlbumLoading,
    isError: isAlbumError
  } = useFetchAlbumByIdWithSongsAndArtists(shouldFetchAlbum ? resolvedAlbumId : null)

  const selectedAlbumIds = hasMultipleSelections ? list.selectedIds.map((id) => Number(id)) : []
  const albumsWithSongs = hasMultipleSelections
    ? selectedAlbumIds.filter((albumId) => {
        const album = list.data.find((a) => a.id === albumId)
        return album && album.totalTracks > 0
      })
    : []
  const { data: multipleSongIds } = useFetchSongIdsByAlbumIds(
    hasMultipleSelections ? albumsWithSongs : null
  )

  const finalTargetAlbum =
    hasMultipleSelections || hasSingleSelection
      ? (list.data.find((album) => album.id === Number(list.selectedIds[0])) as
          | AlbumWithSongsAndArtists
          | undefined)
      : (targetAlbum as AlbumWithSongsAndArtists | undefined)

  const albumSongs = targetAlbum?.songs || []
  const hasSongsInSelection = hasMultipleSelections
    ? selectedAlbumIds.some((albumId) => {
        const album = list.data.find((a) => a.id === albumId)
        return album && album.totalTracks > 0
      })
    : false
  const hasSongs =
    albumSongs.length > 0 ||
    hasSongsInSelection ||
    (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

  const handlePlayAlbum = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await loadTracks(multipleSongIds, 0, "album")
      await play()
    } else if (albumSongs.length > 0) {
      const songIds = albumSongs.map((song) => song.id)
      await loadTracks(songIds, 0, "album", finalTargetAlbum?.id)
      await play()
    }
  }

  const handlePlayNext = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await addToQueue(multipleSongIds, "next")
    } else if (albumSongs.length > 0) {
      await addToQueue(
        albumSongs.map((song) => song.id),
        "next"
      )
    }
  }

  const handleAddToQueue = async () => {
    if (hasMultipleSelections && multipleSongIds?.length) {
      await addToQueue(multipleSongIds, "end")
    } else if (albumSongs.length > 0) {
      await addToQueue(
        albumSongs.map((song) => song.id),
        "end"
      )
    }
  }

  const handleToggleFavorite = async () => {
    if (finalTargetAlbum) {
      await toggleFavoriteMutation.mutateAsync({ id: finalTargetAlbum.id })
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
        <MenuItem onClick={handlePlayAlbum} disabled={isTrackLoading}>
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
    if (!finalTargetAlbum) return []

    const actions = [
      <MenuItem key="goToAlbum" asChild>
        <SafeLink to="/albums/$id" params={{ id: finalTargetAlbum.id.toString() }}>
          <Icon name="Disc" />
          {t("common.goToAlbum")}
        </SafeLink>
      </MenuItem>
    ]

    if (finalTargetAlbum.artists?.length === 1) {
      actions.push(
        <MenuItem key="goToArtist" asChild>
          <SafeLink
            to="/artists/$id"
            params={{ id: finalTargetAlbum.artists?.[0]?.artistId.toString() }}
          >
            <Icon name="User" />
            {t("common.goToArtist")}
          </SafeLink>
        </MenuItem>
      )
    }

    if (finalTargetAlbum.artists?.length > 1) {
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
                data={finalTargetAlbum.artists || []}
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

  const renderFormActions = () => {
    if (!finalTargetAlbum) return []

    return [
      <MenuItem
        key="edit"
        onClick={() => (onEditAlbum ? onEditAlbum(finalTargetAlbum) : setIsEditOpen(true))}
      >
        <Icon name="Edit" />
        {t("form.buttons.update")}
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => (onDeleteAlbum ? onDeleteAlbum(finalTargetAlbum) : setIsDeleteOpen(true))}
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
            <MenuItem>
              <Icon name="ListMusic" />
              {t("common.playlist")}
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
      )
    }

    if (!hasMultipleSelections && finalTargetAlbum) {
      actions.push(
        <MenuItem
          key="favorite"
          onClick={handleToggleFavorite}
          disabled={toggleFavoriteMutation.isPending}
        >
          <Icon
            name="Heart"
            isFilled={finalTargetAlbum.isFavorite}
            className={cn(finalTargetAlbum.isFavorite && "!text-primary")}
          />
          {finalTargetAlbum.isFavorite ? t("common.unfavorite") : t("common.favorite")}
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
    if (hasMultipleSelections || !shouldFetchAlbum) {
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
            data={finalTargetAlbum}
            isLoading={isAlbumLoading}
            isError={isAlbumError}
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
          data={finalTargetAlbum}
          isLoading={isAlbumLoading}
          isError={isAlbumError}
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
      {finalTargetAlbum && !hasMultipleSelections && (
        <>
          <AlbumForm
            albumId={finalTargetAlbum.id}
            mode="update"
            open={isEditOpen}
            onOpen={setIsEditOpen}
          />
          <DeleteAlbumDialog
            album={finalTargetAlbum}
            open={isDeleteOpen}
            onOpen={setIsDeleteOpen}
          />
        </>
      )}
    </Fragment>
  )
}

export { AlbumActions }
