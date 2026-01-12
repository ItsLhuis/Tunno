import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { ArtistItemCard } from "@features/artists/components"

import { type FavoriteArtists as FavoriteArtistsData } from "@repo/api"

type FavoriteArtistsProps = {
  favoriteArtists: FavoriteArtistsData
}

const FavoriteArtists = ({ favoriteArtists }: FavoriteArtistsProps) => {
  const styles = useStyles(favoriteArtistsStyles)

  const { t } = useTranslation()

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
          contentContainerStyle={styles.carouselContentContainer}
          renderItem={({ item, index }) => (
            <View style={styles.carouselItem}>
              <ArtistItemCard key={`${item.id}-${index}`} artist={item} />
            </View>
          )}
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
