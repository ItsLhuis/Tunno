import { useCallback } from "react"

import { useFetchHome } from "../hooks/useFetchHome"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

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
  const { data: home, isLoading, isError, refetch } = useFetchHome()

  const Header = useCallback(() => null, [])

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
      className="flex w-full flex-1 flex-col pt-9"
    >
      <AsyncState
        data={home}
        isLoading={isLoading}
        isError={isError}
        EmptyComponent={<HomePageEmpty />}
        className={cn("flex w-full flex-1 flex-col gap-9", (isLoading || isError) && "min-h-44")}
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
            <AsyncState
              data={hasAnySection}
              EmptyComponent={<HomePageEmpty />}
              className="flex w-full flex-1 flex-col gap-9"
            >
              {featuredAlbum && <AlbumItemFeatured album={featuredAlbum} />}
              {hasJumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn!} />}
              {hasOnRepeat && <OnRepeat onRepeat={data.onRepeat!} />}
              {hasNewReleases && <NewReleases newReleases={data.newReleases!} />}
              {hasYourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists!} />}
              {hasDiscover && <Discover discover={data.discover!} />}
              {hasFavoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists!} />}
            </AsyncState>
          )
        }}
      </AsyncState>
    </ScrollAreaWithHeaders>
  )
}

export { HomePage }
