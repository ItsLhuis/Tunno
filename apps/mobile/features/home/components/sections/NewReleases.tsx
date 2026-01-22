import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { AlbumItemCard } from "@features/albums/components"

import { type Album, type NewReleases as NewReleasesData } from "@repo/api"

type NewReleasesProps = {
  newReleases: NewReleasesData
}

const NewReleases = ({ newReleases }: NewReleasesProps) => {
  const styles = useStyles(newReleasesStyles)

  const { t } = useTranslation()

  const albums = newReleases.albums

  const keyExtractor = useCallback((item: Album, index: number) => `${item.id}-${index}`, [])

  const renderItem = useCallback(
    ({ item }: { item: Album }) => (
      <View style={styles.carouselItem}>
        <AlbumItemCard album={item} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (albums.length === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.newReleases.title", "New Releases")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.newReleases.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={albums}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const newReleasesStyles = createStyleSheet(({ theme }) => ({
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

export { NewReleases }
