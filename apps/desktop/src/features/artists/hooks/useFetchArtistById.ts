import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistById } from "../api/queries"

export function useFetchArtistById(id: number | undefined | null) {
  return useQuery({
    queryKey: artistKeys.details(id!),
    queryFn: () => getArtistById(id!),
    enabled: !!id
  })
}
