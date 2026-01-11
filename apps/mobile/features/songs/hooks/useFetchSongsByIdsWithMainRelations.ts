import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongsByIdsWithMainRelations } from "../api/queries"

/**
 * Custom hook for fetching multiple songs by their IDs, including their main relations.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of song objects, each including
 * its primary relational data (e.g., artist, album), for the provided `ids`.
 * The query is enabled only when a valid (non-empty) array of `ids` is provided.
 *
 * @param ids - An array of song IDs to fetch.
 *              Can be `null` or `undefined` or an empty array to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of song objects
 *          with main relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch songs with IDs 1, 2, and 3
 * const { data: songs, isLoading } = useFetchSongsByIdsWithMainRelations([1, 2, 3]);
 *
 * if (isLoading) return <Text>Loading songs...</Text>;
 *
 * return (
 *   <View>
 *     {songs?.map((song) => <Text key={song.id}>{song.name} by {song.artist.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchSongsByIdsWithMainRelations(ids: number[] | null | undefined) {
  return useQuery({
    queryKey: [...songKeys.listWithMainRelations(), "byIds", ids || []],
    queryFn: () => getSongsByIdsWithMainRelations(ids!),
    enabled: !!ids && ids.length > 0
  })
}
