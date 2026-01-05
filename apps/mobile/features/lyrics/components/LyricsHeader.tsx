import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { LargeHeader, Text, Thumbnail } from "@components/ui"

import { type SongWithMainRelations } from "@repo/api"

type LyricsHeaderProps = {
  song: SongWithMainRelations
}

const LyricsHeader = ({ song }: LyricsHeaderProps) => {
  const { t } = useTranslation()
  const styles = useStyles(lyricsHeaderStyles)

  const artistsText =
    song.artists.length > 0
      ? song.artists.map((a) => a.artist.name).join(", ")
      : t("common.unknownArtist")

  return (
    <LargeHeader>
      <View style={styles.container}>
        <Text variant="h1">{t("lyrics.title")}</Text>
        <View style={styles.trackInfoContainer}>
          <Thumbnail fileName={song.thumbnail} placeholderIcon="Music" />
          <View style={styles.trackInfoTextContainer}>
            <Text weight="medium" numberOfLines={1}>
              {song.name}
            </Text>
            <Text size="xs" color="mutedForeground" numberOfLines={1}>
              {artistsText}
            </Text>
          </View>
        </View>
      </View>
    </LargeHeader>
  )
}

const lyricsHeaderStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1
  },
  trackInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm"),
    marginTop: theme.space("lg")
  },
  trackInfoTextContainer: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { LyricsHeader }
