import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryArtistParams, artistKeys } from "@repo/api"

import { getArtistsPaginated } from "../api/queries"

/**
 * Custom hook for fetching an infinitely scrollable list of artists.
 *
 * This hook leverages `@tanstack/react-query`'s `useInfiniteQuery` to handle asynchronous
 * paginated data fetching and caching. It returns a list of artist objects and provides
 * mechanisms for infinite scrolling.
 *
 * @param params - Optional query parameters to filter the artists (e.g., search).
 * @returns A `UseInfiniteQueryResult` object from `@tanstack/react-query` containing paginated artist data,
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
 * } = useFetchArtistsInfinite({ limit: 10 });
 *
 * if (isLoading) return <Text>Loading initial artists...</Text>;
 * if (isError) return <Text>Error loading artists!</Text>;
 *
 * return (
 *   <FlatList
 *     data={data?.pages.flatMap(page => page.items)}
 *     keyExtractor={(item) => item.id.toString()}
 *     renderItem={({ item: artist }) => (
 *       <Text>{artist.name}</Text>
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
export function useFetchArtistsInfinite(params?: QueryArtistParams) {
  return useInfiniteQuery({
    queryKey: artistKeys.listInfinite(params),
    queryFn: async ({ pageParam }) => {
      return getArtistsPaginated({
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
