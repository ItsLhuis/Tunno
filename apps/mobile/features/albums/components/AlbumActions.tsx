import { Fragment, memo, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { View, type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePathname, useRouter } from "expo-router"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchAlbumByIdWithSongsAndArtists } from "../hooks/useFetchAlbumByIdWithSongsAndArtists"

import { useToggleAlbumFavorite } from "../hooks/useToggleAlbumFavorite"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuFlashList,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuFlashList,
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

import { DeleteAlbumDialog } from "./DeleteAlbumDialog"

import { AddToPlaylistForm } from "@features/playlists/forms"

import { type Album, type AlbumWithSongsAndArtists } from "@repo/api"

type ContextMenuRenderProps = {
  onLongPress: (event: GestureResponderEvent) => void
}

type AlbumActionsProps = {
  albumId?: number
  variant?: "dropdown" | "context"
  children?: ReactNode | ((props: ContextMenuRenderProps) => ReactNode)
  onEditAlbum?: (album: Album) => void
  onDeleteAlbum?: (album: Album) => void
  stackBehavior?: "push" | "replace"
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  album: AlbumWithSongsAndArtists | null
  songIds: number[]
}

type AlbumActionsContentProps = {
  albumId?: number
  variant: "dropdown" | "context"
  onOpenDialog: (
    type: DialogType,
    album: AlbumWithSongsAndArtists | null,
    songIds: number[]
  ) => void
}

