import { useQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getSongIdsOnly } from "../api/queries"

export function useFetchSongIds(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listIdsOnly(params),
    queryFn: () => getSongIdsOnly(params || {})
  })
}
