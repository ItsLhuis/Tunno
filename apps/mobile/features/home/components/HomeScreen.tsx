import { useCallback, useMemo, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useFetchHome } from "../hooks/useFetchHome"

import {
  AsyncState,
  FlashListWithHeaders,
  RefreshControl,
  type ScrollHeaderProps
} from "@components/ui"

import {
  Discover,
  FavoriteArtists,
  JumpBackIn,
  NewReleases,
  OnRepeat,
  QuickAccess,
  RecentlyAdded,
  TopAlbums,
  YourPlaylists
} from "./sections"

import { HomeScreenEmpty } from "./HomeScreenEmpty"
import { HomeStickyHeader } from "./HomeStickyHeader"

import {
  type Discover as DiscoverData,
  type FavoriteArtists as FavoriteArtistsData,
  type JumpBackIn as JumpBackInData,
  type NewReleases as NewReleasesData,
  type OnRepeat as OnRepeatData,
  type QuickAccess as QuickAccessData,
  type RecentlyAdded as RecentlyAddedData,
  type TopAlbums as TopAlbumsData,
  type YourPlaylists as YourPlaylistsData
} from "@repo/api"

type HomeSectionItem =
  | { type: "quickAccess"; data: QuickAccessData }
  | { type: "jumpBackIn"; data: JumpBackInData }
  | { type: "newReleases"; data: NewReleasesData }
  | { type: "onRepeat"; data: OnRepeatData }
  | { type: "discover"; data: DiscoverData }
  | { type: "favoriteArtists"; data: FavoriteArtistsData }
  | { type: "yourPlaylists"; data: YourPlaylistsData }
  | { type: "topAlbums"; data: TopAlbumsData }
  | { type: "recentlyAdded"; data: RecentlyAddedData }

const HomeScreen = () => {
  const styles = useStyles(homeScreenStyles)

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { data: home, isLoading, isError, refetch } = useFetchHome()

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }, [refetch])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => (
      <HomeStickyHeader scrollY={scrollY} showHeader={showHeader} />
    ),
    []
  )

  const sections = useMemo((): HomeSectionItem[] => {
    if (!home) return []

    const items: HomeSectionItem[] = []

    if ((home.quickAccess?.totalItems ?? 0) > 0) {
      items.push({ type: "quickAccess", data: home.quickAccess! })
    }

    if ((home.jumpBackIn?.totalItems ?? 0) > 0) {
      items.push({ type: "jumpBackIn", data: home.jumpBackIn! })
    }

    if ((home.newReleases?.totalAlbums ?? 0) > 0) {
      items.push({ type: "newReleases", data: home.newReleases! })
    }

    if ((home.onRepeat?.totalSongs ?? 0) > 0) {
      items.push({ type: "onRepeat", data: home.onRepeat! })
    }

    if ((home.discover?.totalSongs ?? 0) > 0) {
      items.push({ type: "discover", data: home.discover! })
    }

    if ((home.favoriteArtists?.totalArtists ?? 0) > 0) {
      items.push({ type: "favoriteArtists", data: home.favoriteArtists! })
    }

    if ((home.yourPlaylists?.totalPlaylists ?? 0) > 0) {
      items.push({ type: "yourPlaylists", data: home.yourPlaylists! })
    }

    if ((home.topAlbums?.totalAlbums ?? 0) > 0) {
      items.push({ type: "topAlbums", data: home.topAlbums! })
    }

    if ((home.recentlyAdded?.totalItems ?? 0) > 0) {
      items.push({ type: "recentlyAdded", data: home.recentlyAdded! })
    }

    return items
  }, [home])

  const keyExtractor = useCallback((item: HomeSectionItem) => item.type, [])

  const getItemType = useCallback((item: HomeSectionItem) => item.type, [])

  const renderItem = useCallback(({ item }: { item: HomeSectionItem }) => {
    switch (item.type) {
      case "quickAccess":
        return <QuickAccess quickAccess={item.data} />
      case "jumpBackIn":
        return <JumpBackIn jumpBackIn={item.data} />
      case "newReleases":
        return <NewReleases newReleases={item.data} />
      case "onRepeat":
        return <OnRepeat onRepeat={item.data} />
      case "discover":
        return <Discover discover={item.data} />
      case "favoriteArtists":
        return <FavoriteArtists favoriteArtists={item.data} />
      case "yourPlaylists":
        return <YourPlaylists yourPlaylists={item.data} />
      case "topAlbums":
        return <TopAlbums topAlbums={item.data} />
      case "recentlyAdded":
        return <RecentlyAdded recentlyAdded={item.data} />
    }
  }, [])

  return (
    <AsyncState
      data={home}
      isLoading={isLoading}
      isError={isError}
      EmptyComponent={<HomeScreenEmpty />}
    >
      {() => (
        <AsyncState data={sections.length > 0} EmptyComponent={<HomeScreenEmpty />}>
          <FlashListWithHeaders
            HeaderComponent={HeaderComponent}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
            contentContainerStyle={styles.contentContainer(bottomPlayerHeight)}
            data={sections}
            keyExtractor={keyExtractor}
            getItemType={getItemType}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
          />
        </AsyncState>
      )}
    </AsyncState>
  )
}

const ItemSeparator = () => {
  const styles = useStyles(homeScreenStyles)

  return <View style={styles.separator} />
}

const homeScreenStyles = createStyleSheet(({ theme }) => ({
  contentContainer: (bottomOffset: number) =>
    viewStyle({
      paddingBottom: theme.space("lg") + bottomOffset
    }),
  separator: {
    height: theme.space("xl")
  }
}))

export { HomeScreen }
