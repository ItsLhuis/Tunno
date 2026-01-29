import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useRouter } from "expo-router"

import { useToggleAlbumFavorite } from "../../hooks/useToggleAlbumFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  IconButton,
  LargeHeader,
  Pressable,
  Text,
  Thumbnail
} from "@components/ui"

import { AlbumActions } from "../AlbumActions"
import { AlbumStatsSheet } from "./AlbumStatsSheet"

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumInfoHeaderProps = {
  album: AlbumWithAllRelations
  songIds: number[]
}

const AlbumInfoHeader = ({ album, songIds }: AlbumInfoHeaderProps) => {
  const styles = useStyles(albumInfoHeaderStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "album", album.id)
  }

  const toggleFavoriteMutation = useToggleAlbumFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: album.id })
  }

  const handleArtistPress = (artistId: number) => {
    router.push(`/artists/${artistId}`)
  }

  return (
    <LargeHeader style={styles.container}>
      <DominantColorGradient thumbnail={album.thumbnail} />
      <View style={styles.content}>
        <Thumbnail
          fileName={album.thumbnail}
          placeholderIcon="Disc"
          containerStyle={styles.thumbnail}
        />
        <View style={styles.infoContainer}>
          <Badge
            variant="muted"
            title={t(`albums.filters.${album.albumType}`)}
            style={styles.badge}
          />
          <Text variant="h1" numberOfLines={2}>
            {album.name}
          </Text>
          <View style={styles.metaContainer}>
            {album.artists.length > 0 ? (
              <Pressable
                containerStyle={styles.pressableContainer}
                onPress={() => handleArtistPress(album.artists[0].artistId)}
              >
                <Text size="sm" numberOfLines={1}>
                  {album.artists[0].artist.name}
                </Text>
              </Pressable>
            ) : (
              <Text size="sm" color="mutedForeground" numberOfLines={1}>
                {t("common.unknownArtist")}
              </Text>
            )}
            {(album.releaseYear || album.totalDuration > 0) && (
              <Text size="sm" color="mutedForeground">
                {album.releaseYear}
                {album.releaseYear && album.totalDuration > 0 && " • "}
                {album.totalDuration > 0 && formatDuration(album.totalDuration, t)}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <IconButton
          name="Shuffle"
          isLoading={isShuffling}
          style={styles.shuffleButton}
          iconSize="2xl"
          onPress={handleShuffleAndPlay}
          disabled={songIds.length === 0}
        />
        <IconButton
          name="Heart"
          isFilled={album.isFavorite}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onPress={handleToggleFavorite}
        />
        <AlbumStatsSheet album={album} />
        <AlbumActions albumId={album.id} />
      </View>
    </LargeHeader>
  )
}

const albumInfoHeaderStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.space("lg"),
    paddingHorizontal: theme.space("lg")
  },
  content: {
    flexDirection: "column",
    gap: theme.space("lg")
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: theme.radius("lg")
  },
  infoContainer: {
    gap: theme.space("sm")
  },
  badge: {
    alignSelf: "flex-start"
  },
  metaContainer: {
    gap: theme.space("xs")
  },
  pressableContainer: {
    alignSelf: "flex-start"
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.space()
  },
  shuffleButton: {
    width: theme.size(14),
    height: theme.size(14),
    borderRadius: theme.radius("full")
  }
}))

export { AlbumInfoHeader }
