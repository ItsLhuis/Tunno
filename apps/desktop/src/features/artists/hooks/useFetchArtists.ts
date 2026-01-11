import { useQuery } from "@tanstack/react-query"

import { artistKeys, type QueryArtistParams } from "@repo/api"

import { getAllArtists } from "../api/queries"

/**
 * Custom hook for fetching a list of artists.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of artist objects based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter and order the artists (e.g., search, pagination).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of artist objects,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all artists
 * const { data: allArtists, isLoading: isLoadingAll } = useFetchArtists();
 *
 * // Fetch artists filtered by a search term
 * const { data: searchedArtists, isLoading: isLoadingSearch } = useFetchArtists({ search: "Pop" });
 *
 * if (isLoadingAll) return <Text>Loading all artists...</Text>;
 *
 * return (
 *   <View>
 *     {allArtists?.map((artist) => <Text key={artist.id}>{artist.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchArtists(params?: QueryArtistParams) {
  return useQuery({
    queryKey: artistKeys.list(params),
    queryFn: () => getAllArtists(params)
  })
}
