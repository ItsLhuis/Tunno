import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistById } from "../api/queries"

/**
 * Custom hook for fetching a single artist by its ID.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the artist data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the artist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the artist data,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: artist, isLoading, isError } = useFetchArtistById(123);
 *
 * if (isLoading) return <Text>Loading artist...</Text>;
 * if (isError) return <Text>Error loading artist!</Text>;
 *
 * return <Text>{artist?.name}</Text>;
 * ```
 */
export function useFetchArtistById(id: number | null | undefined) {
  return useQuery({
    queryKey: artistKeys.details(id!),
    queryFn: () => getArtistById(id!),
    enabled: !!id
  })
}
