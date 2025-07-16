import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getAllSongsWithRelations, type QuerySongsParams } from "../api/queries"

export function useFetchSongsWithRelations(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listWithRelations(),
    queryFn: () => getAllSongsWithRelations(params)
  })
}
