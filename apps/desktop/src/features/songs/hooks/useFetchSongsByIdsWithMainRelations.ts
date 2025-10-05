import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongsByIdsWithMainRelations } from "../api/queries"

export function useFetchSongsByIdsWithMainRelations(ids: number[] | null | undefined) {
  return useQuery({
    queryKey: [...songKeys.listWithMainRelations(), "byIds", ids || []],
    queryFn: () => getSongsByIdsWithMainRelations(ids!),
    enabled: !!ids && ids.length > 0
  })
}
