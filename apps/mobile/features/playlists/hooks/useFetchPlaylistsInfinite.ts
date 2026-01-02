import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryPlaylistParams, playlistKeys } from "@repo/api"

import { getPlaylistsPaginated } from "../api/queries"

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
