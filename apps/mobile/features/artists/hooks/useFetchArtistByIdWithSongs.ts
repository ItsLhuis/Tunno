import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistByIdWithSongs } from "../api/queries"

/**
 * Custom hook for fetching a single artist by its ID, including their associated songs.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the artist data along with their associated
 * songs based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the artist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the artist data
 *          with songs, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: artist, isLoading, isError } = useFetchArtistByIdWithSongs(789);
 *
 * if (isLoading) return <Text>Loading artist with songs...</Text>;
 * if (isError) return <Text>Error loading artist!</Text>;
 *
 * return (
 *   <View>
 *     <Text>{artist?.name}</Text>
 *     {artist?.songs?.map(song => <Text key={song.id}>{song.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchArtistByIdWithSongs(id: number | null | undefined) {
  return useQuery({
    queryKey: artistKeys.detailsWithSongs(id!),
    queryFn: () => getArtistByIdWithSongs(id!),
    enabled: !!id
  })
}
