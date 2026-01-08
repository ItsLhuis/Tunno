import { Fragment, memo, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { View, type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePathname, useRouter } from "expo-router"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useFetchArtistByIdWithSongs } from "../hooks/useFetchArtistByIdWithSongs"

import { useToggleArtistFavorite } from "../hooks/useToggleArtistFavorite"

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

import { DeleteArtistDialog } from "./DeleteArtistDialog"

import { type Artist, type ArtistWithSongs } from "@repo/api"

type ContextMenuRenderProps = {
  onLongPress: (event: GestureResponderEvent) => void
}

type ArtistActionsProps = {
  artistId?: number
  variant?: "dropdown" | "context"
  children?: ReactNode | ((props: ContextMenuRenderProps) => ReactNode)
  onEditArtist?: (artist: Artist) => void
  onDeleteArtist?: (artist: Artist) => void
  stackBehavior?: "push" | "replace"
}

type DialogType = "edit" | "delete" | "playlist" | null

type DialogState = {
  type: DialogType
  artist: ArtistWithSongs | null
}

type ArtistActionsContentProps = {
  artistId?: number
  variant: "dropdown" | "context"
  onOpenDialog: (type: DialogType, artist: ArtistWithSongs | null) => void
}

const ArtistActionsContent = memo(
  ({ artistId, variant, onOpenDialog }: ArtistActionsContentProps) => {
    const styles = useStyles(artistActionsStyles)

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

    const toggleFavoriteMutation = useToggleArtistFavorite()

    const shouldFetchArtist = artistId !== undefined
    const resolvedArtistId = artistId ?? null

    const {
      data: fetchedArtist,
      isLoading,
      isError
    } = useFetchArtistByIdWithSongs(shouldFetchArtist ? resolvedArtistId : null)

    const targetArtist = fetchedArtist

    const artistSongs = fetchedArtist?.songs?.map((s) => s.song) || []
    const hasSongs = artistSongs.length > 0

    const MenuItem = variant === "context" ? ContextMenuItem : DropdownMenuItem
    const MenuLabel = variant === "context" ? ContextMenuLabel : DropdownMenuLabel
    const MenuSeparator = variant === "context" ? ContextMenuSeparator : DropdownMenuSeparator
    const MenuSub = variant === "context" ? ContextMenuSub : DropdownMenuSub
    const MenuSubTrigger = variant === "context" ? ContextMenuSubTrigger : DropdownMenuSubTrigger
    const MenuSubContent = variant === "context" ? ContextMenuSubContent : DropdownMenuSubContent

    const handlePlayArtist = useCallback(async () => {
      if (artistSongs.length > 0) {
        const songIds = artistSongs.map((song) => song.id)
        await loadTracks(songIds, 0, "artist", targetArtist?.id)
        await play()
      }
    }, [artistSongs, loadTracks, play, targetArtist])

    const handlePlayNext = useCallback(async () => {
      if (artistSongs.length > 0) {
        await addToQueue(
          artistSongs.map((song) => song.id),
          "next"
        )
      }
    }, [artistSongs, addToQueue])

    const handleAddToQueue = useCallback(async () => {
      if (artistSongs.length > 0) {
        await addToQueue(
          artistSongs.map((song) => song.id),
          "end"
        )
      }
    }, [artistSongs, addToQueue])

    const handleToggleFavorite = useCallback(async () => {
      if (targetArtist) {
        await toggleFavoriteMutation.mutateAsync({ id: targetArtist.id })
      }
    }, [targetArtist, toggleFavoriteMutation])

    const handleGoToArtist = useCallback(() => {
      if (targetArtist && pathname !== `/artists/${targetArtist.id}`) {
        playerSheetRef?.dismiss()
        router.push(`/artists/${targetArtist.id}`)
      }
    }, [targetArtist, router, pathname, playerSheetRef])

    const handleOpenPlaylist = useCallback(() => {
      if (targetArtist) {
        onOpenDialog("playlist", targetArtist)
      }
    }, [targetArtist, onOpenDialog])

    const handleOpenEdit = useCallback(() => {
      if (targetArtist) {
        playerSheetRef?.dismiss()
        router.push(`/artists/${targetArtist.id}/update`)
      }
    }, [targetArtist, playerSheetRef, router])

    const handleOpenDelete = useCallback(() => {
      if (targetArtist) {
        onOpenDialog("delete", targetArtist)
      }
    }, [targetArtist, onOpenDialog])

    if (shouldFetchArtist && isLoading) {
      return <Spinner />
    }

    if (shouldFetchArtist && (isError || !targetArtist)) {
      return <NotFound style={styles.notFound} />
    }

    return (
      <Fragment>
        {targetArtist && (
          <Fragment>
            <View style={styles.header}>
              <Thumbnail
                fileName={targetArtist.thumbnail}
                placeholderIcon="User"
                containerStyle={styles.thumbnail}
              />
              <View style={styles.headerInfo}>
                <Text weight="medium" numberOfLines={1}>
                  {targetArtist.name}
                </Text>
                <Text size="xs" color="mutedForeground" numberOfLines={1}>
                  {t("common.songsPlayed", { count: targetArtist.totalTracks })}
                </Text>
              </View>
            </View>
            <MenuSeparator />
          </Fragment>
        )}
        {hasSongs && (
          <Fragment>
            <MenuLabel>{t("common.playback")}</MenuLabel>
            <MenuItem onPress={handlePlayArtist} disabled={isTrackLoading}>
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
        {targetArtist && (
          <Fragment>
            <MenuItem onPress={handleToggleFavorite} disabled={toggleFavoriteMutation.isPending}>
              <Icon
                name="Heart"
                size="sm"
                isFilled={targetArtist.isFavorite}
                color={targetArtist.isFavorite ? "primary" : undefined}
              />
              <Text size="sm">
                {targetArtist.isFavorite ? t("common.unfavorite") : t("common.favorite")}
              </Text>
            </MenuItem>
            <MenuItem onPress={handleGoToArtist}>
              <Icon name="User" size="sm" />
              <Text size="sm">{t("common.goToArtist")}</Text>
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

const ArtistActions = memo(
  ({
    artistId,
    variant = "dropdown",
    children,
    onEditArtist,
    onDeleteArtist,
    stackBehavior
  }: ArtistActionsProps) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [dialogState, setDialogState] = useState<DialogState>({
      type: null,
      artist: null
    })

    const lastValidArtistRef = useRef<ArtistWithSongs | null>(null)

    useEffect(() => {
      if (dialogState.artist) {
        lastValidArtistRef.current = dialogState.artist
      }
    }, [dialogState.artist])

    const handleOpenDialog = useCallback(
      (type: DialogType, artist: ArtistWithSongs | null) => {
        if (type === "edit" && onEditArtist && artist) {
          onEditArtist(artist)
          return
        }

        if (type === "delete" && onDeleteArtist && artist) {
          onDeleteArtist(artist)
          return
        }

        if (type === "edit" && artist) {
          router.push(`/artists/${artist.id}/update`)
          return
        }

        setDialogState({ type, artist })
      },
      [onEditArtist, onDeleteArtist, router]
    )

    const closeDialog = useCallback(() => {
      setDialogState({ type: null, artist: null })
    }, [])

    const dialogArtist = dialogState.artist ?? lastValidArtistRef.current

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
              <ArtistActionsContent
                artistId={artistId}
                variant={variant}
                onOpenDialog={handleOpenDialog}
              />
            </ContextMenuContent>
          </ContextMenu>
          {dialogArtist && (
            <DeleteArtistDialog
              artist={dialogArtist}
              open={dialogState.type === "delete"}
              onOpenChange={(open) => !open && closeDialog()}
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
            <ArtistActionsContent
              artistId={artistId}
              variant={variant}
              onOpenDialog={handleOpenDialog}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogArtist && (
          <DeleteArtistDialog
            artist={dialogArtist}
            open={dialogState.type === "delete"}
            onOpenChange={(open) => !open && closeDialog()}
          />
        )}
      </Fragment>
    )
  }
)

const artistActionsStyles = createStyleSheet(({ theme, runtime }) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("sm"),
    paddingVertical: theme.space("sm")
  },
  thumbnail: {
    borderRadius: theme.radius("full")
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

export { ArtistActions }
