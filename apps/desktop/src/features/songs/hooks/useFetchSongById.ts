import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { getSongById } from "../api/queries"

export function useFetchSongById(id: number | null | undefined) {
  return useQuery({
    queryKey: songKeys.details(id!),
    queryFn: () => getSongById(id!),
    enabled: !!id
  })
}
