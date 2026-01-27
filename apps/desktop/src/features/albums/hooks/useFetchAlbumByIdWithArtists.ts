import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithArtists } from "../api/queries"

/**
 * Custom hook for fetching a single album by its ID, including its associated artists.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the album data along with its associated
 * artists based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the album to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the album data
 *          with artists, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: album, isLoading, isError } = useFetchAlbumByIdWithArtists(789);
 *
 * if (isLoading) return <p>Loading album with artists...</p>;
 * if (isError) return <p>Error loading album!</p>;
 *
 * return <p>{album?.name} by {album?.artists?.[0]?.name}</p>;
 * ```
 */
export function useFetchAlbumByIdWithArtists(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithArtists(id!),
    queryFn: () => getAlbumByIdWithArtists(id!),
    enabled: !!id
  })
}
