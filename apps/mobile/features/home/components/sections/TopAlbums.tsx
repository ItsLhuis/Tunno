import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { AlbumItemCard } from "@features/albums/components"

import { type Album, type TopAlbums as TopAlbumsData } from "@repo/api"

type TopAlbumsProps = {
  topAlbums: TopAlbumsData
}

const TopAlbums = ({ topAlbums }: TopAlbumsProps) => {
  const styles = useStyles(topAlbumsStyles)

  const { t } = useTranslation()

  const keyExtractor = useCallback((item: Album, index: number) => `${item.id}-${index}`, [])

  const renderItem = useCallback(
    ({ item }: { item: Album }) => (
      <View style={styles.carouselItem}>
        <AlbumItemCard album={item} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (topAlbums.totalAlbums === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.topAlbums.title")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.topAlbums.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={topAlbums.albums}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const topAlbumsStyles = createStyleSheet(({ theme }) => ({
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

export { TopAlbums }
