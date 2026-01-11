import { useQuery } from "@tanstack/react-query"

import { playlistKeys, type QueryPlaylistParams } from "@repo/api"

import { getPlaylistIdsOnly } from "../api/queries"

/**
 * Custom hook for fetching a list of playlist IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of playlist IDs based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter the playlist IDs (e.g., search, isPublic).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of playlist IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all playlist IDs
 * const { data: allPlaylistIds, isLoading: isLoadingAll } = useFetchPlaylistIds();
 *
 * // Fetch public playlist IDs
 * const { data: publicPlaylistIds, isLoading: isLoadingPublic } = useFetchPlaylistIds({ isPublic: true });
 *
 * if (isLoadingAll) return <Text>Loading all playlist IDs...</Text>;
 *
 * return (
 *   <View>
 *     {allPlaylistIds?.map((id) => <Text key={id}>{id}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchPlaylistIds(params?: QueryPlaylistParams) {
  return useQuery({
    queryKey: playlistKeys.listIdsOnly(params),
    queryFn: () => getPlaylistIdsOnly(params)
  })
}
