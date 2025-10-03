import { Fragment, type ReactNode, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

import { useFetchSongsByArtistIds } from "@features/songs/hooks/useFetchSongsByArtistIds"

import { ArtistForm } from "../forms/ArtistForm"
import { DeleteArtistDialog } from "./DeleteArtistDialog"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  IconButton
} from "@components/ui"

import { type Artist } from "@repo/api"

type ArtistActionsProps = {
  artist?: Artist
  variant?: "dropdown" | "context"
  children?: ReactNode
  className?: string
  onEditArtist?: (artist: Artist) => void
  onDeleteArtist?: (artist: Artist) => void
}

const ArtistActions = ({
  artist,
  variant = "dropdown",
  children,
  className,
  onEditArtist,
  onDeleteArtist
}: ArtistActionsProps) => {
  const { t } = useTranslation()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: artistSongs } = useFetchSongsByArtistIds(artist ? [artist.id] : undefined)

  const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
    useShallow((state) => ({
      loadTracks: state.loadTracks,
      play: state.play,
      isTrackLoading: state.isTrackLoading,
      addToQueue: state.addToQueue
    }))
  )

  const handleEditClick = () => {
    if (artist) {
      if (onEditArtist) onEditArtist(artist)
      else setIsEditOpen(true)
    }
  }

  const handleDeleteClick = () => {
    if (artist) {
      if (onDeleteArtist) onDeleteArtist(artist)
      else setIsDeleteOpen(true)
    }
  }

  const handlePlayArtist = async () => {
    if (!artist || !artistSongs || artistSongs.length === 0) return
    const songIds = artistSongs.map((song) => song.id)
    await loadTracks(songIds, 0, "artist", artist.id)
    await play()
  }

  const handlePlayNext = async () => {
    if (!artist || !artistSongs || artistSongs.length === 0) return
    if (artistSongs.length > 0) await addToQueue(artistSongs, "next")
  }

  const handleAddToQueue = async () => {
    if (!artist || !artistSongs || artistSongs.length === 0) return
    if (artistSongs.length > 0) await addToQueue(artistSongs, "end")
  }

  const renderFormActions = () => {
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

  const renderAddToActions = () =>
    variant === "context" ? (
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
    ) : (
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

  const renderContent = () => {
    if (variant === "context") {
      return (
        <ContextMenu>
          <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>{t("common.playback")}</ContextMenuLabel>
            {renderPlaybackActions()}
            <ContextMenuLabel>{t("common.actions")}</ContextMenuLabel>
            {renderAddToActions()}
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
          <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
          {renderAddToActions()}
          {renderFormActions()}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Fragment>
      {renderContent()}
      {artist && (
        <ArtistForm artist={artist} mode="update" open={isEditOpen} onOpen={setIsEditOpen} />
      )}
      {artist && (
        <DeleteArtistDialog artist={artist} open={isDeleteOpen} onOpen={setIsDeleteOpen} />
      )}
    </Fragment>
  )
}

export { ArtistActions }
