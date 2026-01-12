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

import { AlbumItemFeatured } from "@features/albums/components"

import {
  Discover,
  FavoriteArtists,
  JumpBackIn,
  NewReleases,
  OnRepeat,
  YourPlaylists
} from "./sections"

import { HomePageEmpty } from "./HomePageEmpty"
import { HomeStickyHeader } from "./HomeStickyHeader"

const HomePage = () => {
  const styles = useStyles(homePageStyles)

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
    >
      <AsyncState
        data={home}
        isLoading={isLoading}
        isError={isError}
        EmptyComponent={<HomePageEmpty />}
      >
        {(data) => {
          const featuredAlbum = data.newReleases?.albums?.[0]
          const hasJumpBackIn = (data.jumpBackIn?.totalItems ?? 0) > 0
          const hasOnRepeat = (data.onRepeat?.totalSongs ?? 0) > 0
          const hasNewReleases = (data.newReleases?.totalAlbums ?? 0) > 1
          const hasYourPlaylists = (data.yourPlaylists?.totalPlaylists ?? 0) > 0
          const hasDiscover = (data.discover?.totalSongs ?? 0) > 0
          const hasFavoriteArtists = (data.favoriteArtists?.totalArtists ?? 0) > 0

          const hasAnySection =
            featuredAlbum ||
            hasJumpBackIn ||
            hasOnRepeat ||
            hasYourPlaylists ||
            hasNewReleases ||
            hasDiscover ||
            hasFavoriteArtists

          return (
            <AsyncState data={hasAnySection} EmptyComponent={<HomePageEmpty />}>
              <View style={styles.content(bottomPlayerHeight)}>
                {featuredAlbum && <AlbumItemFeatured album={featuredAlbum} />}
                {hasJumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn!} />}
                {hasOnRepeat && <OnRepeat onRepeat={data.onRepeat!} />}
                {hasNewReleases && <NewReleases newReleases={data.newReleases!} />}
                {hasYourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists!} />}
                {hasDiscover && <Discover discover={data.discover!} />}
                {hasFavoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists!} />}
              </View>
            </AsyncState>
          )
        }}
      </AsyncState>
    </ScrollViewWithHeaders>
  )
}

const homePageStyles = createStyleSheet(({ theme }) => ({
  content: (bottomOffset: number) =>
    viewStyle({
      paddingBottom: theme.space("lg") + bottomOffset,
      gap: theme.space("xl")
    })
}))

export { HomePage }
