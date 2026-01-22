import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { SongItemCard } from "@features/songs/components"

import { type Discover as DiscoverData } from "@repo/api"

type DiscoverProps = {
  discover: DiscoverData
}

type DiscoverSong = DiscoverData["songs"][number]

const Discover = ({ discover }: DiscoverProps) => {
  const styles = useStyles(discoverStyles)

  const { t } = useTranslation()

  const keyExtractor = useCallback((item: DiscoverSong, index: number) => `${item.id}-${index}`, [])

  const renderItem = useCallback(
    ({ item }: { item: DiscoverSong }) => (
      <View style={styles.carouselItem}>
        <SongItemCard song={item} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (discover.totalSongs === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.discover.title", "Discover")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.discover.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={discover.songs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const discoverStyles = createStyleSheet(({ theme }) => ({
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
    width: 160
  }
}))

export { Discover }
