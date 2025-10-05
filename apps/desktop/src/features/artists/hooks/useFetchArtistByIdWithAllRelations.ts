import { useQuery } from "@tanstack/react-query"

import { artistKeys } from "@repo/api"

import { getArtistByIdWithAllRelations } from "../api/queries"

export function useFetchArtistByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: artistKeys.detailsWithAllRelations(id!),
    queryFn: () => getArtistByIdWithAllRelations(id!),
    enabled: !!id
  })
}
