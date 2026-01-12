import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { SongItemCard } from "@features/songs/components"

import { type Discover as DiscoverData } from "@repo/api"

type DiscoverProps = {
  discover: DiscoverData
}

const Discover = ({ discover }: DiscoverProps) => {
  const styles = useStyles(discoverStyles)

  const { t } = useTranslation()

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
          contentContainerStyle={styles.carouselContentContainer}
          renderItem={({ item, index }) => (
            <View style={styles.carouselItem}>
              <SongItemCard key={`${item.id}-${index}`} song={item} />
            </View>
          )}
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
