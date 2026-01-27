import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumIdsOnly } from "../api/queries"

/**
 * Custom hook for fetching a list of album IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of album IDs based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter the album IDs (e.g., search, pagination).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of album IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all album IDs
 * const { data: allAlbumIds, isLoading: isLoadingAll } = useFetchAlbumIds();
 *
 * if (isLoadingAll) return <p>Loading all album IDs...</p>;
 *
 * return (
 *   <div>
 *     {allAlbumIds?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchAlbumIds(params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listIdsOnly(params),
    queryFn: () => getAlbumIdsOnly(params)
  })
}
