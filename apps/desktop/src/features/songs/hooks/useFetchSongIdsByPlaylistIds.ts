import { useQuery } from "@tanstack/react-query"

import { getSongIdsByPlaylistIds } from "../api/queries"

import { songKeys } from "@repo/api"

/**
 * Custom hook for fetching song IDs associated with a list of playlist IDs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of song IDs that belong to the
 * specified playlist IDs.
 * The query is enabled only when a valid (non-empty) array of `playlistIds` is provided.
 *
 * @param playlistIds - An array of playlist IDs for which to fetch associated song IDs.
 *                      Can be `null` or `undefined` or an empty array to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of song IDs,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch song IDs for playlists with IDs 100 and 200
 * const { data: playlistSongs, isLoading } = useFetchSongIdsByPlaylistIds([100, 200]);
 *
 * if (isLoading) return <p>Loading song IDs for playlists...</p>;
 *
 * return (
 *   <div>
 *     {playlistSongs?.map((id) => <p key={id}>{id}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchSongIdsByPlaylistIds(playlistIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByPlaylistIds(playlistIds || []),
    queryFn: () => getSongIdsByPlaylistIds(playlistIds!),
    enabled: !!playlistIds && playlistIds.length > 0
  })
}
