import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { PlaylistItemCompact } from "@features/playlists/components"

import { type YourPlaylists as YourPlaylistsData } from "@repo/api"

type YourPlaylistsProps = {
  yourPlaylists: YourPlaylistsData
}

const YourPlaylists = ({ yourPlaylists }: YourPlaylistsProps) => {
  const styles = useStyles(yourPlaylistsStyles)

  const { t } = useTranslation()

  if (yourPlaylists.totalPlaylists === 0) {
    return null
  }

  const organizedPlaylists: Array<
    [(typeof yourPlaylists.playlists)[0], (typeof yourPlaylists.playlists)[0] | null]
  > = []

  for (let i = 0; i < yourPlaylists.playlists.length; i += 2) {
    organizedPlaylists.push([yourPlaylists.playlists[i], yourPlaylists.playlists[i + 1] || null])
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.yourPlaylists.title")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.yourPlaylists.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          gap="sm"
          data={organizedPlaylists}
          contentContainerStyle={styles.carouselContentContainer}
          renderItem={({ item: pair, index: columnIndex }) => (
            <View key={`column-${columnIndex}`} style={styles.carouselItem}>
              <PlaylistItemCompact playlist={pair[0]} />
              {pair[1] && <PlaylistItemCompact playlist={pair[1]} />}
            </View>
          )}
        />
      </Carousel>
    </View>
  )
}

const yourPlaylistsStyles = createStyleSheet(({ theme }) => ({
  section: {
    gap: theme.space()
  },
  sectionHeader: {
    paddingHorizontal: theme.space("lg"),
    gap: theme.space("xs")
  },
  carouselContentContainer: {
    paddingHorizontal: theme.space("lg")
  },
  carouselItem: {
    width: 280,
    gap: theme.space("sm")
  }
}))

export { YourPlaylists }
