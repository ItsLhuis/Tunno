import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistByIdWithAllRelations } from "../api/queries"

export function useFetchPlaylistByIdWithAllRelations(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.detailsWithAllRelations(id!),
    queryFn: () => getPlaylistByIdWithAllRelations(id!),
    enabled: !!id
  })
}
