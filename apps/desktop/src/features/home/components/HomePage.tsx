import { useCallback, useMemo } from "react"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

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

import { useFetchDiscover } from "../hooks/useFetchDiscover"
import { useFetchFavoriteArtists } from "../hooks/useFetchFavoriteArtists"
import { useFetchHiddenGems } from "../hooks/useFetchHiddenGems"
import { useFetchJumpBackIn } from "../hooks/useFetchJumpBackIn"
import { useFetchNewReleases } from "../hooks/useFetchNewReleases"
import { useFetchOnRepeat } from "../hooks/useFetchOnRepeat"
import { useFetchRecentlyAdded } from "../hooks/useFetchRecentlyAdded"
import { useFetchTopAlbums } from "../hooks/useFetchTopAlbums"
import { useFetchUserStats } from "../hooks/useFetchUserStats"
import { useFetchYourPlaylists } from "../hooks/useFetchYourPlaylists"

const HomePage = () => {
  const fetchUserStats = useFetchUserStats()
  const fetchJumpBackIn = useFetchJumpBackIn()
  const fetchOnRepeat = useFetchOnRepeat()
  const fetchYourPlaylists = useFetchYourPlaylists()
  const fetchNewReleases = useFetchNewReleases()
  const fetchFavoriteArtists = useFetchFavoriteArtists()
  const fetchTopAlbums = useFetchTopAlbums()
  const fetchRecentlyAdded = useFetchRecentlyAdded()
  const fetchHiddenGems = useFetchHiddenGems()
  const fetchDiscover = useFetchDiscover()

  const isLoading = useMemo(
    () =>
      fetchUserStats.isLoading ||
      fetchJumpBackIn.isLoading ||
      fetchOnRepeat.isLoading ||
      fetchYourPlaylists.isLoading ||
      fetchNewReleases.isLoading ||
      fetchFavoriteArtists.isLoading ||
      fetchTopAlbums.isLoading ||
      fetchRecentlyAdded.isLoading ||
      fetchHiddenGems.isLoading ||
      fetchDiscover.isLoading,
    [
      fetchUserStats.isLoading,
      fetchJumpBackIn.isLoading,
      fetchOnRepeat.isLoading,
      fetchYourPlaylists.isLoading,
      fetchNewReleases.isLoading,
      fetchFavoriteArtists.isLoading,
      fetchTopAlbums.isLoading,
      fetchRecentlyAdded.isLoading,
      fetchHiddenGems.isLoading,
      fetchDiscover.isLoading
    ]
  )

  const handleRefresh = useCallback(async () => {
    await Promise.all([
      fetchUserStats.refetch(),
      fetchJumpBackIn.refetch(),
      fetchOnRepeat.refetch(),
      fetchYourPlaylists.refetch(),
      fetchNewReleases.refetch(),
      fetchFavoriteArtists.refetch(),
      fetchTopAlbums.refetch(),
      fetchRecentlyAdded.refetch(),
      fetchHiddenGems.refetch(),
      fetchDiscover.refetch()
    ])
  }, [
    fetchUserStats.refetch,
    fetchJumpBackIn.refetch,
    fetchOnRepeat.refetch,
    fetchYourPlaylists.refetch,
    fetchNewReleases.refetch,
    fetchFavoriteArtists.refetch,
    fetchTopAlbums.refetch,
    fetchRecentlyAdded.refetch,
    fetchHiddenGems.refetch,
    fetchDiscover.refetch
  ])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={HomeHeader}
      StickyHeaderComponent={HomeStickyHeader}
      className="flex w-full flex-1 flex-col pt-0"
    >
      <AsyncState data isLoading={isLoading} className="flex w-full flex-1 flex-col gap-9 pb-9">
        {() => (
          <>
            {fetchUserStats.data && <YourStats stats={fetchUserStats.data} />}
            {fetchJumpBackIn.data && <JumpBackIn jumpBackIn={fetchJumpBackIn.data} />}
            {fetchOnRepeat.data && <OnRepeat onRepeat={fetchOnRepeat.data} />}
            {fetchYourPlaylists.data && <YourPlaylists yourPlaylists={fetchYourPlaylists.data} />}
            {fetchNewReleases.data && <NewReleases newReleases={fetchNewReleases.data} />}
            {fetchFavoriteArtists.data && (
              <FavoriteArtists favoriteArtists={fetchFavoriteArtists.data} />
            )}
            {fetchTopAlbums.data && <TopAlbums topAlbums={fetchTopAlbums.data} />}
            {fetchRecentlyAdded.data && <RecentlyAdded recentlyAdded={fetchRecentlyAdded.data} />}
            {fetchHiddenGems.data && <HiddenGems hiddenGems={fetchHiddenGems.data} />}
            {fetchDiscover.data && <Discover discover={fetchDiscover.data} />}
          </>
        )}
      </AsyncState>
    </ScrollAreaWithHeaders>
  )
}

export { HomePage }
