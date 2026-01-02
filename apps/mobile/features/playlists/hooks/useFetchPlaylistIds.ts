import { useQuery } from "@tanstack/react-query"

import { playlistKeys, type QueryPlaylistParams } from "@repo/api"

import { getPlaylistIdsOnly } from "../api/queries"

export function useFetchPlaylistIds(params?: QueryPlaylistParams) {
  return useQuery({
    queryKey: playlistKeys.listIdsOnly(params),
    queryFn: () => getPlaylistIdsOnly(params)
  })
}
