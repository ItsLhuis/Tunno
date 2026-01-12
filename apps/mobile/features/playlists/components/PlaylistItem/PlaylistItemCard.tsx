import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { formatDuration } from "@repo/utils"

import { Pressable, Text, Thumbnail } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { type PlaylistItemCardProps } from "./types"

const PlaylistItemCard = memo(({ playlist }: PlaylistItemCardProps) => {
  const styles = useStyles(playlistItemCardStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handlePress = () => {
    router.push(`/playlists/${playlist.id}`)
  }

  return (
    <PlaylistActions variant="context" playlistId={playlist.id}>
      {({ onLongPress }) => (
        <Pressable style={styles.container} onPress={handlePress} onLongPress={onLongPress}>
          <Thumbnail
            fileName={playlist.thumbnail}
            placeholderIcon="ListMusic"
            containerStyle={styles.thumbnail}
          />
          <View style={styles.infoRow}>
            <View style={styles.infoContainer}>
              <Text weight="medium" numberOfLines={1}>
                {playlist.name}
              </Text>
              <Text size="xs" color="mutedForeground" numberOfLines={1}>
                {t("common.songsPlayed", { count: playlist.totalTracks })}
                {playlist.totalDuration > 0 && ` • ${formatDuration(playlist.totalDuration, t)}`}
              </Text>
            </View>
            <PlaylistActions playlistId={playlist.id} />
          </View>
        </Pressable>
      )}
    </PlaylistActions>
  )
})

const playlistItemCardStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "column",
    gap: theme.space("sm")
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: theme.radius()
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { PlaylistItemCard }
