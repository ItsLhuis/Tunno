import { useInfiniteQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsPaginated } from "../api/queries"

/**
 * Custom hook for fetching an infinitely scrollable list of albums.
 *
 * This hook leverages `@tanstack/react-query`'s `useInfiniteQuery` to handle asynchronous
 * paginated data fetching and caching. It returns a list of album objects and provides
 * mechanisms for infinite scrolling.
 *
 * @param params - Optional query parameters to filter the albums (e.g., search, artistId).
 * @returns A `UseInfiniteQueryResult` object from `@tanstack/react-query` containing paginated album data,
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
 * } = useFetchAlbumsInfinite({ limit: 10 });
 *
 * if (isLoading) return <p>Loading initial albums...</p>;
 * if (isError) return <p>Error loading albums!</p>;
 *
 * return (
 *   <div>
 *     {data?.pages.map((page, i) => (
 *       <React.Fragment key={i}>
 *         {page.items.map(album => (
 *           <p key={album.id}>{album.name}</p>
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
export function useFetchAlbumsInfinite(params?: QueryAlbumParams) {
  return useInfiniteQuery({
    queryKey: albumKeys.listInfinite(params),
    queryFn: ({ pageParam }) =>
      getAlbumsPaginated({
        ...params,
        cursor: pageParam
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.hasPrevPage ? firstPage.prevCursor : undefined
    }
  })
}
