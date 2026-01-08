import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useToggleArtistFavorite } from "../../hooks/useToggleArtistFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  IconButton,
  LargeHeader,
  Text,
  Thumbnail
} from "@components/ui"

import { ArtistActions } from "../ArtistActions"
import { ArtistStatsSheet } from "./ArtistStatsSheet"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistInfoHeaderProps = {
  artist: ArtistWithAllRelations
  songIds: number[]
}

const ArtistInfoHeader = ({ artist, songIds }: ArtistInfoHeaderProps) => {
  const styles = useStyles(artistInfoHeaderStyles)

  const { t } = useTranslation()

  const { shuffleAndPlay, isShuffling } = usePlayerStore(
    useShallow((state) => ({
      shuffleAndPlay: state.shuffleAndPlay,
      isShuffling: state.isShuffling
    }))
  )

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "artist", artist.id)
  }

  const toggleFavoriteMutation = useToggleArtistFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: artist.id })
  }

  return (
    <LargeHeader style={styles.container}>
      <DominantColorGradient thumbnail={artist.thumbnail} />
      <View style={styles.content}>
        <Thumbnail
          fileName={artist.thumbnail}
          placeholderIcon="User"
          containerStyle={styles.thumbnail}
        />
        <View style={styles.infoContainer}>
          <Badge variant="muted" title={t("common.artist")} style={styles.badge} />
          <Text variant="h1" numberOfLines={2}>
            {artist.name}
          </Text>
          <View style={styles.metaContainer}>
            <Text size="sm" color="mutedForeground" numberOfLines={1}>
              {t("common.songsPlayed", { count: artist.totalTracks })}
            </Text>
            {artist.totalDuration > 0 && (
              <Text size="sm" color="mutedForeground">
                {formatDuration(artist.totalDuration, t)}
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
          isFilled={artist.isFavorite}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onPress={handleToggleFavorite}
        />
        <ArtistStatsSheet artist={artist} />
        <ArtistActions artistId={artist.id} />
      </View>
    </LargeHeader>
  )
}

const artistInfoHeaderStyles = createStyleSheet(({ theme }) => ({
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
    borderRadius: theme.radius("full")
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

export { ArtistInfoHeader }
