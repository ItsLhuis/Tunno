import { View } from "react-native"

import { createStyleSheet, imageStyle, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useToggleSongFavorite } from "@features/songs/hooks/useToggleSongFavorite"

import { AnimatedIconButton, AnimatedText, Thumbnail } from "@components/ui"

const TrackInfo = () => {
  const styles = useStyles(trackInfoStyles)

  const { t } = useTranslation()

  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const toggleFavoriteMutation = useToggleSongFavorite()

  const handleToggleFavorite = async () => {
    if (currentTrack?.id) {
      await toggleFavoriteMutation.mutateAsync({ id: currentTrack.id })
    }
  }

  const artistsText =
    currentTrack?.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  const isFavorite = currentTrack?.isFavorite ?? false

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Thumbnail
          fileName={currentTrack?.thumbnail}
          placeholderIcon="Music"
          containerStyle={styles.thumbnail(!!currentTrack?.thumbnail)}
        />
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoContainer}>
          <AnimatedText size="xl" weight="semibold" numberOfLines={1}>
            {currentTrack?.title ?? t("common.noSongPlaying")}
          </AnimatedText>
          {currentTrack && (
            <AnimatedText animatedColor="mutedForeground" numberOfLines={1}>
              {artistsText}
            </AnimatedText>
          )}
        </View>
        <AnimatedIconButton
          name="Heart"
          variant="text"
          isFilled={isFavorite}
          animatedIconColor={isFavorite ? "primary" : "foreground"}
          iconSize="2xl"
          onPress={handleToggleFavorite}
          disabled={!currentTrack}
        />
      </View>
    </View>
  )
}

const trackInfoStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    alignItems: "center",
    gap: theme.space("lg")
  },
  thumbnailContainer: {
    width: "100%",
    paddingHorizontal: theme.space("lg"),
    paddingTop: theme.space("lg")
  },
  thumbnail: (hasThumbnail: boolean) =>
    imageStyle({
      width: "100%",
      aspectRatio: 1,
      borderRadius: theme.radius(),
      ...(hasThumbnail && { borderWidth: theme.borderWidth("none") })
    }),
  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("lg")
  },
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { TrackInfo }
