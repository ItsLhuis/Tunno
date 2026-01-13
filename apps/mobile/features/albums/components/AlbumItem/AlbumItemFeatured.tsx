import { memo } from "react"

import { View } from "react-native"

import { createStyleSheet, responsive, ScopedPalette, useBreakpoint, useStyles } from "@styles"

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

  const breakpoint = useBreakpoint()

  const thumbnailUri = useThumbnailUri({ fileName: album.thumbnail })

  const { palette } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const { songIds, isShuffling, handleShuffleAndPlay } = useAlbumPlayback(album.id)

  const canPlay = songIds && songIds.length > 0

  const titleVariant = responsive({ xs: "h3", sm: "h2", md: "h1" } as const, breakpoint) ?? "h3"
  const buttonSize = responsive({ xs: "sm", md: "default", xl: "lg" } as const, breakpoint) ?? "sm"

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
              <AnimatedText variant={titleVariant} numberOfLines={1}>
                {album.name}
              </AnimatedText>
              <AnimatedText size="sm" animatedColor="mutedForeground" numberOfLines={1}>
                {t("common.songsPlayed", { count: album.totalTracks })}
                {album.totalDuration > 0 && ` • ${formatDuration(album.totalDuration, t)}`}
              </AnimatedText>
              {canPlay && (
                <AnimatedButton
                  size={buttonSize}
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

const albumItemFeaturedStyles = createStyleSheet(({ theme, runtime }) => {
  const isColumnLayout = runtime.breakpoint === "xs"
  const thumbnailSize =
    responsive({ sm: 140, md: 250, lg: 320, xl: 400 }, runtime.breakpoint) ?? "100%"

  return {
    container: {
      paddingHorizontal: theme.space("lg")
    },
    background: {
      borderRadius: theme.radius("lg")
    },
    content: {
      flexDirection: isColumnLayout ? "column" : "row",
      padding: theme.space("lg"),
      gap: theme.space()
    },
    thumbnail: {
      width: thumbnailSize,
      aspectRatio: 1,
      borderRadius: theme.radius(),
      borderWidth: 0
    },
    infoContainer: {
      flex: 1,
      justifyContent: "flex-end",
      gap: theme.space("sm")
    },
    badge: {
      alignSelf: "flex-start"
    },
    button: {
      marginTop: theme.space("sm"),
      alignSelf: "flex-start"
    }
  }
})

export { AlbumItemFeatured }
