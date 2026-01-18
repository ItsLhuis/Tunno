import { Fragment, memo, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { View, type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePathname, useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchPlaylistByIdWithSongs } from "../hooks/useFetchPlaylistByIdWithSongs"

import { useTogglePlaylistFavorite } from "../hooks/useTogglePlaylistFavorite"

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
  NotFound,
  Spinner,
  Text,
  Thumbnail
} from "@components/ui"

import { DeletePlaylistDialog } from "./DeletePlaylistDialog"

import { AddToPlaylistForm } from "@features/playlists/forms"

import { type Playlist, type PlaylistWithSongs } from "@repo/api"

type ContextMenuRenderProps = {
  onLongPress: (event: GestureResponderEvent) => void
}

type PlaylistActionsProps = {
  playlistId?: number
  variant?: "dropdown" | "context"
  children?: ReactNode | ((props: ContextMenuRenderProps) => ReactNode)
  onEditPlaylist?: (playlist: Playlist) => void
  onDeletePlaylist?: (playlist: Playlist) => void
  stackBehavior?: "push" | "replace"
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  playlist: PlaylistWithSongs | null
  songIds: number[]
}

type PlaylistActionsContentProps = {
  playlistId?: number
  variant: "dropdown" | "context"
  onOpenDialog: (type: DialogType, playlist: PlaylistWithSongs | null, songIds: number[]) => void
}

