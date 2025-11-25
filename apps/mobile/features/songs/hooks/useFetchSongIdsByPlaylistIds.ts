import { useQuery } from "@tanstack/react-query"

import { getSongIdsByPlaylistIds } from "../api/queries"

import { songKeys } from "@repo/api"

export function useFetchSongIdsByPlaylistIds(playlistIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByPlaylistIds(playlistIds || []),
    queryFn: () => getSongIdsByPlaylistIds(playlistIds!),
    enabled: !!playlistIds && playlistIds.length > 0
  })
}
