import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongById } from "../api/queries"

/**
 * Custom hook for fetching a single song by its ID.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the song data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the song to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the song data,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: song, isLoading, isError } = useFetchSongById(123);
 *
 * if (isLoading) return <p>Loading song...</p>;
 * if (isError) return <p>Error loading song!</p>;
 *
 * return <p>{song?.name}</p>;
 * ```
 */
export function useFetchSongById(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.details(id!),
    queryFn: () => getSongById(id!),
    enabled: !!id
  })
}
