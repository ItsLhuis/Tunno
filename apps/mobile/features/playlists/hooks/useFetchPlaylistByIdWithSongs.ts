import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistByIdWithSongs } from "../api/queries"

/**
 * Custom hook for fetching a single playlist by its ID, including its associated songs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the playlist data along with its associated
 * songs based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the playlist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the playlist data
 *          with songs, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: playlist, isLoading, isError } = useFetchPlaylistByIdWithSongs(789);
 *
 * if (isLoading) return <Text>Loading playlist with songs...</Text>;
 * if (isError) return <Text>Error loading playlist!</Text>;
 *
 * return (
 *   <View>
 *     <Text>{playlist?.name}</Text>
 *     {playlist?.songs?.map(song => <Text key={song.id}>{song.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchPlaylistByIdWithSongs(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.detailsWithSongs(id!),
    queryFn: () => getPlaylistByIdWithSongs(id!),
    enabled: !!id
  })
}
