import { useInfiniteQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsPaginated } from "../api/queries"

export function useFetchAlbumsInfinite(params?: QueryAlbumParams) {
  return useInfiniteQuery({
    queryKey: albumKeys.listInfinite(params),
    queryFn: ({ pageParam = 0 }) =>
      getAlbumsPaginated({
        ...params,
        offset: pageParam
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextOffset : undefined
    },
    initialPageParam: 0
  })
}
