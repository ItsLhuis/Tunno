import { useCallback, useMemo } from "react"

import { useQueries } from "@tanstack/react-query"

import {
  homeKeys,
  type Discover,
  type FavoriteArtists,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type QuickAccess,
  type RecentlyAdded,
  type TopAlbums,
  type YourPlaylists
} from "@repo/api"

import {
  getDiscover,
  getFavoriteArtists,
  getJumpBackIn,
  getNewReleases,
  getOnRepeat,
  getQuickAccess,
  getRecentlyAdded,
  getTopAlbums,
  getYourPlaylists
} from "../api/queries"

/**
 * Defines the options available for customizing the data fetched by {@link useFetchHome}.
 */
type HomeOptions = {
  quickAccess?: { limit?: number }
  jumpBackIn?: { limit?: number; hours?: number }
  newReleases?: { limit?: number; days?: number }
  onRepeat?: { days?: number; limit?: number }
  discover?: { limit?: number }
  favoriteArtists?: { limit?: number }
  yourPlaylists?: { limit?: number; favoritesOnly?: boolean }
  topAlbums?: { limit?: number }
  recentlyAdded?: { limit?: number; days?: number }
}

/**
 * Represents the aggregated data structure for the home screen sections.
 */
type Home = {
  quickAccess: QuickAccess | undefined
  jumpBackIn: JumpBackIn | undefined
  newReleases: NewReleases | undefined
  onRepeat: OnRepeat | undefined
  discover: Discover | undefined
  favoriteArtists: FavoriteArtists | undefined
  yourPlaylists: YourPlaylists | undefined
  topAlbums: TopAlbums | undefined
  recentlyAdded: RecentlyAdded | undefined
}

/**
 * Represents the return type of the {@link useFetchHome} hook, combining fetched data with query states.
 */
export type HomeResult = {
  data: Home
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

/**
 * Custom hook for fetching and aggregating data for the various sections of the home screen.
 *
 * This hook uses TanStack Query's `useQueries` to fetch data concurrently for different
 * home sections. It combines the results, manages loading/error states,
 * and provides a single `refetch` mechanism for all sections.
 */
export function useFetchHome(options: HomeOptions = {}): HomeResult {
  const queries = useMemo(
    () => [
      {
        queryKey: homeKeys.listQuickAccess({
          limit: options.quickAccess?.limit ?? 12
        }),
        queryFn: () => getQuickAccess(options.quickAccess?.limit ?? 12)
      },
      {
        queryKey: homeKeys.listJumpBackIn({
          limit: options.jumpBackIn?.limit ?? 16,
          hours: options.jumpBackIn?.hours ?? 48
        }),
        queryFn: () =>
          getJumpBackIn(options.jumpBackIn?.limit ?? 16, options.jumpBackIn?.hours ?? 48)
      },
      {
        queryKey: homeKeys.listNewReleases({
          limit: options.newReleases?.limit ?? 16,
          days: options.newReleases?.days ?? 30
        }),
        queryFn: () =>
          getNewReleases(options.newReleases?.limit ?? 16, options.newReleases?.days ?? 30)
      },
      {
        queryKey: homeKeys.listOnRepeat({
          days: options.onRepeat?.days ?? 16,
          limit: options.onRepeat?.limit ?? 5
        }),
        queryFn: () => getOnRepeat(options.onRepeat?.limit ?? 5, options.onRepeat?.days ?? 16)
      },
      {
        queryKey: homeKeys.listDiscover({
          limit: options.discover?.limit ?? 16
        }),
        queryFn: () => getDiscover(options.discover?.limit ?? 16)
      },
      {
        queryKey: homeKeys.listFavoriteArtists({
          limit: options.favoriteArtists?.limit ?? 16
        }),
        queryFn: () => getFavoriteArtists(options.favoriteArtists?.limit ?? 16)
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
        queryKey: homeKeys.listTopAlbums({
          limit: options.topAlbums?.limit ?? 16
        }),
        queryFn: () => getTopAlbums(options.topAlbums?.limit ?? 16)
      },
      {
        queryKey: homeKeys.listRecentlyAdded({
          limit: options.recentlyAdded?.limit ?? 16,
          days: options.recentlyAdded?.days ?? 30
        }),
        queryFn: () =>
          getRecentlyAdded(options.recentlyAdded?.limit ?? 16, options.recentlyAdded?.days ?? 30)
      }
    ],
    [
      options.quickAccess?.limit,
      options.jumpBackIn?.limit,
      options.jumpBackIn?.hours,
      options.newReleases?.limit,
      options.newReleases?.days,
      options.onRepeat?.days,
      options.onRepeat?.limit,
      options.discover?.limit,
      options.favoriteArtists?.limit,
      options.yourPlaylists?.limit,
      options.yourPlaylists?.favoritesOnly,
      options.topAlbums?.limit,
      options.recentlyAdded?.limit,
      options.recentlyAdded?.days
    ]
  )

  const combineFunction = useCallback((queryResults: any[]) => {
    const [
      quickAccessResult,
      jumpBackInResult,
      newReleasesResult,
      onRepeatResult,
      discoverResult,
      favoriteArtistsResult,
      yourPlaylistsResult,
      topAlbumsResult,
      recentlyAddedResult
    ] = queryResults

    const home: Home = {
      quickAccess: quickAccessResult.data as QuickAccess | undefined,
      jumpBackIn: jumpBackInResult.data as JumpBackIn | undefined,
      newReleases: newReleasesResult.data as NewReleases | undefined,
      onRepeat: onRepeatResult.data as OnRepeat | undefined,
      discover: discoverResult.data as Discover | undefined,
      favoriteArtists: favoriteArtistsResult.data as FavoriteArtists | undefined,
      yourPlaylists: yourPlaylistsResult.data as YourPlaylists | undefined,
      topAlbums: topAlbumsResult.data as TopAlbums | undefined,
      recentlyAdded: recentlyAddedResult.data as RecentlyAdded | undefined
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
