import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryArtistParams, artistKeys } from "@repo/api"

import { getArtistsPaginated } from "../api/queries"

export function useFetchArtistsWithMainRelationsInfinite(params?: QueryArtistParams) {
  return useInfiniteQuery({
    queryKey: artistKeys.listInfiniteWithMainRelations(params),
    queryFn: async ({ pageParam = 0 }) => {
      return getArtistsPaginated({
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
