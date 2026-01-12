import { Fragment, memo, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedUnmount } from "@hooks/useDelayedUnmount"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchArtistByIdWithSongs } from "../hooks/useFetchArtistByIdWithSongs"

import { useFetchSongIdsByArtistIds } from "@features/songs/hooks/useFetchSongIdsByArtistIds"

import { useToggleArtistFavorite } from "../hooks/useToggleArtistFavorite"

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

import { ArtistForm } from "../forms/ArtistForm"
import { DeleteArtistDialog } from "./DeleteArtistDialog"

import { AddToPlaylistForm } from "@features/playlists/forms"

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

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  artist: Artist | null
  songIds: number[]
}

type ArtistActionsContentProps = {
  artistId?: number
  list?: VirtualizedListController<Artist>
  variant: "dropdown" | "context"
  onOpenDialog: (type: DialogType, artist: Artist | null, songIds: number[]) => void
}

const ArtistActionsContent = memo(
  ({ artistId, list, variant, onOpenDialog }: ArtistActionsContentProps) => {
    const { t } = useTranslation()

    const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue
      }))
    )

    const toggleFavoriteMutation = useToggleArtistFavorite()
    const toggleSidebarMutation = useToggleSidebarItem()

    const hasMultipleSelections = list && list.selectedIds.length > 1
    const hasSingleSelection = list && list.selectedIds.length === 1
    const shouldFetchArtist = artistId !== undefined && !hasSingleSelection
    const resolvedArtistId = artistId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

    const {
      data: fetchedArtist,
      isLoading,
      isError
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

    const { data: isInSidebar } = useIsInSidebar(
      "artist",
      !hasMultipleSelections ? resolvedArtistId : null
    )

    const targetArtist: Artist | undefined =
      hasMultipleSelections || hasSingleSelection
        ? list?.data.find((artist) => artist.id === Number(list.selectedIds[0]))
        : fetchedArtist

    const artistSongs = fetchedArtist?.songs?.map((song) => song.song) || []
    const hasSongsInSelection = hasMultipleSelections
      ? selectedArtistIds.some((artistId) => {
          const artist = list.data.find((a) => a.id === artistId)
          return artist && artist.totalTracks > 0
        })
      : false
    const hasSongs =
      artistSongs.length > 0 ||
      (hasSingleSelection && targetArtist && targetArtist.totalTracks > 0) ||
      hasSongsInSelection ||
      (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlayArtist = async () => {
      if (hasMultipleSelections && multipleSongIds?.length) {
        await loadTracks(multipleSongIds, 0, "artist")
        await play()
      } else if (artistSongs.length > 0) {
        const songIds = artistSongs.map((song) => song.id)
        await loadTracks(songIds, 0, "artist", targetArtist?.id)
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
      if (targetArtist) {
        await toggleFavoriteMutation.mutateAsync({ id: targetArtist.id })
      }
    }

    const handleToggleSidebar = async () => {
      if (targetArtist) {
        await toggleSidebarMutation.mutateAsync({
          entityType: "artist",
          entityId: targetArtist.id,
          name: targetArtist.name
        })
      }
    }

    const handleOpenPlaylist = () => {
      const ids =
        hasMultipleSelections && multipleSongIds?.length
          ? multipleSongIds
          : artistSongs.length > 0
            ? artistSongs.map((song) => song.id)
            : []
      onOpenDialog("playlist", targetArtist ?? null, ids)
    }

    if (shouldFetchArtist && isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner />
        </div>
      )
    }

    if (shouldFetchArtist && (isError || !targetArtist)) {
      return (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center p-4">
          {t("common.noResultsFound")}
        </Typography>
      )
    }

    const hasAnyActions = hasSongs || (!hasMultipleSelections && targetArtist)

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
            <MenuItem onClick={handlePlayArtist} disabled={isTrackLoading}>
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
        {!hasMultipleSelections && targetArtist && (
          <Fragment>
            <MenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                isFilled={targetArtist.isFavorite}
                className={cn(targetArtist.isFavorite && "text-primary!")}
              />
              {targetArtist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            </MenuItem>
            <MenuItem onClick={handleToggleSidebar} disabled={toggleSidebarMutation.isPending}>
              <Icon name="PanelLeft" />
              {isInSidebar ? t("common.removeFromSidebar") : t("common.addToSidebar")}
            </MenuItem>
            <MenuItem asChild>
              <SafeLink to="/artists/$id" params={{ id: targetArtist.id.toString() }}>
                <Icon name="User" />
                {t("common.goToArtist")}
              </SafeLink>
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("edit", targetArtist, [])}>
              <Icon name="Edit" />
              {t("form.buttons.update")}
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("delete", targetArtist, [])}>
              <Icon name="Trash2" />
              {t("form.buttons.delete")}
            </MenuItem>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

const ArtistActions = memo(
  ({
    artistId,
    list,
    variant = "dropdown",
    children,
    className,
    onEditArtist,
    onDeleteArtist
  }: ArtistActionsProps) => {
    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      artist: null,
      songIds: []
    })

    const shouldRenderContent = useDelayedUnmount(isOpen)
    const shouldRenderEditDialog = useDelayedUnmount(dialogState.type === "edit")
    const shouldRenderDeleteDialog = useDelayedUnmount(dialogState.type === "delete")
    const shouldRenderPlaylistDialog = useDelayedUnmount(dialogState.type === "playlist")

    const lastValidArtistRef = useRef<Artist | null>(null)
    const lastValidSongIdsRef = useRef<number[]>([])

    useEffect(() => {
      if (dialogState.artist) {
        lastValidArtistRef.current = dialogState.artist
      }
    }, [dialogState.artist])

    useEffect(() => {
      if (dialogState.songIds.length > 0) {
        lastValidSongIdsRef.current = dialogState.songIds
      }
    }, [dialogState.songIds])

    const handleOpenDialog = useCallback(
      (type: DialogType, artist: Artist | null, songIds: number[]) => {
        if (type === "edit" && onEditArtist && artist) {
          onEditArtist(artist)
          return
        }

        if (type === "delete" && onDeleteArtist && artist) {
          onDeleteArtist(artist)
          return
        }

        setDialogState({ type, artist, songIds })
      },
      [onEditArtist, onDeleteArtist]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, artist: null, songIds: [] })
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

    const dialogArtist = dialogState.artist ?? lastValidArtistRef.current
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
              <ArtistActionsContent
                artistId={artistId}
                list={list}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            )}
          </Content>
        </Root>
        {shouldRenderEditDialog && dialogArtist && (
          <ArtistForm
            artistId={dialogArtist.id}
            mode="update"
            open={dialogState.type === "edit"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
        {shouldRenderDeleteDialog && dialogArtist && (
          <DeleteArtistDialog
            artist={dialogArtist}
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

export { ArtistActions }
