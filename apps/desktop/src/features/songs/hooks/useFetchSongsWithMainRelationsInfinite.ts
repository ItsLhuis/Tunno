import { useInfiniteQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongsWithMainRelationsPaginated } from "../api/queries"

export function useFetchSongsWithMainRelationsInfinite(params?: QuerySongsParams) {
  return useInfiniteQuery({
    queryKey: songKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam = 0 }) => {
      return getSongsWithMainRelationsPaginated({
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
