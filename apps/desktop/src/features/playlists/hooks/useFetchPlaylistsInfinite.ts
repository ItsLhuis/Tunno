import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryPlaylistParams, playlistKeys } from "@repo/api"

import { getPlaylistsPaginated } from "../api/queries"

/**
 * Custom hook for fetching an infinitely scrollable list of playlists.
 *
 * This hook leverages `@tanstack/react-query`'s `useInfiniteQuery` to handle asynchronous
 * paginated data fetching and caching. It returns a list of playlist objects and provides
 * mechanisms for infinite scrolling.
 *
 * @param params - Optional query parameters to filter the playlists (e.g., search, isPublic).
 * @returns A `UseInfiniteQueryResult` object from `@tanstack/react-query` containing paginated playlist data,
 *          loading state, error state, and methods for fetching next/previous pages.
 *
 * @example
 * ```tsx
 * const {
 *   data,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 *   isError,
 * } = useFetchPlaylistsInfinite({ limit: 10 });
 *
 * if (isLoading) return <p>Loading initial playlists...</p>;
 * if (isError) return <p>Error loading playlists!</p>;
 *
 * return (
 *   <div>
 *     {data?.pages.map((page, i) => (
 *       <React.Fragment key={i}>
 *         {page.items.map(playlist => (
 *           <p key={playlist.id}>{playlist.name}</p>
 *         ))}
 *       </React.Fragment>
 *     ))}
 *     <div>
 *       <button
 *         onClick={() => fetchNextPage()}
 *         disabled={!hasNextPage || isFetchingNextPage}
 *       >
 *         {isFetchingNextPage
 *           ? 'Loading more...'
 *           : hasNextPage
 *             ? 'Load More'
 *             : 'Nothing more to load'}
 *       </button>
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useFetchPlaylistsInfinite(params?: QueryPlaylistParams) {
  return useInfiniteQuery({
    queryKey: playlistKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam }) => {
      return getPlaylistsPaginated({
        ...params,
        cursor: pageParam
      })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrevPage ? firstPage.prevCursor : undefined
    }
  })
}
