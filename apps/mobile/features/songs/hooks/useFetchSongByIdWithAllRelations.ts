import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongByIdWithAllRelations } from "../api/queries"

export function useFetchSongByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.detailsWithAllRelations(id!),
    queryFn: () => getSongByIdWithAllRelations(id!),
    enabled: !!id
  })
}
