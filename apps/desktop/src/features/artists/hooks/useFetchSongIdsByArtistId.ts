import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getSongIdsByArtistId } from "../api/queries"

export function useFetchSongIdsByArtistId(artistId: number | undefined | null) {
  return useQuery({
    queryKey: artistKeys.listSongIdsOnly(artistId!),
    queryFn: () => getSongIdsByArtistId(artistId!),
    enabled: !!artistId
  })
}
