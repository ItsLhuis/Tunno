import { useCallback, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useFetchHome } from "../hooks/useFetchHome"

import {
  AsyncState,
  RefreshControl,
  ScrollViewWithHeaders,
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

  return (
    <ScrollViewWithHeaders
      HeaderComponent={HeaderComponent}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      contentContainerStyle={styles.contentContainer}
    >
      <AsyncState
        data={home}
        isLoading={isLoading}
        isError={isError}
        EmptyComponent={<HomeScreenEmpty />}
      >
        {(data) => {
          const hasQuickAccess = (data.quickAccess?.totalItems ?? 0) > 0
          const hasJumpBackIn = (data.jumpBackIn?.totalItems ?? 0) > 0
          const hasNewReleases = (data.newReleases?.totalAlbums ?? 0) > 0
          const hasOnRepeat = (data.onRepeat?.totalSongs ?? 0) > 0
          const hasDiscover = (data.discover?.totalSongs ?? 0) > 0
          const hasFavoriteArtists = (data.favoriteArtists?.totalArtists ?? 0) > 0
          const hasYourPlaylists = (data.yourPlaylists?.totalPlaylists ?? 0) > 0
          const hasTopAlbums = (data.topAlbums?.totalAlbums ?? 0) > 0
          const hasRecentlyAdded = (data.recentlyAdded?.totalItems ?? 0) > 0

          const hasAnySection =
            hasQuickAccess ||
            hasJumpBackIn ||
            hasNewReleases ||
            hasOnRepeat ||
            hasDiscover ||
            hasFavoriteArtists ||
            hasYourPlaylists ||
            hasTopAlbums ||
            hasRecentlyAdded

          return (
            <AsyncState data={hasAnySection} EmptyComponent={<HomeScreenEmpty />}>
              <View style={styles.content(bottomPlayerHeight)}>
                {hasQuickAccess && <QuickAccess quickAccess={data.quickAccess!} />}
                {hasJumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn!} />}
                {hasNewReleases && <NewReleases newReleases={data.newReleases!} />}
                {hasOnRepeat && <OnRepeat onRepeat={data.onRepeat!} />}
                {hasDiscover && <Discover discover={data.discover!} />}
                {hasFavoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists!} />}
                {hasYourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists!} />}
                {hasTopAlbums && <TopAlbums topAlbums={data.topAlbums!} />}
                {hasRecentlyAdded && <RecentlyAdded recentlyAdded={data.recentlyAdded!} />}
              </View>
            </AsyncState>
          )
        }}
      </AsyncState>
    </ScrollViewWithHeaders>
  )
}

const homeScreenStyles = createStyleSheet(({ theme }) => ({
  contentContainer: {
    flexGrow: 1
  },
  content: (bottomOffset: number) =>
    viewStyle({
      paddingBottom: theme.space("lg") + bottomOffset,
      gap: theme.space("xl")
    })
}))

export { HomeScreen }
