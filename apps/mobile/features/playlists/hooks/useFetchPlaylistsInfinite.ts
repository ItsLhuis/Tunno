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
 * if (isLoading) return <Text>Loading initial playlists...</Text>;
 * if (isError) return <Text>Error loading playlists!</Text>;
 *
 * return (
 *   <FlatList
 *     data={data?.pages.flatMap(page => page.items)}
 *     keyExtractor={(item) => item.id.toString()}
 *     renderItem={({ item: playlist }) => (
 *       <Text>{playlist.name}</Text>
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
