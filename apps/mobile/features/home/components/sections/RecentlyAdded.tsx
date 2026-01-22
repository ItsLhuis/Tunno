import { useCallback } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { Carousel, CarouselContent, Text } from "@components/ui"

import { AlbumItemCard } from "@features/albums/components"
import { ArtistItemCard } from "@features/artists/components"
import { PlaylistItemCard } from "@features/playlists/components"
import { SongItemCard } from "@features/songs/components"

import { type RecentlyAdded as RecentlyAddedData, type RecentlyAddedItem } from "@repo/api"

type RecentlyAddedProps = {
  recentlyAdded: RecentlyAddedData
}

const RecentlyAddedItemRenderer = ({ item }: { item: RecentlyAddedItem }) => {
  switch (item.type) {
    case "song":
      return <SongItemCard song={item.data} />
    case "album":
      return <AlbumItemCard album={item.data} />
    case "artist":
      return <ArtistItemCard artist={item.data} />
    case "playlist":
      return <PlaylistItemCard playlist={item.data} />
  }
}

const RecentlyAdded = ({ recentlyAdded }: RecentlyAddedProps) => {
  const styles = useStyles(recentlyAddedStyles)

  const { t } = useTranslation()

  const keyExtractor = useCallback(
    (item: RecentlyAddedItem, index: number) => `${item.type}-${item.data.id}-${index}`,
    []
  )

  const renderItem = useCallback(
    ({ item }: { item: RecentlyAddedItem }) => (
      <View style={styles.carouselItem}>
        <RecentlyAddedItemRenderer item={item} />
      </View>
    ),
    [styles.carouselItem]
  )

  if (recentlyAdded.totalItems === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text variant="h3">{t("home.recentlyAdded.title")}</Text>
        <Text size="sm" color="mutedForeground">
          {t("home.recentlyAdded.description")}
        </Text>
      </View>
      <Carousel>
        <CarouselContent
          data={recentlyAdded.items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.carouselContentContainer}
        />
      </Carousel>
    </View>
  )
}

const recentlyAddedStyles = createStyleSheet(({ theme }) => ({
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

export { RecentlyAdded }
