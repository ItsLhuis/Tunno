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
 * if (isLoading) return <Text>Loading initial albums...</Text>;
 * if (isError) return <Text>Error loading albums!</Text>;
 *
 * return (
 *   <FlatList
 *     data={data?.pages.flatMap(page => page.items)}
 *     keyExtractor={(item) => item.id.toString()}
 *     renderItem={({ item: album }) => (
 *       <Text>{album.name}</Text>
 *     )}
 *     onEndReached={() => hasNextPage && fetchNextPage()}
 *     onEndReachedThreshold={0.5}
 *     ListFooterComponent={
 *       isFetchingNextPage ? <Text>Loading more...</Text> : null
 *     }
 *   />
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
