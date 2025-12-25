import { Fragment, useCallback } from "react"

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
      className="flex w-full flex-1 flex-col pt-0"
    >
      <AsyncState
        data={home}
        isLoading={isLoading}
        isError={isError}
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
            hasJumpBackIn ||
            hasOnRepeat ||
            hasYourPlaylists ||
            hasNewReleases ||
            hasDiscover ||
            hasFavoriteArtists

          return (
            <Fragment>
              {featuredAlbum && <AlbumItemFeatured album={featuredAlbum} />}
              <AsyncState data={hasAnySection} className="flex w-full flex-1 flex-col gap-9">
                {hasJumpBackIn && <JumpBackIn jumpBackIn={data.jumpBackIn!} />}
                {hasOnRepeat && <OnRepeat onRepeat={data.onRepeat!} />}
                {hasNewReleases && <NewReleases newReleases={data.newReleases!} />}
                {hasYourPlaylists && <YourPlaylists yourPlaylists={data.yourPlaylists!} />}
                {hasDiscover && <Discover discover={data.discover!} />}
                {hasFavoriteArtists && <FavoriteArtists favoriteArtists={data.favoriteArtists!} />}
              </AsyncState>
            </Fragment>
          )
        }}
      </AsyncState>
    </ScrollAreaWithHeaders>
  )
}

export { HomePage }
