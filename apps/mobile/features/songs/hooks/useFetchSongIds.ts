import { useQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongIdsOnly } from "../api/queries"

/**
 * Custom hook for fetching a list of song IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of song IDs based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter the song IDs (e.g., pagination, search).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of song IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all song IDs
 * const { data: allSongIds, isLoading: isLoadingAll } = useFetchSongIds();
 *
 * // Fetch song IDs filtered by an artist
 * const { data: artistSongIds, isLoading: isLoadingArtist } = useFetchSongIds({ artistId: 1 });
 *
 * if (isLoadingAll) return <Text>Loading all song IDs...</Text>;
 *
 * return (
 *   <View>
 *     {allSongIds?.map((id) => <Text key={id}>{id}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchSongIds(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listIdsOnly(params),
    queryFn: () => getSongIdsOnly(params || {})
  })
}
