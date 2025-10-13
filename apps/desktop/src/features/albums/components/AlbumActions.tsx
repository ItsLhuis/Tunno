import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByAlbumIds } from "@features/songs/hooks/useFetchSongsByAlbumIds"

import { useFetchAlbumByIdWithAllRelations } from "../hooks/useFetchAlbumByIdWithAllRelations"

import { useFetchAlbumById } from "../hooks/useFetchAlbumById"

import { useToggleAlbumFavorite } from "../hooks/useToggleAlbumFavorite"

import { cn } from "@lib/utils"

import { AlbumForm } from "../forms/AlbumForm"
import { DeleteAlbumDialog } from "./DeleteAlbumDialog"

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
  type VirtualizedListController
} from "@components/ui"

import { type Album } from "@repo/api"

type AlbumActionsProps = {
  album?: Album
  list?: VirtualizedListController<Album>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditAlbum?: (album: Album) => void
  onDeleteAlbum?: (album: Album) => void
}

const AlbumActions = ({
  album,
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

  const albumId =
    album?.id || (list && list.selectedIds.length === 1 ? Number(list.selectedIds[0]) : null)

  const { data: freshAlbumData } = useFetchAlbumById(albumId)

  const targetAlbum =
    freshAlbumData ||
    album ||
    (list && list.selectedIds.length === 1
      ? list.data.find((a) => a.id === Number(list.selectedIds[0]))
      : null)

  const selectedAlbumIds =
    list && list.selectedIds.length > 0
      ? list.selectedIds.map((id) => Number(id))
      : targetAlbum
        ? [targetAlbum.id]
        : undefined

  const { data: albumSongs } = useFetchSongsByAlbumIds(selectedAlbumIds)

  const { data: albumWithArtists } = useFetchAlbumByIdWithAllRelations(targetAlbum?.id)

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
    await loadTracks(songIds, 0, "album", selectedAlbumIds?.[0])
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

  const renderPlaybackActions = () => (
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

  const renderAddToActions = () => (
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
          <Icon name="List" />
          {t("common.playlist")}
        </ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  )

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

  const renderDropdownAddToActions = () => (
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
          <Icon name="List" />
          {t("common.playlist")}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )

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
          <ContextMenuContent>
            <ContextMenuLabel>{t("common.playback")}</ContextMenuLabel>
            {renderPlaybackActions()}
            <ContextMenuSeparator />
            <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
            {renderAddToActions()}
            {renderFavoriteActions()}
            {renderNavigationActions()}
            {renderFormActions()}
          </ContextMenuContent>
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
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("common.playback")}</DropdownMenuLabel>
          {renderPlaybackActions()}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
          {renderDropdownAddToActions()}
          {renderDropdownFavoriteActions()}
          {renderDropdownNavigationActions()}
          {renderFormActions()}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {targetAlbum && albumWithArtists && (
        <AlbumForm
          album={
            {
              ...albumWithArtists,
              artists:
                albumWithArtists.artists?.map((link) => link.artist?.id).filter(Boolean) || []
            } as any
          }
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
