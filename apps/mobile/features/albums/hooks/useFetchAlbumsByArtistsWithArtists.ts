import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsFilteredByArtistsWithArtists } from "../api/queries"

/**
 * Custom hook for fetching a list of albums, filtered by a specific set of artist IDs,
 * and including the associated artist data for each album.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides an array of album objects, each with their
 * associated artists, based on the provided `artistIds` and other query parameters.
 * The query is enabled only when at least one `artistId` is provided.
 *
 * @param artistIds - An array of artist IDs to filter the albums by.
 * @param params - Optional query parameters to further filter the albums (e.g., search, pagination).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of albums
 *          with artists, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch albums by artists with IDs 1 and 2
 * const { data: albums, isLoading } = useFetchAlbumsByArtistsWithArtists([1, 2]);
 *
 * if (isLoading) return <Text>Loading albums...</Text>;
 *
 * return (
 *   <View>
 *     {albums?.map((album) => <Text key={album.id}>{album.name} by {album.artists[0]?.name}</Text>)}
 *   </View>
 * );
 * ```
 */
export function useFetchAlbumsByArtistsWithArtists(artistIds: number[], params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listByArtistsWithArtists(artistIds, params),
    queryFn: () => getAlbumsFilteredByArtistsWithArtists(artistIds, params),
    enabled: artistIds.length > 0
  })
}
