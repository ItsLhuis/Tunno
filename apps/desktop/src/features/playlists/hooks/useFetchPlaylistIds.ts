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
 * if (isLoadingAll) return <p>Loading all playlist IDs...</p>;
 *
 * return (
 *   <div>
 *     {allPlaylistIds?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchPlaylistIds(params?: QueryPlaylistParams) {
  return useQuery({
    queryKey: playlistKeys.listIdsOnly(params),
    queryFn: () => getPlaylistIdsOnly(params)
  })
}
