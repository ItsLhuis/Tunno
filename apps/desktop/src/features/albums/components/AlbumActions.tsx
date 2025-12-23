import { Fragment, memo, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useDelayedUnmount } from "@hooks/useDelayedUnmount"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchAlbumByIdWithSongsAndArtists } from "../hooks/useFetchAlbumByIdWithSongsAndArtists"

import { useFetchSongIdsByAlbumIds } from "@features/songs/hooks/useFetchSongIdsByAlbumIds"

import { useToggleAlbumFavorite } from "../hooks/useToggleAlbumFavorite"

import { useIsInSidebar, useToggleSidebarItem } from "@features/sidebar/hooks"

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
  ScrollArea,
  Spinner,
  Typography,
  VirtualizedList,
  type VirtualizedListController
} from "@components/ui"

import { AlbumForm } from "../forms/AlbumForm"
import { DeleteAlbumDialog } from "./DeleteAlbumDialog"

import { AddToPlaylistForm } from "@features/playlists/components"

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

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  album: AlbumWithSongsAndArtists | null
  songIds: number[]
}

type AlbumActionsContentProps = {
  albumId?: number
  list?: VirtualizedListController<Album>
  variant: "dropdown" | "context"
  onOpenDialog: (
    type: DialogType,
    album: AlbumWithSongsAndArtists | null,
    songIds: number[]
  ) => void
}

