import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistById } from "../api/queries"

export function useFetchPlaylistById(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.details(id!),
    queryFn: () => getPlaylistById(id!),
    enabled: !!id
  })
}
