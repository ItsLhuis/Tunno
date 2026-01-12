import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, ScopedPalette, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useAlbumPlayback } from "./hooks"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import { formatDuration } from "@repo/utils"

import {
  AnimatedBackground,
  AnimatedBadge,
  AnimatedButton,
  AnimatedText,
  Thumbnail
} from "@components/ui"

import { type AlbumItemFeaturedProps } from "./types"

const AlbumItemFeatured = memo(({ album }: AlbumItemFeaturedProps) => {
  const styles = useStyles(albumItemFeaturedStyles)

  const { t } = useTranslation()

  const thumbnailUri = useThumbnailUri({ fileName: album.thumbnail })

  const { palette } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const { songIds, isShuffling, handleShuffleAndPlay } = useAlbumPlayback(album.id)

  const canPlay = songIds && songIds.length > 0

  return (
    <View style={styles.container}>
      <ScopedPalette palette={palette}>
        <AnimatedBackground
          style={styles.background}
          colorKey={thumbnailUri ? "background" : "muted"}
        >
          <View style={styles.content}>
            <Thumbnail
              fileName={album.thumbnail}
              placeholderIcon="Disc"
              containerStyle={styles.thumbnail}
            />
            <View style={styles.infoContainer}>
              <AnimatedBadge
                title={t("common.featured")}
                animatedBackgroundColor={thumbnailUri ? "primary" : "foreground"}
                animatedBorderColor={thumbnailUri ? "primary" : "foreground"}
                animatedTextColor={thumbnailUri ? "primaryForeground" : "background"}
                style={styles.badge}
              />
              <AnimatedText variant="h2" numberOfLines={1}>
                {album.name}
              </AnimatedText>
              <AnimatedText size="sm" animatedColor="mutedForeground" numberOfLines={1}>
                {t("common.songsPlayed", { count: album.totalTracks })}
                {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
              </AnimatedText>
              {canPlay && (
                <AnimatedButton
                  size="sm"
                  title={t("common.shuffleAndPlay")}
                  leftIcon="Shuffle"
                  isLoading={isShuffling}
                  disabled={!canPlay}
                  onPress={handleShuffleAndPlay}
                  style={styles.button}
                />
              )}
            </View>
          </View>
        </AnimatedBackground>
      </ScopedPalette>
    </View>
  )
})

const albumItemFeaturedStyles = createStyleSheet(({ theme }) => ({
  container: {
    paddingHorizontal: theme.space("lg")
  },
  background: {
    borderRadius: theme.radius("lg")
  },
  content: {
    flexDirection: "row",
    padding: theme.space("lg"),
    gap: theme.space()
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: theme.radius(),
    borderWidth: 0
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    gap: theme.space("sm")
  },
  badge: {
    alignSelf: "flex-start"
  },
  button: {
    marginTop: theme.space("sm"),
    alignSelf: "flex-start"
  }
}))

export { AlbumItemFeatured }
