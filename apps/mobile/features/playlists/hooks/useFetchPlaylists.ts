import { useQuery } from "@tanstack/react-query"

import { playlistKeys, type QueryPlaylistParams } from "@repo/api"

import { getAllPlaylists } from "../api/queries"

/**
 * Custom hook for fetching a list of playlists.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of playlist objects based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter and order the playlists (e.g., search, isPublic).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of playlist objects,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all playlists
 * const { data: allPlaylists, isLoading: isLoadingAll } = useFetchPlaylists();
 *
 * if (isLoadingAll) return <Text>Loading all playlists...</Text>;
 *
 * return (
 *   <View>
 *     {allPlaylists?.map((playlist) => <Text key={playlist.id}>{playlist.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchPlaylists(params?: QueryPlaylistParams) {
  return useQuery({
    queryKey: playlistKeys.list(params),
    queryFn: () => getAllPlaylists(params)
  })
}
