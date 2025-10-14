import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryPlaylistParams, playlistKeys } from "@repo/api"

import { getPlaylistsPaginated } from "../api/queries"

export function useFetchPlaylistsInfinite(params?: QueryPlaylistParams) {
  return useInfiniteQuery({
    queryKey: playlistKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam = 0 }) => {
      return getPlaylistsPaginated({
        ...params,
        offset: pageParam
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextOffset : undefined
    }
  })
}
