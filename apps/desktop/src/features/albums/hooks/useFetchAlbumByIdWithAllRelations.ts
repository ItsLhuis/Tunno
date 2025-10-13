import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithAllRelations } from "../api/queries"

export function useFetchAlbumByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithAllRelations(id!),
    queryFn: () => getAlbumByIdWithAllRelations(id!),
    enabled: !!id
  })
}
