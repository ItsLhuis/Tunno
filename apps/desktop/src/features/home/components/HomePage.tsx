import { Fragment, useCallback } from "react"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

import { useFetchHome } from "../hooks/useFetchHome"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  Discover,
  FavoriteArtists,
  HiddenGems,
  JumpBackIn,
  NewReleases,
  OnRepeat,
  RecentlyAdded,
  TopAlbums,
  YourPlaylists,
  YourStats
} from "./sections"

import { HomeHeader } from "./HomeHeader"
import { HomeStickyHeader } from "./HomeStickyHeader"

const HomePage = () => {
  const { data: home, isLoading, isError, refetch } = useFetchHome()

  const Header = useCallback(() => <HomeHeader />, [])

  const StickyHeader = useCallback(() => <HomeStickyHeader />, [])

  const handleRefresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      className="flex w-full flex-1 flex-col pt-0"
    >
      <AsyncState
        data={home}
        isLoading={isLoading}
        isError={isError}
        className={cn("flex w-full flex-1 flex-col gap-9", (isLoading || isError) && "min-h-44")}
      >
        {(data) => (
          <Fragment>
            {data.userStats && <YourStats stats={data.userStats} />}
            {data.jumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn} />}
            {data.onRepeat && <OnRepeat onRepeat={data.onRepeat} />}
            {data.yourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists} />}
            {data.newReleases && <NewReleases newReleases={data.newReleases} />}
            {data.discover && <Discover discover={data.discover} />}
            {data.favoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists} />}
            {data.topAlbums && <TopAlbums topAlbums={data.topAlbums} />}
            {data.hiddenGems && <HiddenGems hiddenGems={data.hiddenGems} />}
            {data.recentlyAdded && <RecentlyAdded recentlyAdded={data.recentlyAdded} />}
          </Fragment>
        )}
      </AsyncState>
    </ScrollAreaWithHeaders>
  )
}

export { HomePage }
