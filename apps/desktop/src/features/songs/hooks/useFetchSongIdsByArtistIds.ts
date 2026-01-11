import { useQuery } from "@tanstack/react-query"

import { getSongIdsByArtistIds } from "../api/queries"

import { songKeys } from "@repo/api"

/**
 * Custom hook for fetching song IDs associated with a list of artist IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of song IDs that belong to the
 * specified artist IDs.
 * The query is enabled only when a valid (non-empty) array of `artistIds` is provided.
 *
 * @param artistIds - An array of artist IDs for which to fetch associated song IDs.
 *                    Can be `null` or `undefined` or an empty array to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of song IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch song IDs for artists with IDs 10 and 20
 * const { data: artistSongs, isLoading } = useFetchSongIdsByArtistIds([10, 20]);
 *
 * if (isLoading) return <p>Loading song IDs for artists...</p>;
 *
 * return (
 *   <div>
 *     {artistSongs?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchSongIdsByArtistIds(artistIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByArtistIds(artistIds || []),
    queryFn: () => getSongIdsByArtistIds(artistIds!),
    enabled: !!artistIds && artistIds.length > 0
  })
}
