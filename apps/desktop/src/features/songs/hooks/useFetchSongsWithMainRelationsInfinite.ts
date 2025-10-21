import { useInfiniteQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongsWithMainRelationsPaginated } from "../api/queries"

export function useFetchSongsWithMainRelationsInfinite(params?: QuerySongsParams) {
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
