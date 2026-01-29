import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { formatDuration } from "@repo/utils"

import { Pressable, Text, Thumbnail } from "@components/ui"

import { ArtistActions } from "../ArtistActions"

import { type ArtistItemListProps } from "./types"

const ArtistItemList = memo(function ArtistItemList({ artist }: ArtistItemListProps) {
  const styles = useStyles(artistItemListStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handlePress = () => {
    router.push(`/artists/${artist.id}`)
  }

  return (
    <ArtistActions variant="context" artistId={artist.id}>
      {({ onLongPress }) => (
        <Pressable style={styles.container} onPress={handlePress} onLongPress={onLongPress}>
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

const artistItemListStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  thumbnail: {
    borderRadius: theme.radius("full")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { ArtistItemList }
