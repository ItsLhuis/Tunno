import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistById } from "../api/queries"

/**
 * Custom hook for fetching a single playlist by its ID.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the playlist data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the playlist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the playlist data,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: playlist, isLoading, isError } = useFetchPlaylistById(123);
 *
 * if (isLoading) return <Text>Loading playlist...</Text>;
 * if (isError) return <Text>Error loading playlist!</Text>;
 *
 * return <Text>{playlist?.name}</Text>;
 * ```
 */
export function useFetchPlaylistById(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.details(id!),
    queryFn: () => getPlaylistById(id!),
    enabled: !!id
  })
}
