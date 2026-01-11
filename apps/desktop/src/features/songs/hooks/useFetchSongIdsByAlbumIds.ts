import { useQuery } from "@tanstack/react-query"

import { getSongIdsByAlbumIds } from "../api/queries"

import { songKeys } from "@repo/api"

/**
 * Custom hook for fetching song IDs associated with a list of album IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of song IDs that belong to the
 * specified album IDs.
 * The query is enabled only when a valid (non-empty) array of `albumIds` is provided.
 *
 * @param albumIds - An array of album IDs for which to fetch associated song IDs.
 *                   Can be `null` or `undefined` or an empty array to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of song IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch song IDs for albums with IDs 1 and 2
 * const { data: albumSongs, isLoading } = useFetchSongIdsByAlbumIds([1, 2]);
 *
 * if (isLoading) return <p>Loading song IDs for albums...</p>;
 *
 * return (
 *   <div>
 *     {albumSongs?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchSongIdsByAlbumIds(albumIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByAlbumIds(albumIds || []),
    queryFn: () => getSongIdsByAlbumIds(albumIds!),
    enabled: !!albumIds && albumIds.length > 0
  })
}
