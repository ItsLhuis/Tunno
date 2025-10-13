import { useQuery } from "@tanstack/react-query"

import { getSongsByAlbumIds } from "../api/queries"

import { songKeys } from "@repo/api"

export function useFetchSongsByAlbumIds(ids: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listByAlbumIds(ids || []),
    queryFn: () => getSongsByAlbumIds(ids!),
    enabled: !!ids && ids.length > 0
  })
}
