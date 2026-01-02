import { useInfiniteQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsPaginated } from "../api/queries"

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
