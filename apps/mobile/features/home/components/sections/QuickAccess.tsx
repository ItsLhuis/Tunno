import { useCallback, useMemo } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { Carousel, CarouselContent } from "@components/ui"

import { AlbumItemCompact } from "@features/albums/components"
import { ArtistItemCompact } from "@features/artists/components"
import { PlaylistItemCompact } from "@features/playlists/components"

import { type QuickAccess as QuickAccessData, type QuickAccessItem } from "@repo/api"

type QuickAccessProps = {
  quickAccess: QuickAccessData
}

type QuickAccessGroup = [QuickAccessItem, QuickAccessItem | null, QuickAccessItem | null]

const QuickAccessItemRenderer = ({ item }: { item: QuickAccessItem }) => {
  switch (item.type) {
    case "playlist":
      return <PlaylistItemCompact playlist={item.data} />
    case "album":
      return <AlbumItemCompact album={item.data} />
    case "artist":
      return <ArtistItemCompact artist={item.data} />
  }
}

const QuickAccess = ({ quickAccess }: QuickAccessProps) => {
  const styles = useStyles(quickAccessStyles)

  const organizedItems = useMemo((): QuickAccessGroup[] => {
    const groups: QuickAccessGroup[] = []

    for (let i = 0; i < quickAccess.items.length; i += 3) {
      groups.push([
        quickAccess.items[i],
        quickAccess.items[i + 1] || null,
        quickAccess.items[i + 2] || null
      ])
    }

    return groups
  }, [quickAccess.items])

  const keyExtractor = useCallback(
    (item: QuickAccessGroup, index: number) =>
      `${item[0].type}-${item[0].data.id}-${item[1]?.data.id ?? "null"}-${item[2]?.data.id ?? "null"}-${index}`,
    []
  )

  const renderItem = useCallback(
    ({ item: group }: { item: QuickAccessGroup }) => (
      <View style={styles.carouselItem}>
        <QuickAccessItemRenderer item={group[0]} />
        {group[1] && <QuickAccessItemRenderer item={group[1]} />}
        {group[2] && <QuickAccessItemRenderer item={group[2]} />}
      </View>
    ),
    [styles.carouselItem]
  )

  if (quickAccess.totalItems === 0) {
    return null
  }

  return (
    <Carousel>
      <CarouselContent
        gap="sm"
        data={organizedItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.carouselContentContainer}
      />
    </Carousel>
  )
}

const quickAccessStyles = createStyleSheet(({ theme }) => ({
  carouselContentContainer: {
    paddingHorizontal: theme.space("lg")
  },
  carouselItem: {
    width: 280,
    gap: theme.space("sm")
  }
}))

export { QuickAccess }
