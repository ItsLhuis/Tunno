import { useQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getAllSongsWithRelations } from "../api/queries"

export function useFetchSongsWithRelations(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listWithRelations(params),
    queryFn: () => getAllSongsWithRelations(params)
  })
}
