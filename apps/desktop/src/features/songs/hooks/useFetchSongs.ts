import { useInfiniteQuery } from "@tanstack/react-query"

import { LIMIT } from "@api/constants"

import { songKeys } from "@features/songs/api/keys"

import { getAllSongs, type PaginatedSongsParams } from "@features/songs/api/queries"

export function useFetchSongs(params?: Omit<PaginatedSongsParams, "offset">) {
  return useInfiniteQuery({
    queryKey: songKeys.infinite(),
    queryFn: ({ pageParam }) => getAllSongs({ ...params, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.length > 0
      return hasMore ? allPages.length * (params?.limit || LIMIT) : undefined
    }
  })
}
