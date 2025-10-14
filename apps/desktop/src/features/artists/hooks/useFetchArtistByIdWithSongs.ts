import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistByIdWithSongs } from "../api/queries"

export function useFetchArtistByIdWithSongs(id: number | null | undefined) {
  return useQuery({
    queryKey: artistKeys.detailsWithSongs(id!),
    queryFn: () => getArtistByIdWithSongs(id!),
    enabled: !!id
  })
}
