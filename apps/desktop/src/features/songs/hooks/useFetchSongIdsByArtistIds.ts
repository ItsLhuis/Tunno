import { useQuery } from "@tanstack/react-query"

import { getSongIdsByArtistIds } from "../api/queries"

import { songKeys } from "@repo/api"

export function useFetchSongIdsByArtistIds(artistIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByArtistIds(artistIds || []),
    queryFn: () => getSongIdsByArtistIds(artistIds!),
    enabled: !!artistIds && artistIds.length > 0
  })
}
