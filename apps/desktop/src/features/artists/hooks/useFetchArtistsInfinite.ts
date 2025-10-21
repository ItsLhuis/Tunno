import { useInfiniteQuery } from "@tanstack/react-query"

import { type QueryArtistParams, artistKeys } from "@repo/api"

import { getArtistsPaginated } from "../api/queries"

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
