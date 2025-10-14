import { useQuery } from "@tanstack/react-query"

import { playlistKeys } from "@repo/api"

import { getPlaylistByIdWithSongs } from "../api/queries"

export function useFetchPlaylistByIdWithSongs(id: number | null | undefined) {
  return useQuery({
    queryKey: playlistKeys.detailsWithSongs(id!),
    queryFn: () => getPlaylistByIdWithSongs(id!),
    enabled: !!id
  })
}
