import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongByIdWithMainRelations } from "../api/queries"

export function useFetchSongByIdWithMainRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.detailsWithMainRelations(id!),
    queryFn: () => getSongByIdWithMainRelations(id!),
    enabled: !!id
  })
}
