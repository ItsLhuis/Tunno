import { useQuery } from "@tanstack/react-query"

import { getSongsByArtistIds } from "../api/queries"

import { songKeys } from "@repo/api"

export function useFetchSongsByArtistIds(ids: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listByArtistIds(ids || []),
    queryFn: () => getSongsByArtistIds(ids!),
    enabled: !!ids && ids.length > 0
  })
}
