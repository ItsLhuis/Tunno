import { useCallback, useMemo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { PlaylistItemCompact } from "@features/playlists/components"

import { type Playlist, type YourPlaylists as YourPlaylistsData } from "@repo/api"

type YourPlaylistsProps = {
  yourPlaylists: YourPlaylistsData
}

type PlaylistPair = [Playlist, Playlist | null]

const YourPlaylists = ({ yourPlaylists }: YourPlaylistsProps) => {
  const styles = useStyles(yourPlaylistsStyles)

  const { t } = useTranslation()

  const organizedPlaylists = useMemo((): PlaylistPair[] => {
    const pairs: PlaylistPair[] = []

    for (let i = 0; i < yourPlaylists.playlists.length; i += 2) {
      pairs.push([yourPlaylists.playlists[i], yourPlaylists.playlists[i + 1] || null])
    }

    return pairs
  }, [yourPlaylists.playlists])

  const keyExtractor = useCallback(
    (item: PlaylistPair, index: number) => `${item[0].id}-${item[1]?.id ?? "null"}-${index}`,
    []
  )

  const renderItem = useCallback(
    ({ item: pair }: { item: PlaylistPair }) => (
      <View style={styles.carouselItem}>
        <PlaylistItemCompact playlist={pair[0]} />
        {pair[1] && <PlaylistItemCompact playlist={pair[1]} />}
      </View>
    ),
    [styles.carouselItem]
  )

  if (yourPlaylists.totalPlaylists === 0) {
    return null
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
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
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