const AlbumActionsContent = memo(({ albumId, variant, onOpenDialog }: AlbumActionsContentProps) => {
  const styles = useStyles(albumActionsStyles)

  const { t } = useTranslation()

  const router = useRouter()
  const pathname = usePathname()

  const playerSheetRef = usePlayerStore((state) => state.playerSheetRef)
  const isTrackLoading = usePlayerStore((state) => state.isTrackLoading)
  const loadTracks = usePlayerStore((state) => state.loadTracks)
  const play = usePlayerStore((state) => state.play)
  const addToQueue = usePlayerStore((state) => state.addToQueue)

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const shouldFetchAlbum = albumId !== undefined
  const resolvedAlbumId = albumId ?? null

  const {
    data: fetchedAlbum,
    isPending,
    isError
  } = useFetchAlbumByIdWithSongsAndArtists(shouldFetchAlbum ? resolvedAlbumId : null)

  const targetAlbum = fetchedAlbum

  const albumSongs = fetchedAlbum?.songs || []
  const hasSongs = albumSongs.length > 0

  const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
  const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
  const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
  const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
  const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
  const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent
  const MenuFlashList = variant === "context" ? ContextMenuFlashList : DropdownMenuFlashList

  const handlePlayAlbum = useCallback(async () => {
    if (albumSongs.length > 0) {
      const songIds = albumSongs.map((song) => song.id)
      await loadTracks(songIds, 0, "album", targetAlbum?.id)
      await play()
    }
  }, [albumSongs, loadTracks, play, targetAlbum])

  const handlePlayNext = useCallback(async () => {
    if (albumSongs.length > 0) {
      await addToQueue(
        albumSongs.map((song) => song.id),
        "next"
      )
    }
  }, [albumSongs, addToQueue])

  const handleAddToQueue = useCallback(async () => {
    if (albumSongs.length > 0) {
      await addToQueue(
        albumSongs.map((song) => song.id),
        "end"
      )
    }
  }, [albumSongs, addToQueue])

  const handleToggleFavorite = useCallback(async () => {
    if (targetAlbum) {
      await toggleFavoriteMutation.mutateAsync({ id: targetAlbum.id })
    }
  }, [targetAlbum, toggleFavoriteMutation])

  const handleGoToAlbum = useCallback(() => {
    if (targetAlbum && pathname !== `/albums/${targetAlbum.id}`) {
      playerSheetRef?.dismiss()
      router.push(`/albums/${targetAlbum.id}`)
    }
  }, [targetAlbum, router, pathname, playerSheetRef])

  const handleGoToArtist = useCallback(
    (artistId: number) => {
      if (pathname !== `/artists/${artistId}`) {
        playerSheetRef?.dismiss()
        router.push(`/artists/${artistId}`)
      }
    },
    [router, pathname, playerSheetRef]
  )

  const handleOpenPlaylist = useCallback(() => {
    if (targetAlbum && albumSongs.length > 0) {
      const songIds = albumSongs.map((song) => song.id)
      onOpenDialog("playlist", targetAlbum, songIds)
    }
  }, [targetAlbum, albumSongs, onOpenDialog])

  const handleOpenEdit = useCallback(() => {
    if (targetAlbum) {
      playerSheetRef?.dismiss()
      router.push(`/albums/${targetAlbum.id}/update`)
    }
  }, [targetAlbum, playerSheetRef, router])

  const handleOpenDelete = useCallback(() => {
    if (targetAlbum) {
      onOpenDialog("delete", targetAlbum, [])
    }
  }, [targetAlbum, onOpenDialog])

  const artistKeyExtractor = useCallback(
    (item: NonNullable<typeof targetAlbum>["artists"][0]) => item.artistId.toString(),
    []
  )

  const renderArtistItem = useCallback(
    ({ item: artist }: { item: NonNullable<typeof targetAlbum>["artists"][0] }) => (
      <MenuItem title={artist.artist.name} onPress={() => handleGoToArtist(artist.artistId)} />
    ),
    [handleGoToArtist]
  )

  if (shouldFetchAlbum && isPending) {
    return <Spinner />
  }

  if (shouldFetchAlbum && (isError || !targetAlbum)) {
    return <NotFound style={styles.notFound} />
  }

  return (
    <Fragment>
      {targetAlbum && (
        <Fragment>
          <View style={styles.header}>
            <Thumbnail fileName={targetAlbum.thumbnail} placeholderIcon="Disc" />
            <View style={styles.headerInfo}>
              <Text weight="medium" numberOfLines={1}>
                {targetAlbum.name}
              </Text>
              <Text size="xs" color="mutedForeground" numberOfLines={1}>
                {targetAlbum.artists.length > 0
                  ? targetAlbum.artists.map((a) => a.artist.name).join(", ")
                  : t("common.unknownArtist")}
              </Text>
            </View>
          </View>
          <MenuSeparator />
        </Fragment>
      )}
      {hasSongs && (
        <Fragment>
          <MenuLabel>{t("common.playback")}</MenuLabel>
          <MenuItem onPress={handlePlayAlbum} disabled={isTrackLoading}>
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
      {targetAlbum && (
        <Fragment>
          <MenuItem onPress={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
            <Icon
              name="Heart"
              size="sm"
              isFilled={targetAlbum.isFavorite}
              color={targetAlbum.isFavorite ? "primary" : undefined}
            />
            <Text size="sm">
              {targetAlbum.isFavorite ? t("common.unfavorite") : t("common.favorite")}
            </Text>
          </MenuItem>
          <MenuItem onPress={handleGoToAlbum}>
            <Icon name="Disc" size="sm" />
            <Text size="sm">{t("common.goToAlbum")}</Text>
          </MenuItem>
          {targetAlbum.artists?.length === 1 && (
            <MenuItem onPress={() => handleGoToArtist(targetAlbum.artists![0].artistId)}>
              <Icon name="User" size="sm" />
              <Text size="sm">{t("common.goToArtist")}</Text>
            </MenuItem>
          )}
          {targetAlbum.artists && targetAlbum.artists.length > 1 && (
            <MenuSub>
              <MenuSubTrigger title={t("common.goToArtist")}>
                <Icon name="User" size="sm" />
                <Text size="sm">{t("common.goToArtist")}</Text>
              </MenuSubTrigger>
              <MenuSubContent scrollable>
                <MenuFlashList
                  data={targetAlbum.artists}
                  keyExtractor={artistKeyExtractor}
                  renderItem={renderArtistItem}
                />
              </MenuSubContent>
            </MenuSub>
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
})

const AlbumActions = memo(
  ({
    albumId,
    variant = "dropdown",
    children,
    onEditAlbum,
    onDeleteAlbum,
    stackBehavior
  }: AlbumActionsProps) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      album: null,
      songIds: []
    })

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

        if (type === "edit" && album) {
          router.push(`/albums/${album.id}/update`)
          return
        }

        setDialogState({ type, album, songIds })
      },
      [onEditAlbum, onDeleteAlbum, router]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, album: null, songIds: [] })
    }, [])

    const dialogAlbum = dialogState.album ?? lastValidAlbumRef.current
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
              <AlbumActionsContent
                albumId={albumId}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            </ContextMenuContent>
          </ContextMenu>
          {dialogAlbum && (
            <DeleteAlbumDialog
              album={dialogAlbum}
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
            <AlbumActionsContent
              albumId={albumId}
              variant={variant}
              onOpenDialog={handleOpenDialog}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogAlbum && (
          <DeleteAlbumDialog
            album={dialogAlbum}
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

const albumActionsStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { AlbumActions }
