import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistByIdWithAllRelations } from "../api/queries"

/**
 * Custom hook for fetching a single artist by its ID, including all its relations (e.g., albums, songs).
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the artist data along with all associated
 * relational data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the artist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the artist data
 *          with all relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: artist, isLoading, isError } = useFetchArtistByIdWithAllRelations(456);
 *
 * if (isLoading) return <Text>Loading detailed artist...</Text>;
 * if (isError) return <Text>Error loading detailed artist!</Text>;
 *
 * return <Text>{artist?.name} with {artist?.albums?.length} albums</Text>;
 * ```
 */
export function useFetchArtistByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: artistKeys.detailsWithAllRelations(id!),
    queryFn: () => getArtistByIdWithAllRelations(id!),
    enabled: !!id
  })
}
