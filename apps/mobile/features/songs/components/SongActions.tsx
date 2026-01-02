import { Fragment, memo, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { View, type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePathname, useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"
import { useRemoveSongsFromPlaylist } from "@features/playlists/hooks/useRemoveSongsFromPlaylist"

import { useFetchSongByIdWithMainRelations } from "../hooks/useFetchSongByIdWithMainRelations"
import { useToggleSongFavorite } from "../hooks/useToggleSongFavorite"

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

import { DeleteSongDialog } from "./DeleteSongDialog"

import { State } from "react-native-track-player"

import { type SongWithMainRelations } from "@repo/api"

type ContextMenuRenderProps = {
  onLongPress: (event: GestureResponderEvent) => void
}

type SongActionsProps = {
  songId?: number
  variant?: "dropdown" | "context"
  children?: ReactNode | ((props: ContextMenuRenderProps) => ReactNode)
  onEditSong?: (song: SongWithMainRelations) => void
  onDeleteSong?: (song: SongWithMainRelations) => void
  queueIndex?: number
  playlistId?: number
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  song: SongWithMainRelations | null
}

type SongActionsContentProps = {
  songId?: number
  variant: "dropdown" | "context"
  queueIndex?: number
  playlistId?: number
  onOpenDialog: (type: DialogType, song: SongWithMainRelations | null) => void
}

const SongActionsContent = memo(
  ({ songId, variant, queueIndex, playlistId, onOpenDialog }: SongActionsContentProps) => {
    const styles = useStyles(songActionsStyles)

    const { t } = useTranslation()

    const router = useRouter()
    const pathname = usePathname()

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
    const removeFromPlaylistMutation = useRemoveSongsFromPlaylist()

    const shouldFetchSong = songId !== undefined
    const resolvedSongId = songId ?? null

    const {
      data: fetchedSong,
      isLoading,
      isError
    } = useFetchSongByIdWithMainRelations(shouldFetchSong ? resolvedSongId : null)

    const targetSong = fetchedSong

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlaySong = useCallback(async () => {
      if (targetSong) {
        if (currentTrack?.id === targetSong.id) {
          playbackState === State.Playing ? await pause() : await play()
          return
        }
        await loadTracks([targetSong.id], 0, "songs")
        await play()
      }
    }, [targetSong, currentTrack, playbackState, pause, play, loadTracks])

    const handlePlayNext = useCallback(async () => {
      if (targetSong) {
        await addToQueue(targetSong.id, "next")
      }
    }, [targetSong, addToQueue])

    const handleAddToQueue = useCallback(async () => {
      if (targetSong) {
        await addToQueue(targetSong.id, "end")
      }
    }, [targetSong, addToQueue])

    const handleToggleFavorite = useCallback(async () => {
      if (targetSong) {
        await toggleFavoriteMutation.mutateAsync({ id: targetSong.id })
      }
    }, [targetSong, toggleFavoriteMutation])

    const handleRemoveFromQueue = useCallback(async () => {
      if (queueIndex !== undefined) {
        await removeFromQueue(queueIndex)
      }
    }, [queueIndex, removeFromQueue])

    const handleRemoveFromPlaylist = useCallback(async () => {
      if (playlistId && targetSong) {
        await removeFromPlaylistMutation.mutateAsync({
          playlistId,
          songIds: [targetSong.id]
        })
      }
    }, [playlistId, targetSong, removeFromPlaylistMutation])

    const handleGoToSong = useCallback(() => {
      if (targetSong && pathname !== `/songs/${targetSong.id}`) {
        router.push(`/songs/${targetSong.id}`)
      }
    }, [targetSong, router, pathname])

    const handleGoToAlbum = useCallback(() => {
      if (targetSong?.album && pathname !== `/albums/${targetSong.album.id}`) {
        // router.push(`/albums/${targetSong.album.id}`)
      }
    }, [targetSong, router, pathname])

    const handleGoToArtist = useCallback(
      (artistId: number) => {
        if (pathname !== `/artists/${artistId}`) {
          // router.push(`/artists/${artistId}`)
        }
      },
      [router, pathname]
    )

    const handleOpenPlaylist = useCallback(() => {
      if (targetSong) {
        onOpenDialog("playlist", targetSong)
      }
    }, [targetSong, onOpenDialog])

    const handleOpenEdit = useCallback(() => {
      if (targetSong) {
        onOpenDialog("edit", targetSong)
      }
    }, [targetSong, onOpenDialog])

    const handleOpenDelete = useCallback(() => {
      if (targetSong) {
        onOpenDialog("delete", targetSong)
      }
    }, [targetSong, onOpenDialog])

    const isCurrentlyPlaying = targetSong
      ? currentTrack?.id === targetSong.id && playbackState === State.Playing
      : false

    if (shouldFetchSong && isLoading) {
      return <Spinner />
    }

    if (shouldFetchSong && (isError || !targetSong)) {
      return <NotFound style={styles.notFound} />
    }

    const artistsText = targetSong
      ? targetSong.artists.length > 0
        ? targetSong.artists.map((a) => a.artist.name).join(", ")
        : t("common.unknownArtist")
      : ""

    return (
      <Fragment>
        {targetSong && (
          <Fragment>
            <View style={styles.header}>
              <Thumbnail fileName={targetSong.thumbnail} placeholderIcon="Music" />
              <View style={styles.headerInfo}>
                <Text weight="medium" numberOfLines={1}>
                  {targetSong.name}
                </Text>
                <Text size="xs" color="mutedForeground" numberOfLines={1}>
                  {artistsText}
                </Text>
              </View>
            </View>
            <MenuSeparator />
          </Fragment>
        )}
        <MenuLabel>{t("common.playback")}</MenuLabel>
        <MenuItem onPress={handlePlaySong} disabled={isTrackLoading}>
          <Icon name={isCurrentlyPlaying ? "Pause" : "Play"} size="sm" />
          <Text size="sm">{isCurrentlyPlaying ? t("common.pause") : t("common.play")}</Text>
        </MenuItem>
        <MenuItem onPress={handlePlayNext}>
          <Icon name="ListStart" size="sm" />
          <Text size="sm">{t("common.playNext")}</Text>
        </MenuItem>
        <MenuSeparator />
        <MenuLabel>{t("common.actions")}</MenuLabel>
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
        {targetSong && (
          <Fragment>
            <MenuItem onPress={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                size="sm"
                isFilled={targetSong.isFavorite}
                color={targetSong.isFavorite ? "primary" : undefined}
              />
              <Text size="sm">
                {targetSong.isFavorite ? t("common.unfavorite") : t("common.favorite")}
              </Text>
            </MenuItem>
            <MenuItem onPress={handleGoToSong}>
              <Icon name="Music" size="sm" />
              <Text size="sm">{t("common.goToSong")}</Text>
            </MenuItem>
            {targetSong.album && (
              <MenuItem onPress={handleGoToAlbum}>
                <Icon name="Disc" size="sm" />
                <Text size="sm">{t("common.goToAlbum")}</Text>
              </MenuItem>
            )}
            {targetSong.artists?.length === 1 && (
              <MenuItem onPress={() => handleGoToArtist(targetSong.artists![0].artistId)}>
                <Icon name="User" size="sm" />
                <Text size="sm">{t("common.goToArtist")}</Text>
              </MenuItem>
            )}
            {targetSong.artists && targetSong.artists.length > 1 && (
              <MenuSub>
                <MenuSubTrigger title={t("common.goToArtist")}>
                  <Icon name="User" size="sm" />
                  <Text size="sm">{t("common.goToArtist")}</Text>
                </MenuSubTrigger>
                <MenuSubContent>
                  {targetSong.artists.map((artist) => (
                    <MenuItem
                      key={artist.artistId}
                      onPress={() => handleGoToArtist(artist.artistId)}
                    >
                      <Icon name="User" size="sm" />
                      <Text size="sm" numberOfLines={1}>
                        {artist.artist.name}
                      </Text>
                    </MenuItem>
                  ))}
                </MenuSubContent>
              </MenuSub>
            )}
            {queueIndex !== undefined && (
              <MenuItem onPress={handleRemoveFromQueue}>
                <Icon name="ListX" size="sm" />
                <Text size="sm">{t("common.removeFromQueue")}</Text>
              </MenuItem>
            )}
            {playlistId !== undefined && (
              <MenuItem
                onPress={handleRemoveFromPlaylist}
                disabled={removeFromPlaylistMutation.isPending}
              >
                <Icon name="ListMusic" size="sm" />
                <Text size="sm">{t("common.removeFromPlaylist")}</Text>
              </MenuItem>
            )}
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

const SongActions = memo(
  ({
    songId,
    variant = "dropdown",
    children,
    onEditSong,
    onDeleteSong,
    queueIndex,
    playlistId
  }: SongActionsProps) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      song: null
    })

    const lastValidSongRef = useRef<SongWithMainRelations | null>(null)

    useEffect(() => {
      if (dialogState.song) {
        lastValidSongRef.current = dialogState.song
      }
    }, [dialogState.song])

    const handleOpenDialog = useCallback(
      (type: DialogType, song: SongWithMainRelations | null) => {
        if (type === "edit" && onEditSong && song) {
          onEditSong(song)
          return
        }

        if (type === "delete" && onDeleteSong && song) {
          onDeleteSong(song)
          return
        }

        if (type === "edit" && song) {
          router.push(`/songs/${song.id}/update`)
          return
        }

        setDialogState({ type, song })
      },
      [onEditSong, onDeleteSong, router]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, song: null })
    }, [])

    const dialogSong = dialogState.song ?? lastValidSongRef.current

    if (variant === "context") {
      return (
        <Fragment>
          <ContextMenu open={isOpen} onOpenChange={setIsOpen}>
            <ContextMenuTrigger>
              {({ onLongPress }) =>
                typeof children === "function" ? children({ onLongPress }) : children
              }
            </ContextMenuTrigger>
            <ContextMenuContent>
              <SongActionsContent
                songId={songId}
                variant={variant}
                queueIndex={queueIndex}
                playlistId={playlistId}
                onOpenDialog={handleOpenDialog}
              />
            </ContextMenuContent>
          </ContextMenu>
          {dialogSong && (
            <DeleteSongDialog
              song={dialogSong}
              open={dialogState.type === "delete"}
              onOpenChange={(open) => !open && closeDialog()}
            />
          )}
          {/* AddToPlaylistForm will be added when playlists feature is implemented */}
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
          <DropdownMenuContent>
            <SongActionsContent
              songId={songId}
              variant={variant}
              queueIndex={queueIndex}
              playlistId={playlistId}
              onOpenDialog={handleOpenDialog}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogSong && (
          <DeleteSongDialog
            song={dialogSong}
            open={dialogState.type === "delete"}
            onOpenChange={(open) => !open && closeDialog()}
          />
        )}
        {/* AddToPlaylistForm will be added when playlists feature is implemented */}
      </Fragment>
    )
  }
)

const songActionsStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { SongActions }
