import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchAlbumByIdWithSongsAndArtists } from "../hooks/useFetchAlbumByIdWithSongsAndArtists"

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
  Spinner,
  type VirtualizedListController
} from "@components/ui"

import { type Album } from "@repo/api"

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

  const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      addToQueue: state.addToQueue
    }))
  )

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const resolvedAlbumId =
    albumId || (list && list.selectedIds.length === 1 ? Number(list.selectedIds[0]) : null)

  const {
    data: targetAlbum,
    isLoading: isAlbumLoading,
    isError: isAlbumError
  } = useFetchAlbumByIdWithSongsAndArtists(resolvedAlbumId)

  const albumSongs = targetAlbum?.songs || []

  const handleEditClick = () => {
    if (targetAlbum) {
      if (onEditAlbum) onEditAlbum(targetAlbum)
      else setIsEditOpen(true)
    }
  }

  const handleDeleteClick = () => {
    if (targetAlbum) {
      if (onDeleteAlbum) onDeleteAlbum(targetAlbum)
      else setIsDeleteOpen(true)
    }
  }

  const handlePlayAlbum = async () => {
    if (!albumSongs || albumSongs.length === 0) return
    const songIds = albumSongs.map((song) => song.id)
    await loadTracks(songIds, 0, "album", targetAlbum?.id)
    await play()
  }

  const handlePlayNext = async () => {
    if (!albumSongs || albumSongs.length === 0) return
    if (albumSongs.length > 0) {
      const songIds = albumSongs.map((song) => song.id)
      await addToQueue(songIds, "next")
    }
  }

  const handleAddToQueue = async () => {
    if (!albumSongs || albumSongs.length === 0) return
    if (albumSongs.length > 0) {
      const songIds = albumSongs.map((song) => song.id)
      await addToQueue(songIds, "end")
    }
  }

  const handleToggleFavorite = async () => {
    if (targetAlbum) {
      await toggleFavoriteMutation.mutateAsync({ id: targetAlbum.id })
    }
  }

  const renderPlaybackActions = () => {
    if (!albumSongs || albumSongs.length === 0) return null

    return (
      <>
        {variant === "context" ? (
          <ContextMenuItem onClick={handlePlayAlbum} disabled={isTrackLoading}>
            <Icon name="Play" />
            {t("common.play")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem onClick={handlePlayAlbum} disabled={isTrackLoading}>
            <Icon name="Play" />
            {t("common.play")}
          </DropdownMenuItem>
        )}
        {variant === "context" ? (
          <ContextMenuItem onClick={handlePlayNext}>
            <Icon name="Forward" />
            {t("common.playNext")}
          </ContextMenuItem>
        ) : (
          <DropdownMenuItem onClick={handlePlayNext}>
            <Icon name="Forward" />
            {t("common.playNext")}
          </DropdownMenuItem>
        )}
      </>
    )
  }

  const renderAddToActions = () => {
    if (!albumSongs || albumSongs.length === 0) return null

    return (
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Icon name="Plus" />
          {t("common.addTo")}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={handleAddToQueue}>
            <Icon name="ListMusic" />
            {t("common.queue")}
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon name="ListMusic" />
            {t("common.playlist")}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    )
  }

  const renderFavoriteActions = () => {
    if (!targetAlbum) return null

    return (
      <ContextMenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
        <Icon
          name="Heart"
          isFilled={targetAlbum.isFavorite}
          className={cn(targetAlbum.isFavorite && "!text-primary")}
        />
        {targetAlbum.isFavorite ? t("common.unfavorite") : t("common.favorite")}
      </ContextMenuItem>
    )
  }

  const renderDropdownAddToActions = () => {
    if (!albumSongs || albumSongs.length === 0) return null

    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Icon name="Plus" />
          {t("common.addTo")}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={handleAddToQueue}>
            <Icon name="ListMusic" />
            {t("common.queue")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="ListMusic" />
            {t("common.playlist")}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }

  const renderDropdownFavoriteActions = () => {
    if (!targetAlbum) return null

    return (
      <DropdownMenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
        <Icon
          name="Heart"
          isFilled={targetAlbum.isFavorite}
          className={cn(targetAlbum.isFavorite && "!text-primary")}
        />
        {targetAlbum.isFavorite ? t("common.unfavorite") : t("common.favorite")}
      </DropdownMenuItem>
    )
  }

  const renderNavigationActions = () => {
    if (!targetAlbum) return null

    return (
      <ContextMenuItem asChild>
        <SafeLink to="/albums/$id" params={{ id: targetAlbum.id.toString() }}>
          <Icon name="Disc" />
          {t("common.goToAlbum")}
        </SafeLink>
      </ContextMenuItem>
    )
  }

  const renderDropdownNavigationActions = () => {
    if (!targetAlbum) return null

    return (
      <DropdownMenuItem asChild>
        <SafeLink to="/albums/$id" params={{ id: targetAlbum.id.toString() }}>
          <Icon name="Disc" />
          {t("common.goToAlbum")}
        </SafeLink>
      </DropdownMenuItem>
    )
  }

  const renderFormActions = () => {
    if (!targetAlbum) return null

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
          <AsyncState
            data={targetAlbum}
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
                <div className="flex items-center justify-center p-4">{t`common.error`}</div>
              </ContextMenuContent>
            }
          >
            {() => (
              <ContextMenuContent>
                {albumSongs && albumSongs.length > 0 && (
                  <>
                    <ContextMenuLabel>{t("common.playback")}</ContextMenuLabel>
                    {renderPlaybackActions()}
                    <ContextMenuSeparator />
                  </>
                )}
                <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
                {renderAddToActions()}
                {renderFavoriteActions()}
                {renderNavigationActions()}
                {renderFormActions()}
              </ContextMenuContent>
            )}
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
          data={targetAlbum}
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
              <div className="flex items-center justify-center p-4">{t`common.error`}</div>
            </DropdownMenuContent>
          }
        >
          {() => (
            <DropdownMenuContent>
              {albumSongs && albumSongs.length > 0 && (
                <>
                  <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
                  {renderPlaybackActions()}
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
              {renderDropdownAddToActions()}
              {renderDropdownFavoriteActions()}
              {renderDropdownNavigationActions()}
              {renderFormActions()}
            </DropdownMenuContent>
          )}
        </AsyncState>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {targetAlbum && (
        <AlbumForm
          albumId={targetAlbum.id}
          mode="update"
          open={isEditOpen}
          onOpen={setIsEditOpen}
        />
      )}
      {targetAlbum && (
        <DeleteAlbumDialog album={targetAlbum} open={isDeleteOpen} onOpen={setIsDeleteOpen} />
      )}
    </Fragment>
  )
}

export { AlbumActions }
