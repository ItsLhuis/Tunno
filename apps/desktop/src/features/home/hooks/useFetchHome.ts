import { useCallback, useMemo } from "react"

import { useQueries } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import {
  getDiscover,
  getFavoriteArtists,
  getJumpBackIn,
  getNewReleases,
  getOnRepeat,
  getYourPlaylists
} from "../api/queries"

import {
  type Discover,
  type FavoriteArtists,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type YourPlaylists
} from "@repo/api"

/**
 * Defines the options available for customizing the data fetched by {@link useFetchHome}.
 */
type HomeOptions = {
  jumpBackIn?: { limit?: number; hours?: number }
  onRepeat?: { days?: number; limit?: number }
  yourPlaylists?: { limit?: number; favoritesOnly?: boolean }
  newReleases?: { limit?: number; days?: number }
  favoriteArtists?: { limit?: number }
  discover?: { limit?: number }
}

/**
 * Represents the aggregated data structure for the home screen sections.
 */
type Home = {
  jumpBackIn: JumpBackIn | undefined
  onRepeat: OnRepeat | undefined
  yourPlaylists: YourPlaylists | undefined
  newReleases: NewReleases | undefined
  favoriteArtists: FavoriteArtists | undefined
  discover: Discover | undefined
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
 * home sections like "Jump Back In", "On Repeat", "Your Playlists", "New Releases",
 * "Favorite Artists", and "Discover". It combines the results, manages loading/error states,
 * and provides a single `refetch` mechanism for all sections.
 *
 * @param options - Optional configuration for each home section, allowing customization of limits and filters.
 * @returns A {@link HomeResult} object containing the aggregated data for all sections,
 *          loading state, error state, and a refetch function.
 */
export function useFetchHome(options: HomeOptions = {}): HomeResult {
  const queries = useMemo(
    () => [
      {
        queryKey: homeKeys.listJumpBackIn({
          limit: options.jumpBackIn?.limit ?? 16,
          hours: options.jumpBackIn?.hours ?? 48
        }),
        queryFn: () =>
          getJumpBackIn(options.jumpBackIn?.limit ?? 16, options.jumpBackIn?.hours ?? 48)
      },
      {
        queryKey: homeKeys.listOnRepeat({
          days: options.onRepeat?.days ?? 16,
          limit: options.onRepeat?.limit ?? 5
        }),
        queryFn: () => getOnRepeat(options.onRepeat?.limit ?? 5, options.onRepeat?.days ?? 16)
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
          limit: options.newReleases?.limit ?? 16,
          days: options.newReleases?.days ?? 30
        }),
        queryFn: () =>
          getNewReleases(options.newReleases?.limit ?? 16, options.newReleases?.days ?? 30)
      },
      {
        queryKey: homeKeys.listFavoriteArtists({
          limit: options.favoriteArtists?.limit ?? 16
        }),
        queryFn: () => getFavoriteArtists(options.favoriteArtists?.limit ?? 16)
      },
      {
        queryKey: homeKeys.listDiscover({
          limit: options.discover?.limit ?? 16
        }),
        queryFn: () => getDiscover(options.discover?.limit ?? 16)
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
      options.discover?.limit
    ]
  )

  const combineFunction = useCallback((queryResults: any[]) => {
    const [
      jumpBackInResult,
      onRepeatResult,
      yourPlaylistsResult,
      newReleasesResult,
      favoriteArtistsResult,
      discoverResult
    ] = queryResults

    const home: Home = {
      jumpBackIn: jumpBackInResult.data as JumpBackIn | undefined,
      onRepeat: onRepeatResult.data as OnRepeat | undefined,
      yourPlaylists: yourPlaylistsResult.data as YourPlaylists | undefined,
      newReleases: newReleasesResult.data as NewReleases | undefined,
      favoriteArtists: favoriteArtistsResult.data as FavoriteArtists | undefined,
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
