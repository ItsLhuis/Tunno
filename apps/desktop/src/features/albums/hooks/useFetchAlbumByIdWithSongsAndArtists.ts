import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithSongsAndArtists } from "../api/queries"

/**
 * Custom hook for fetching a single album by its ID, including its associated songs and artists.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the album data along with all its associated
 * songs and artists based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the album to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the album data
 *          with songs and artists, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: album, isLoading, isError } = useFetchAlbumByIdWithSongsAndArtists(101);
 *
 * if (isLoading) return <p>Loading album details...</p>;
 * if (isError) return <p>Error loading album!</p>;
 *
 * return (
 *   <div>
 *     <p>{album?.name}</p>
 *     {album?.songs?.map(song => <p key={song.id}>{song.name}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchAlbumByIdWithSongsAndArtists(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithSongsAndArtists(id!),
    queryFn: () => getAlbumByIdWithSongsAndArtists(id!),
    enabled: !!id,
    retry: 3,
    staleTime: 0
  })
}
