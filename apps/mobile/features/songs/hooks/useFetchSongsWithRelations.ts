import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { getAllSongsWithRelations, type QuerySongsParams } from "@features/songs/api/queries"

export function useFetchSongsWithRelations(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listWithRelations(),
    queryFn: () => getAllSongsWithRelations(params)
  })
}
