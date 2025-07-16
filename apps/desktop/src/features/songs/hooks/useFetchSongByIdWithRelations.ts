import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongByIdWithRelations } from "../api/queries"

export function useFetchSongByIdWithRelations(id: number) {
  return useQuery({
    queryKey: songKeys.detailsWithRelations(id),
    queryFn: () => getSongByIdWithRelations(id)
  })
}
