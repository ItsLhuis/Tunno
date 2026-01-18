import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongByIdWithMainRelations } from "../api/queries"

/**
 * Custom hook for fetching a single song by its ID, including its main relations.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It provides the song data along with its primary
 * relational data (e.g., artist, album) based on the provided `id`.
 * The query is enabled only when a valid `id` is provided.
 *
 * @param id - The ID of the song to fetch. Can be `null` or `undefined` to disable the query.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the song data
 *          with main relations, loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: song, isLoading, isError } = useFetchSongByIdWithMainRelations(789);
 *
 * if (isLoading) return <p>Loading song with main relations...</p>;
 * if (isError) return <p>Error loading song!</p>;
 *
 * return <p>{song?.name} from album {song?.album?.name}</p>;
 * ```
 */
export function useFetchSongByIdWithMainRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.detailsWithMainRelations(id!),
    queryFn: () => getSongByIdWithMainRelations(id!),
    enabled: !!id,
    retry: 3,
    staleTime: 0
  })
}
