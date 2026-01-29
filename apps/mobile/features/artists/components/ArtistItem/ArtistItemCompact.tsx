import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { formatDuration } from "@repo/utils"

import { buttonStyles, Pressable, Text, Thumbnail } from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { type ArtistItemCompactProps } from "./types"

const ArtistItemCompact = memo(function ArtistItemCompact({ artist }: ArtistItemCompactProps) {
  const styles = useStyles(artistItemCompactStyles)

  const buttonStyle = useStyles(buttonStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handlePress = () => {
    router.push(`/artists/${artist.id}`)
  }

  return (
    <ArtistActions variant="context" artistId={artist.id}>
      {({ onLongPress }) => (
        <Pressable
          style={[buttonStyle.button({ variant: "outline" }), styles.container]}
          onPress={handlePress}
          onLongPress={onLongPress}
        >
          <Thumbnail
            fileName={artist.thumbnail}
            placeholderIcon="User"
            containerStyle={styles.thumbnail}
            recyclingKey={String(artist.id)}
          />
          <View style={styles.infoContainer}>
            <Text weight="medium" numberOfLines={1}>
              {artist.name}
            </Text>
            <Text size="xs" color="mutedForeground" numberOfLines={1}>
              {t("common.songsPlayed", { count: artist.totalTracks })}
              {artist.totalDuration > 0 && ` • ${formatDuration(artist.totalDuration, t)}`}
            </Text>
          </View>
          <ArtistActions artistId={artist.id} />
        </Pressable>
      )}
    </ArtistActions>
  )
})

const artistItemCompactStyles = createStyleSheet(({ theme }) => ({
  container: {
    paddingHorizontal: theme.space(2)
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: theme.radius("full")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { ArtistItemCompact }
