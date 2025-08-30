import { useQuery } from "@tanstack/react-query"

import { type QuerySongsParams, songKeys } from "@repo/api"

import { getAllSongsWithMainRelations } from "../api/queries"

export function useFetchSongsWithMainRelations(params?: QuerySongsParams) {
  return useQuery({
    queryKey: songKeys.listWithMainRelations(params),
    queryFn: () => getAllSongsWithMainRelations(params)
  })
}
