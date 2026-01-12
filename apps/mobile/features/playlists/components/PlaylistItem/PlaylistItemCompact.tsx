import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { formatDuration } from "@repo/utils"

import { buttonStyles, Pressable, Text, Thumbnail } from "@components/ui"

import { PlaylistActions } from "../PlaylistActions"

import { type PlaylistItemCompactProps } from "./types"

const PlaylistItemCompact = memo(({ playlist }: PlaylistItemCompactProps) => {
  const styles = useStyles(playlistItemCompactStyles)

  const buttonStyle = useStyles(buttonStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handlePress = () => {
    router.push(`/playlists/${playlist.id}`)
  }

  return (
    <PlaylistActions variant="context" playlistId={playlist.id}>
      {({ onLongPress }) => (
        <Pressable
          style={[buttonStyle.button({ variant: "outline" }), styles.container]}
          onPress={handlePress}
          onLongPress={onLongPress}
        >
          <Thumbnail
            fileName={playlist.thumbnail}
            placeholderIcon="ListMusic"
            containerStyle={styles.thumbnail}
          />
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
        </Pressable>
      )}
    </PlaylistActions>
  )
})

const playlistItemCompactStyles = createStyleSheet(({ theme }) => ({
  container: {
    paddingHorizontal: theme.space(2)
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: theme.radius("sm")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { PlaylistItemCompact }
