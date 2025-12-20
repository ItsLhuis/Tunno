import { useCallback, useMemo } from "react"

import { useQueries } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import {
  getDiscover,
  getFavoriteArtists,
  getHiddenGems,
  getJumpBackIn,
  getNewReleases,
  getOnRepeat,
  getRecentlyAdded,
  getTopAlbums,
  getUserStats,
  getYourPlaylists
} from "../api/queries"

import {
  type Discover,
  type FavoriteArtists,
  type HiddenGems,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type RecentlyAdded,
  type TopAlbums,
  type UserStats,
  type YourPlaylists
} from "@repo/api"

type HomeOptions = {
  userStats?: {}
  jumpBackIn?: { limit?: number; hours?: number }
  onRepeat?: { days?: number; limit?: number }
  yourPlaylists?: { limit?: number; favoritesOnly?: boolean }
  newReleases?: { limit?: number; days?: number }
  favoriteArtists?: { limit?: number }
  topAlbums?: { limit?: number }
  recentlyAdded?: { limit?: number }
  hiddenGems?: { limit?: number; minYearsOld?: number; maxPlayCount?: number }
  discover?: { limit?: number }
}

type Home = {
  userStats: UserStats | undefined
  jumpBackIn: JumpBackIn | undefined
  onRepeat: OnRepeat | undefined
  yourPlaylists: YourPlaylists | undefined
  newReleases: NewReleases | undefined
  favoriteArtists: FavoriteArtists | undefined
  topAlbums: TopAlbums | undefined
  recentlyAdded: RecentlyAdded | undefined
  hiddenGems: HiddenGems | undefined
  discover: Discover | undefined
}

export type HomeResult = {
  data: Home
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

export function useFetchHome(options: HomeOptions = {}): HomeResult {
  const queries = useMemo(
    () => [
      {
        queryKey: homeKeys.listStats(),
        queryFn: () => getUserStats()
      },
      {
        queryKey: homeKeys.listJumpBackIn({
          limit: options.jumpBackIn?.limit ?? 14,
          hours: options.jumpBackIn?.hours ?? 48
        }),
        queryFn: () =>
          getJumpBackIn(options.jumpBackIn?.limit ?? 14, options.jumpBackIn?.hours ?? 48)
      },
      {
        queryKey: homeKeys.listOnRepeat({
          days: options.onRepeat?.days ?? 14,
          limit: options.onRepeat?.limit ?? 5
        }),
        queryFn: () => getOnRepeat(options.onRepeat?.limit ?? 5, options.onRepeat?.days ?? 14)
      },
      {
        queryKey: homeKeys.listYourPlaylists({
          limit: options.yourPlaylists?.limit ?? 32,
          favorites: options.yourPlaylists?.favoritesOnly ?? false
        }),
        queryFn: () =>
          getYourPlaylists(
            options.yourPlaylists?.limit ?? 32,
            options.yourPlaylists?.favoritesOnly ?? false
          )
      },
      {
        queryKey: homeKeys.listNewReleases({
          limit: options.newReleases?.limit ?? 14,
          days: options.newReleases?.days ?? 30
        }),
        queryFn: () =>
          getNewReleases(options.newReleases?.limit ?? 14, options.newReleases?.days ?? 30)
      },
      {
        queryKey: homeKeys.listFavoriteArtists({
          limit: options.favoriteArtists?.limit ?? 14
        }),
        queryFn: () => getFavoriteArtists(options.favoriteArtists?.limit ?? 14)
      },
      {
        queryKey: homeKeys.listTopAlbums({
          limit: options.topAlbums?.limit ?? 14
        }),
        queryFn: () => getTopAlbums(options.topAlbums?.limit ?? 14)
      },
      {
        queryKey: homeKeys.listRecentlyAdded({
          limit: options.recentlyAdded?.limit ?? 14
        }),
        queryFn: () => getRecentlyAdded(options.recentlyAdded?.limit ?? 14)
      },
      {
        queryKey: homeKeys.listHiddenGems({
          limit: options.hiddenGems?.limit ?? 14,
          minYearsOld: options.hiddenGems?.minYearsOld ?? 5,
          maxPlayCount: options.hiddenGems?.maxPlayCount ?? 3
        }),
        queryFn: () =>
          getHiddenGems(options.hiddenGems?.limit ?? 14, {
            minYearsOld: options.hiddenGems?.minYearsOld ?? 5,
            maxPlayCount: options.hiddenGems?.maxPlayCount ?? 3
          })
      },
      {
        queryKey: homeKeys.listDiscover({
          limit: options.discover?.limit ?? 14
        }),
        queryFn: () => getDiscover(options.discover?.limit ?? 14)
      }
    ],
    [
      options.jumpBackIn?.limit,
      options.jumpBackIn?.hours,
      options.onRepeat?.days,
      options.onRepeat?.limit,
      options.yourPlaylists?.limit,
      options.yourPlaylists?.favoritesOnly,
      options.newReleases?.limit,
      options.newReleases?.days,
      options.favoriteArtists?.limit,
      options.topAlbums?.limit,
      options.recentlyAdded?.limit,
      options.hiddenGems?.limit,
      options.hiddenGems?.minYearsOld,
      options.hiddenGems?.maxPlayCount,
      options.discover?.limit
    ]
  )

  const combineFunction = useCallback((queryResults: any[]) => {
    const [
      userStatsResult,
      jumpBackInResult,
      onRepeatResult,
      yourPlaylistsResult,
      newReleasesResult,
      favoriteArtistsResult,
      topAlbumsResult,
      recentlyAddedResult,
      hiddenGemsResult,
      discoverResult
    ] = queryResults

    const home: Home = {
      userStats: userStatsResult.data as UserStats | undefined,
      jumpBackIn: jumpBackInResult.data as JumpBackIn | undefined,
      onRepeat: onRepeatResult.data as OnRepeat | undefined,
      yourPlaylists: yourPlaylistsResult.data as YourPlaylists | undefined,
      newReleases: newReleasesResult.data as NewReleases | undefined,
      favoriteArtists: favoriteArtistsResult.data as FavoriteArtists | undefined,
      topAlbums: topAlbumsResult.data as TopAlbums | undefined,
      recentlyAdded: recentlyAddedResult.data as RecentlyAdded | undefined,
      hiddenGems: hiddenGemsResult.data as HiddenGems | undefined,
      discover: discoverResult.data as Discover | undefined
    }

    return {
      data: home,
      isLoading: queryResults.some((result) => result.isLoading),
      isError: queryResults.some((result) => result.isError),
      refetch: async () => {
        await Promise.all(queryResults.map((result) => result.refetch()))
      }
    }
  }, [])

  const results = useQueries({
    queries,
    combine: combineFunction
  })

  return {
    data: results.data,
    isLoading: results.isLoading,
    isError: results.isError,
    refetch: results.refetch
  }
}
