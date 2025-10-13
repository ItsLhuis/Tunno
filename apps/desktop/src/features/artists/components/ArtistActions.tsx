import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByArtistIds } from "@features/songs/hooks/useFetchSongsByArtistIds"

import { useFetchArtistById } from "../hooks/useFetchArtistById"

import { useToggleArtistFavorite } from "../hooks/useToggleArtistFavorite"

import { cn } from "@lib/utils"

import { ArtistForm } from "../forms/ArtistForm"
import { DeleteArtistDialog } from "./DeleteArtistDialog"

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

import { type Artist } from "@repo/api"

type ArtistActionsProps = {
  artist?: Artist
  list?: VirtualizedListController<Artist>
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditArtist?: (artist: Artist) => void
  onDeleteArtist?: (artist: Artist) => void
}

const ArtistActions = ({
  artist,
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

  const artistId =
    artist?.id || (list && list.selectedIds.length === 1 ? Number(list.selectedIds[0]) : null)

  const { data: freshArtistData } = useFetchArtistById(artistId)

  const targetArtist =
    freshArtistData ||
    artist ||
    (list && list.selectedIds.length === 1
      ? list.data.find((a) => a.id === Number(list.selectedIds[0]))
      : null)

  const selectedArtistIds =
    list && list.selectedIds.length > 0
      ? list.selectedIds.map((id) => Number(id))
      : targetArtist
        ? [targetArtist.id]
        : undefined

  const { data: artistSongs } = useFetchSongsByArtistIds(selectedArtistIds)

  const handleEditClick = () => {
    if (targetArtist) {
      if (onEditArtist) onEditArtist(targetArtist)
      else setIsEditOpen(true)
    }
  }

  const handleDeleteClick = () => {
    if (targetArtist) {
      if (onDeleteArtist) onDeleteArtist(targetArtist)
      else setIsDeleteOpen(true)
    }
  }

  const handlePlayArtist = async () => {
    if (!artistSongs || artistSongs.length === 0) return
    const songIds = artistSongs.map((song) => song.id)
    await loadTracks(songIds, 0, "artist", selectedArtistIds?.[0])
    await play()
  }

  const handlePlayNext = async () => {
    if (!artistSongs || artistSongs.length === 0) return
    if (artistSongs.length > 0) {
      const songIds = artistSongs.map((song) => song.id)
      await addToQueue(songIds, "next")
    }
  }

  const handleAddToQueue = async () => {
    if (!artistSongs || artistSongs.length === 0) return
    if (artistSongs.length > 0) {
      const songIds = artistSongs.map((song) => song.id)
      await addToQueue(songIds, "end")
    }
  }

  const handleToggleFavorite = async () => {
    if (targetArtist) {
      await toggleFavoriteMutation.mutateAsync({ id: targetArtist.id })
    }
  }

  const renderPlaybackActions = () => (
    <>
      {variant === "context" ? (
        <ContextMenuItem onClick={handlePlayArtist} disabled={isTrackLoading}>
          <Icon name="Play" />
          {t("common.play")}
        </ContextMenuItem>
      ) : (
        <DropdownMenuItem onClick={handlePlayArtist} disabled={isTrackLoading}>
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
    if (!targetArtist) return null

    return (
      <ContextMenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
        <Icon
          name="Heart"
          isFilled={targetArtist.isFavorite}
          className={cn(targetArtist.isFavorite && "!text-primary")}
        />
        {targetArtist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
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
    if (!targetArtist) return null

    return (
      <DropdownMenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
        <Icon
          name="Heart"
          isFilled={targetArtist.isFavorite}
          className={cn(targetArtist.isFavorite && "!text-primary")}
        />
        {targetArtist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
      </DropdownMenuItem>
    )
  }

  const renderNavigationActions = () => {
    if (!targetArtist) return null

    return (
      <ContextMenuItem asChild>
        <SafeLink to="/artists/$id" params={{ id: targetArtist.id.toString() }}>
          <Icon name="User" />
          {t("common.goToArtist")}
        </SafeLink>
      </ContextMenuItem>
    )
  }

  const renderDropdownNavigationActions = () => {
    if (!targetArtist) return null

    return (
      <DropdownMenuItem asChild>
        <SafeLink to="/artists/$id" params={{ id: targetArtist.id.toString() }}>
          <Icon name="User" />
          {t("common.goToArtist")}
        </SafeLink>
      </DropdownMenuItem>
    )
  }

  const renderFormActions = () => {
    if (!targetArtist) return null

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
      {targetArtist && (
        <ArtistForm artist={targetArtist} mode="update" open={isEditOpen} onOpen={setIsEditOpen} />
      )}
      {targetArtist && (
        <DeleteArtistDialog artist={targetArtist} open={isDeleteOpen} onOpen={setIsDeleteOpen} />
      )}
    </Fragment>
  )
}

export { ArtistActions }
