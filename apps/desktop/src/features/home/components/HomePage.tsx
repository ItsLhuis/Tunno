import { Fragment, useCallback } from "react"

import { useFetchHome } from "../hooks/useFetchHome"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

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
        {(data) => {
          const hasUserStats = data.userStats
          const hasJumpBackIn = (data.jumpBackIn?.totalItems ?? 0) > 0
          const hasOnRepeat = (data.onRepeat?.totalSongs ?? 0) > 0
          const hasYourPlaylists = (data.yourPlaylists?.totalPlaylists ?? 0) > 0
          const hasNewReleases = (data.newReleases?.totalAlbums ?? 0) > 0
          const hasDiscover = (data.discover?.totalSongs ?? 0) > 0
          const hasFavoriteArtists = (data.favoriteArtists?.totalArtists ?? 0) > 0
          const hasTopAlbums = (data.topAlbums?.totalAlbums ?? 0) > 0
          const hasHiddenGems = (data.hiddenGems?.totalSongs ?? 0) > 0
          const hasRecentlyAdded = (data.recentlyAdded?.totalItems ?? 0) > 0

          const hasAnySection =
            hasJumpBackIn ||
            hasOnRepeat ||
            hasYourPlaylists ||
            hasNewReleases ||
            hasDiscover ||
            hasFavoriteArtists ||
            hasTopAlbums ||
            hasHiddenGems ||
            hasRecentlyAdded

          return (
            <Fragment>
              {hasUserStats && <YourStats stats={data.userStats!} />}
              <AsyncState data={hasAnySection} className="flex w-full flex-1 flex-col gap-9">
                {hasJumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn!} />}
                {hasOnRepeat && <OnRepeat onRepeat={data.onRepeat!} />}
                {hasYourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists!} />}
                {hasNewReleases && <NewReleases newReleases={data.newReleases!} />}
                {hasDiscover && <Discover discover={data.discover!} />}
                {hasFavoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists!} />}
                {hasTopAlbums && <TopAlbums topAlbums={data.topAlbums!} />}
                {hasHiddenGems && <HiddenGems hiddenGems={data.hiddenGems!} />}
                {hasRecentlyAdded && <RecentlyAdded recentlyAdded={data.recentlyAdded!} />}
              </AsyncState>
            </Fragment>
          )
        }}
      </AsyncState>
    </ScrollAreaWithHeaders>
  )
}

export { HomePage }
