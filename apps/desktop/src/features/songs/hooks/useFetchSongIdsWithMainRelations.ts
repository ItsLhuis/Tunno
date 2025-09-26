import { useQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongIdsOnly } from "../api/queries"

export function useFetchSongIds(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listIdsOnly(params),
    queryFn: () => getSongIdsOnly(params || {}),
    staleTime: 2 * 60 * 1000, // 2 minutes - shorter since it's lightweight
    gcTime: 5 * 60 * 1000 // 5 minutes
  })
}
