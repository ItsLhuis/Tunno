import { useQuery } from "@tanstack/react-query"

import { type QueryArtistParams, artistKeys } from "@repo/api"

import { getArtistIdsOnly } from "../api/queries"

/**
 * Custom hook for fetching a list of artist IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of artist IDs based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter the artist IDs (e.g., search, pagination).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of artist IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all artist IDs
 * const { data: allArtistIds, isLoading: isLoadingAll } = useFetchArtistIds();
 *
 * if (isLoadingAll) return <p>Loading all artist IDs...</p>;
 *
 * return (
 *   <div>
 *     {allArtistIds?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchArtistIds(params?: QueryArtistParams) {
  return useQuery({
    queryKey: artistKeys.listIdsOnly(params),
    queryFn: async () => {
      return getArtistIdsOnly(params)
    }
  })
}
