import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithAllRelations } from "../api/queries"

/**
 * Custom hook for fetching a single album by its ID, including all its relations (e.g., artists, songs).
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the album data along with all associated
 * relational data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the album to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the album data
 *          with all relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: album, isLoading, isError } = useFetchAlbumByIdWithAllRelations(456);
 *
 * if (isLoading) return <p>Loading detailed album...</p>;
 * if (isError) return <p>Error loading detailed album!</p>;
 *
 * return <p>{album?.name} by {album?.artists?.[0]?.name} with {album?.songs?.length} songs</p>;
 * ```
 */
export function useFetchAlbumByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithAllRelations(id!),
    queryFn: () => getAlbumByIdWithAllRelations(id!),
    enabled: !!id
  })
}
