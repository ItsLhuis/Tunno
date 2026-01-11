import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumById } from "../api/queries"

/**
 * Custom hook for fetching a single album by its ID.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the album data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the album to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the album data,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: album, isLoading, isError } = useFetchAlbumById(123);
 *
 * if (isLoading) return <Text>Loading album...</Text>;
 * if (isError) return <Text>Error loading album!</Text>;
 *
 * return <Text>{album?.name}</Text>;
 * ```
 */
export function useFetchAlbumById(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.details(id!),
    queryFn: () => getAlbumById(id!),
    enabled: !!id
  })
}
