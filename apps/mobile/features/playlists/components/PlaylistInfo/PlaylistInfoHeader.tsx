import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { useTogglePlaylistFavorite } from "../../hooks/useTogglePlaylistFavorite"

import { formatDuration } from "@repo/utils"

import {
  Badge,
  DominantColorGradient,
  IconButton,
  LargeHeader,
  Text,
  Thumbnail
} from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"
import { PlaylistStatsSheet } from "./PlaylistStatsSheet"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoHeaderProps = {
  playlist: PlaylistWithAllRelations
  songIds: number[]
}

const PlaylistInfoHeader = ({ playlist, songIds }: PlaylistInfoHeaderProps) => {
  const styles = useStyles(playlistInfoHeaderStyles)

  const { t } = useTranslation()

  const isShuffling = usePlayerStore((state) => state.isShuffling)
  const shuffleAndPlay = usePlayerStore((state) => state.shuffleAndPlay)

  const handleShuffleAndPlay = () => {
    if (isShuffling || songIds.length === 0) return
    shuffleAndPlay(songIds, "playlist", playlist.id)
  }

  const toggleFavoriteMutation = useTogglePlaylistFavorite()

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate({ id: playlist.id })
  }

  return (
    <LargeHeader style={styles.container}>
      <DominantColorGradient thumbnail={playlist.thumbnail} />
      <View style={styles.content}>
        <Thumbnail
          fileName={playlist.thumbnail}
          placeholderIcon="ListMusic"
          containerStyle={styles.thumbnail}
        />
        <View style={styles.infoContainer}>
          <Badge variant="muted" title={t("common.playlist")} style={styles.badge} />
          <Text variant="h1" numberOfLines={2}>
            {playlist.name}
          </Text>
          <View style={styles.metaContainer}>
            <Text size="sm" color="mutedForeground" numberOfLines={1}>
              {t("common.songsPlayed", { count: playlist.totalTracks })}
              {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
            </Text>
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
          isFilled={playlist.isFavorite}
          variant="text"
          disabled={toggleFavoriteMutation.isPending}
          onPress={handleToggleFavorite}
        />
        <PlaylistStatsSheet playlist={playlist} />
        <PlaylistActions playlistId={playlist.id} />
      </View>
    </LargeHeader>
  )
}

const playlistInfoHeaderStyles = createStyleSheet(({ theme }) => ({
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

export { PlaylistInfoHeader }
