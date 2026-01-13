import { View } from "react-native"

import { createStyleSheet, imageStyle, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { AnimatedText, Thumbnail } from "@components/ui"

const TrackInfo = () => {
  const styles = useStyles(trackInfoStyles)

  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const artistsText =
    currentTrack?.artists && currentTrack.artists.length > 0
      ? currentTrack.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  return (
    <View style={styles.container}>
      <Thumbnail
        fileName={currentTrack?.thumbnail}
        placeholderIcon="Music"
        style={styles.thumbnail(!!currentTrack?.thumbnail)}
      />
      <View style={styles.infoContainer}>
        <AnimatedText weight="medium" numberOfLines={1}>
          {currentTrack?.title ?? t("common.noSongPlaying")}
        </AnimatedText>
        {currentTrack && (
          <AnimatedText size="xs" animatedColor="mutedForeground" numberOfLines={1}>
            {artistsText}
          </AnimatedText>
        )}
      </View>
    </View>
  )
}

const trackInfoStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  thumbnail: (hasThumbnail: boolean) =>
    imageStyle({
      ...(hasThumbnail && {
        borderWidth: theme.borderWidth("none")
      })
    }),
  infoContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { TrackInfo }