const PlaylistActionsContent = memo(
  ({ playlistId, variant, onOpenDialog }: PlaylistActionsContentProps) => {
    const styles = useStyles(playlistActionsStyles)

    const { t } = useTranslation()

    const router = useRouter()
    const pathname = usePathname()

    const { playerSheetRef, loadTracks, play, isTrackLoading, addToQueue } = usePlayerStore(
      useShallow((state) => ({
        playerSheetRef: state.playerSheetRef,
        loadTracks: state.loadTracks,
        play: state.play,
        isTrackLoading: state.isTrackLoading,
        addToQueue: state.addToQueue
      }))
    )

    const toggleFavoriteMutation = useTogglePlaylistFavorite()

    const shouldFetchPlaylist = playlistId !== undefined
    const resolvedPlaylistId = playlistId ?? null

    const {
      data: fetchedPlaylist,
      isPending,
      isError
    } = useFetchPlaylistByIdWithSongs(shouldFetchPlaylist ? resolvedPlaylistId : null)

    const targetPlaylist = fetchedPlaylist

    const playlistSongs = fetchedPlaylist?.songs?.map((s) => s.song) || []
    const hasSongs = playlistSongs.length > 0

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlayPlaylist = useCallback(async () => {
      if (playlistSongs.length > 0) {
        const songIds = playlistSongs.map((song) => song.id)
        await loadTracks(songIds, 0, "playlist", targetPlaylist?.id)
        await play()
      }
    }, [playlistSongs, loadTracks, play, targetPlaylist])

    const handlePlayNext = useCallback(async () => {
      if (playlistSongs.length > 0) {
        await addToQueue(
          playlistSongs.map((song) => song.id),
          "next"
        )
      }
    }, [playlistSongs, addToQueue])

    const handleAddToQueue = useCallback(async () => {
      if (playlistSongs.length > 0) {
        await addToQueue(
          playlistSongs.map((song) => song.id),
          "end"
        )
      }
    }, [playlistSongs, addToQueue])

    const handleToggleFavorite = useCallback(async () => {
      if (targetPlaylist) {
        await toggleFavoriteMutation.mutateAsync({ id: targetPlaylist.id })
      }
    }, [targetPlaylist, toggleFavoriteMutation])

    const handleGoToPlaylist = useCallback(() => {
      if (targetPlaylist && pathname !== `/playlists/${targetPlaylist.id}`) {
        playerSheetRef?.dismiss()
        router.push(`/playlists/${targetPlaylist.id}`)
      }
    }, [targetPlaylist, router, pathname, playerSheetRef])

    const handleOpenEdit = useCallback(() => {
      if (targetPlaylist) {
        playerSheetRef?.dismiss()
        router.push(`/playlists/${targetPlaylist.id}/update`)
      }
    }, [targetPlaylist, playerSheetRef, router])

    const handleOpenPlaylist = useCallback(() => {
      if (playlistSongs.length > 0) {
        const songIds = playlistSongs.map((song) => song.id)
        onOpenDialog("playlist", targetPlaylist ?? null, songIds)
      }
    }, [playlistSongs, targetPlaylist, onOpenDialog])

    const handleOpenDelete = useCallback(() => {
      if (targetPlaylist) {
        onOpenDialog("delete", targetPlaylist, [])
      }
    }, [targetPlaylist, onOpenDialog])

    if (shouldFetchPlaylist && isPending) {
      return <Spinner />
    }

    if (shouldFetchPlaylist && (isError || !targetPlaylist)) {
      return <NotFound style={styles.notFound} />
    }

    return (
      <Fragment>
        {targetPlaylist && (
          <Fragment>
            <View style={styles.header}>
              <Thumbnail fileName={targetPlaylist.thumbnail} placeholderIcon="ListMusic" />
              <View style={styles.headerInfo}>
                <Text weight="medium" numberOfLines={1}>
                  {targetPlaylist.name}
                </Text>
                <Text size="xs" color="mutedForeground" numberOfLines={1}>
                  {t("common.songsPlayed", { count: targetPlaylist.totalTracks })}
                  {targetPlaylist.totalDuration > 0 && ` • ${targetPlaylist.totalDuration}`}
                </Text>
              </View>
            </View>
            <MenuSeparator />
          </Fragment>
        )}
        {hasSongs && (
          <Fragment>
            <MenuLabel>{t("common.playback")}</MenuLabel>
            <MenuItem onPress={handlePlayPlaylist} disabled={isTrackLoading}>
              <Icon name="Play" size="sm" />
              <Text size="sm">{t("common.play")}</Text>
            </MenuItem>
            <MenuItem onPress={handlePlayNext}>
              <Icon name="ListStart" size="sm" />
              <Text size="sm">{t("common.playNext")}</Text>
            </MenuItem>
            <MenuSeparator />
          </Fragment>
        )}
        <MenuLabel>{t("common.actions")}</MenuLabel>
        {hasSongs && (
          <MenuSub>
            <MenuSubTrigger title={t("common.addTo")}>
              <Icon name="Plus" size="sm" />
              <Text size="sm">{t("common.addTo")}</Text>
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem onPress={handleAddToQueue}>
                <Icon name="ListVideo" size="sm" />
                <Text size="sm">{t("common.queue")}</Text>
              </MenuItem>
              <MenuItem onPress={handleOpenPlaylist}>
                <Icon name="ListMusic" size="sm" />
                <Text size="sm">{t("common.playlist")}</Text>
              </MenuItem>
            </MenuSubContent>
          </MenuSub>
        )}
        {targetPlaylist && (
          <Fragment>
            <MenuItem onPress={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                size="sm"
                isFilled={targetPlaylist.isFavorite}
                color={targetPlaylist.isFavorite ? "primary" : undefined}
              />
              <Text size="sm">
                {targetPlaylist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
              </Text>
            </MenuItem>
            <MenuItem onPress={handleGoToPlaylist}>
              <Icon name="ListMusic" size="sm" />
              <Text size="sm">{t("common.goToPlaylist")}</Text>
            </MenuItem>
            <MenuItem onPress={handleOpenEdit}>
              <Icon name="Pencil" size="sm" />
              <Text size="sm">{t("form.buttons.update")}</Text>
            </MenuItem>
            <MenuItem onPress={handleOpenDelete}>
              <Icon name="Trash2" size="sm" />
              <Text size="sm">{t("form.buttons.delete")}</Text>
            </MenuItem>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

const PlaylistActions = memo(
  ({
    playlistId,
    variant = "dropdown",
    children,
    onEditPlaylist,
    onDeletePlaylist,
    stackBehavior
  }: PlaylistActionsProps) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      playlist: null,
      songIds: []
    })

    const lastValidPlaylistRef = useRef<PlaylistWithSongs | null>(null)
    const lastValidSongIdsRef = useRef<number[]>([])

    useEffect(() => {
      if (dialogState.playlist) {
        lastValidPlaylistRef.current = dialogState.playlist
      }
    }, [dialogState.playlist])

    useEffect(() => {
      if (dialogState.songIds.length > 0) {
        lastValidSongIdsRef.current = dialogState.songIds
      }
    }, [dialogState.songIds])

    const handleOpenDialog = useCallback(
      (type: DialogType, playlist: PlaylistWithSongs | null, songIds: number[]) => {
        if (type === "edit" && onEditPlaylist && playlist) {
          onEditPlaylist(playlist)
          return
        }

        if (type === "delete" && onDeletePlaylist && playlist) {
          onDeletePlaylist(playlist)
          return
        }

        if (type === "edit" && playlist) {
          router.push(`/playlists/${playlist.id}/update`)
          return
        }

        setDialogState({ type, playlist, songIds })
      },
      [onEditPlaylist, onDeletePlaylist, router]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, playlist: null, songIds: [] })
    }, [])

    const dialogPlaylist = dialogState.playlist ?? lastValidPlaylistRef.current
    const dialogSongIds =
      dialogState.songIds.length > 0 ? dialogState.songIds : lastValidSongIdsRef.current

    if (variant === "context") {
      return (
        <Fragment>
          <ContextMenu open={isOpen} onOpenChange={setIsOpen}>
            <ContextMenuTrigger>
              {({ onLongPress }) =>
                typeof children === "function" ? children({ onLongPress }) : children
              }
            </ContextMenuTrigger>
            <ContextMenuContent stackBehavior={stackBehavior}>
              <PlaylistActionsContent
                playlistId={playlistId}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            </ContextMenuContent>
          </ContextMenu>
          {dialogPlaylist && (
            <DeletePlaylistDialog
              playlist={dialogPlaylist}
              open={dialogState.type === "delete"}
              onOpenChange={(open) => !open && closeDialog()}
            />
          )}
          {dialogSongIds.length > 0 && (
            <AddToPlaylistForm
              songIds={dialogSongIds}
              open={dialogState.type === "playlist"}
              onOpen={(open) => !open && closeDialog()}
            />
          )}
        </Fragment>
      )
    }

    const trigger =
      typeof children === "function" ? (
        <IconButton name="Ellipsis" variant="ghost" />
      ) : (
        (children ?? <IconButton name="Ellipsis" variant="ghost" />)
      )

    return (
      <Fragment>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          <DropdownMenuContent stackBehavior={stackBehavior}>
            <PlaylistActionsContent
              playlistId={playlistId}
              variant={variant}
              onOpenDialog={handleOpenDialog}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogPlaylist && (
          <DeletePlaylistDialog
            playlist={dialogPlaylist}
            open={dialogState.type === "delete"}
            onOpenChange={(open) => !open && closeDialog()}
          />
        )}
        {dialogSongIds.length > 0 && (
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

const playlistActionsStyles = createStyleSheet(({ theme, runtime }) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("sm"),
    paddingVertical: theme.space("sm")
  },
  headerInfo: {
    flex: 1,
    gap: theme.space("xs")
  },
  notFound: {
    paddingVertical: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  }
}))

export { PlaylistActions }
