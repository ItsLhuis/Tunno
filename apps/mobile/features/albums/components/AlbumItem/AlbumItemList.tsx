import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useRouter } from "expo-router"

import { formatDuration } from "@repo/utils"

import { Pressable, Text, Thumbnail } from "@components/ui"

import { AlbumActions } from "../AlbumActions"

import { type AlbumItemListProps } from "./types"

const AlbumItemList = memo(({ album }: AlbumItemListProps) => {
  const styles = useStyles(albumItemListStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const handlePress = () => {
    router.push(`/albums/${album.id}`)
  }

  return (
    <AlbumActions variant="context" albumId={album.id}>
      {({ onLongPress }) => (
        <Pressable style={styles.container} onPress={handlePress} onLongPress={onLongPress}>
          <Thumbnail
            fileName={album.thumbnail}
            placeholderIcon="Disc"
            recyclingKey={String(album.id)}
          />
          <View style={styles.infoContainer}>
            <Text weight="medium" numberOfLines={1}>
              {album.name}
            </Text>
            <Text size="xs" color="mutedForeground" numberOfLines={1}>
              {t("common.songsPlayed", { count: album.totalTracks })}
              {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
            </Text>
          </View>
          <AlbumActions albumId={album.id} />
        </Pressable>
      )}
    </AlbumActions>
  )
})

const albumItemListStyles = createStyleSheet(({ theme }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { AlbumItemList }
