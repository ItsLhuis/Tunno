import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAllAlbums } from "../api/queries"

/**
 * Custom hook for fetching a list of albums.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle asynchronous
 * data fetching and caching. It returns an array of album objects based on the provided
 * query parameters.
 *
 * @param params - Optional query parameters to filter the albums (e.g., search, pagination, artistId).
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing an array of album objects,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * // Fetch all albums
 * const { data: allAlbums, isLoading: isLoadingAll } = useFetchAlbums();
 *
 * if (isLoadingAll) return <p>Loading all albums...</p>;
 *
 * return (
 *   <div>
 *     {allAlbums?.map((album) => <p key={album.id}>{album.name}</p>)}
 *   </div>
 * );
 * ```
 */
export function useFetchAlbums(params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.list(params),
    queryFn: () => getAllAlbums(params)
  })
}
