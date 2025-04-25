import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { getSongByIdWithRelations } from "@features/songs/api/queries"

export function useFetchSongByIdWithRelations(id: number) {
  return useQuery({
    queryKey: songKeys.detailsWithRelations(id),
    queryFn: () => getSongByIdWithRelations(id)
  })
}
