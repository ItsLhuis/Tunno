import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongByIdWithAllRelations } from "../api/queries"

/**
 * Custom hook for fetching a single song by its ID, including all its relations (e.g., artist, album, playlists).
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the song data along with all associated
 * relational data based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the song to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the song data
 *          with all relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: song, isLoading, isError } = useFetchSongByIdWithAllRelations(456);
 *
 * if (isLoading) return <Text>Loading detailed song...</Text>;
 * if (isError) return <Text>Error loading detailed song!</Text>;
 *
 * return <Text>{song?.name} by {song?.artist.name}</Text>;
 * ```
 */
export function useFetchSongByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.detailsWithAllRelations(id!),
    queryFn: () => getSongByIdWithAllRelations(id!),
    enabled: !!id
  })
}
