import { useInfiniteQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongsWithMainRelationsPaginated } from "../api/queries"

/**
 * Custom hook for fetching an infinitely scrollable list of songs with their main relations.
 *
 * This hook leverages `@tanstack/react-query`'s `useInfiniteQuery` to handle asynchronous
 * paginated data fetching and caching. It returns a list of song objects, each including
 * its primary relational data (e.g., artist, album), and provides mechanisms for infinite scrolling.
 *
 * @param params - Optional query parameters to filter the songs (e.g., search, sorting).
 * @returns A `UseInfiniteQueryResult` object from `@tanstack/react-query` containing paginated song data
 *          with main relations, loading state, error state, and methods for fetching next/previous pages.
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
 * } = useFetchSongsInfiniteWithMainRelations({ limit: 10 });
 *
 * if (isLoading) return <p>Loading initial songs...</p>;
 * if (isError) return <p>Error loading songs!</p>;
 *
 * return (
 *   <div>
 *     {data?.pages.map((page, i) => (
 *       <React.Fragment key={i}>
 *         {page.items.map(song => (
 *           <p key={song.id}>{song.name} by {song.artist.name}</p>
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
export function useFetchSongsInfiniteWithMainRelations(params?: QuerySongsParams) {
  return useInfiniteQuery({
    queryKey: songKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam }) => {
      return getSongsWithMainRelationsPaginated({
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
