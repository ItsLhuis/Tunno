import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistByIdWithAllRelations } from "../api/queries"

/**
 * Custom hook for fetching a single playlist by its ID, including all its relations (e.g., songs, stats).
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the playlist data along with all associated
 * relational data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the playlist to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the playlist data
 *          with all relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: playlist, isLoading, isError } = useFetchPlaylistByIdWithAllRelations(456);
 *
 * if (isLoading) return <Text>Loading detailed playlist...</Text>;
 * if (isError) return <Text>Error loading detailed playlist!</Text>;
 *
 * return <Text>{playlist?.name} with {playlist?.songs?.length} songs</Text>;
 * ```
 */
export function useFetchPlaylistByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.detailsWithAllRelations(id!),
    queryFn: () => getPlaylistByIdWithAllRelations(id!),
    enabled: !!id
  })
}