const AlbumActionsContent = memo(
  ({ albumId, list, variant, onOpenDialog }: AlbumActionsContentProps) => {
    const { t } = useTranslation()

    const artistsScrollRef = useRef<HTMLDivElement | null>(null)

    const keyExtractor = useCallback(
      (artist: { artistId: number }) => artist.artistId.toString(),
      []
    )

    const { loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
      useShallow((state) => ({
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue
      }))
    )

    const toggleFavoriteMutation = useToggleAlbumFavorite()
    const toggleSidebarMutation = useToggleSidebarItem()

    const hasMultipleSelections = list && list.selectedIds.length > 1
    const hasSingleSelection = list && list.selectedIds.length === 1
    const shouldFetchAlbum = albumId !== undefined && !hasSingleSelection
    const resolvedAlbumId = albumId ?? (hasSingleSelection ? Number(list.selectedIds[0]) : null)

    const {
      data: fetchedAlbum,
      isLoading,
      isError
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

    const { data: isInSidebar } = useIsInSidebar(
      "album",
      !hasMultipleSelections ? resolvedAlbumId : null
    )

    const targetAlbum: AlbumWithSongsAndArtists | undefined =
      hasMultipleSelections || hasSingleSelection
        ? (list?.data.find((album) => album.id === Number(list.selectedIds[0])) as
            | AlbumWithSongsAndArtists
            | undefined)
        : fetchedAlbum

    const albumSongs = fetchedAlbum?.songs || []
    const hasSongsInSelection = hasMultipleSelections
      ? selectedAlbumIds.some((albumId) => {
          const album = list.data.find((a) => a.id === albumId)
          return album && album.totalTracks > 0
        })
      : false
    const hasSongs =
      albumSongs.length > 0 ||
      (hasSingleSelection && targetAlbum && targetAlbum.totalTracks > 0) ||
      hasSongsInSelection ||
      (hasMultipleSelections && multipleSongIds && multipleSongIds.length > 0)

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlayAlbum = async () => {
      if (hasMultipleSelections && multipleSongIds?.length) {
        await loadTracks(multipleSongIds, 0, "album")
        await play()
      } else if (albumSongs.length > 0) {
        const songIds = albumSongs.map((song) => song.id)
        await loadTracks(songIds, 0, "album", targetAlbum?.id)
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
      if (targetAlbum) {
        await toggleFavoriteMutation.mutateAsync({ id: targetAlbum.id })
      }
    }

    const handleToggleSidebar = async () => {
      if (targetAlbum) {
        await toggleSidebarMutation.mutateAsync({
          entityType: "album",
          entityId: targetAlbum.id,
          name: targetAlbum.name
        })
      }
    }

    const handleOpenPlaylist = () => {
      const ids =
        hasMultipleSelections && multipleSongIds?.length
          ? multipleSongIds
          : albumSongs.length > 0
            ? albumSongs.map((song) => song.id)
            : []
      onOpenDialog("playlist", targetAlbum ?? null, ids)
    }

    if (shouldFetchAlbum && isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner />
        </div>
      )
    }

    if (shouldFetchAlbum && (isError || !targetAlbum)) {
      return (
        <Typography affects={["muted"]} className="flex h-full items-center justify-center p-4">
          {t("common.noResultsFound")}
        </Typography>
      )
    }

    const hasAnyActions = hasSongs || (!hasMultipleSelections && targetAlbum)

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
            <MenuItem onClick={handlePlayAlbum} disabled={isTrackLoading}>
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
        {!hasMultipleSelections && targetAlbum && (
          <Fragment>
            <MenuItem onClick={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                isFilled={targetAlbum.isFavorite}
                className={cn(targetAlbum.isFavorite && "text-primary!")}
              />
              {targetAlbum.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            </MenuItem>
            <MenuItem onClick={handleToggleSidebar} disabled={toggleSidebarMutation.isPending}>
              <Icon name="PanelLeft" />
              {isInSidebar ? t("common.removeFromSidebar") : t("common.addToSidebar")}
            </MenuItem>
            <MenuItem asChild>
              <SafeLink to="/albums/$id" params={{ id: targetAlbum.id.toString() }}>
                <Icon name="Disc" />
                {t("common.goToAlbum")}
              </SafeLink>
            </MenuItem>
            {targetAlbum.artists?.length === 1 && (
              <MenuItem asChild>
                <SafeLink
                  to="/artists/$id"
                  params={{ id: targetAlbum.artists[0].artistId.toString() }}
                >
                  <Icon name="User" />
                  {t("common.goToArtist")}
                </SafeLink>
              </MenuItem>
            )}
            {targetAlbum.artists && targetAlbum.artists.length > 1 && (
              <MenuSub>
                <MenuSubTrigger>
                  <Icon name="User" />
                  {t("common.goToArtist")}
                </MenuSubTrigger>
                <MenuSubContent className="p-0">
                  <ScrollArea className="p-1" ref={artistsScrollRef}>
                    <VirtualizedList
                      scrollRef={artistsScrollRef}
                      data={targetAlbum.artists}
                      keyExtractor={keyExtractor}
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
                      estimateItemHeight={30}
                      containerClassName="max-h-52"
                    />
                  </ScrollArea>
                </MenuSubContent>
              </MenuSub>
            )}
            <MenuItem onClick={() => onOpenDialog("edit", targetAlbum, [])}>
              <Icon name="Edit" />
              {t("form.buttons.update")}
            </MenuItem>
            <MenuItem onClick={() => onOpenDialog("delete", targetAlbum, [])}>
              <Icon name="Trash2" />
              {t("form.buttons.delete")}
            </MenuItem>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

const AlbumActions = memo(
  ({
    albumId,
    list,
    variant = "dropdown",
    children,
    className,
    onEditAlbum,
    onDeleteAlbum
  }: AlbumActionsProps) => {
    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      album: null,
      songIds: []
    })

    const shouldRenderContent = useDelayedUnmount(isOpen)
    const shouldRenderEditDialog = useDelayedUnmount(dialogState.type === "edit")
    const shouldRenderDeleteDialog = useDelayedUnmount(dialogState.type === "delete")
    const shouldRenderPlaylistDialog = useDelayedUnmount(dialogState.type === "playlist")

    const lastValidAlbumRef = useRef<AlbumWithSongsAndArtists | null>(null)
    const lastValidSongIdsRef = useRef<number[]>([])

    useEffect(() => {
      if (dialogState.album) {
        lastValidAlbumRef.current = dialogState.album
      }
    }, [dialogState.album])

    useEffect(() => {
      if (dialogState.songIds.length > 0) {
        lastValidSongIdsRef.current = dialogState.songIds
      }
    }, [dialogState.songIds])

    const handleOpenDialog = useCallback(
      (type: DialogType, album: AlbumWithSongsAndArtists | null, songIds: number[]) => {
        if (type === "edit" && onEditAlbum && album) {
          onEditAlbum(album)
          return
        }

        if (type === "delete" && onDeleteAlbum && album) {
          onDeleteAlbum(album)
          return
        }

        setDialogState({ type, album, songIds })
      },
      [onEditAlbum, onDeleteAlbum]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, album: null, songIds: [] })
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

    const dialogAlbum = dialogState.album ?? lastValidAlbumRef.current
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
              <AlbumActionsContent
                albumId={albumId}
                list={list}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            )}
          </Content>
        </Root>
        {shouldRenderEditDialog && dialogAlbum && (
          <AlbumForm
            albumId={dialogAlbum.id}
            mode="update"
            open={dialogState.type === "edit"}
            onOpen={(open) => !open && closeDialog()}
          />
        )}
        {shouldRenderDeleteDialog && dialogAlbum && (
          <DeleteAlbumDialog
            album={dialogAlbum}
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

export { AlbumActions }
