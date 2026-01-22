import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { ArtistItemCard } from "@features/artists/components"

import { type Artist, type FavoriteArtists as FavoriteArtistsData } from "@repo/api"

type FavoriteArtistsProps = {
  favoriteArtists: FavoriteArtistsData
}

const FavoriteArtists = ({ favoriteArtists }: FavoriteArtistsProps) => {
  const styles = useStyles(favoriteArtistsStyles)

  const { t } = useTranslation()

  const keyExtractor = useCallback((item: Artist, index: number) => `${item.id}-${index}`, [])

  const renderItem = useCallback(
    ({ item }: { item: Artist }) => (
      <View style={styles.carouselItem}>
        <ArtistItemCard artist={item} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (favoriteArtists.totalArtists === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.favoriteArtists.title", "Your Favorite Artists")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.favoriteArtists.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={favoriteArtists.artists}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const favoriteArtistsStyles = createStyleSheet(({ theme }) => ({
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

export { FavoriteArtists }
