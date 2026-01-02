import { useQuery } from "@tanstack/react-query"

import { playlistKeys, type QueryPlaylistParams } from "@repo/api"

import { getAllPlaylists } from "../api/queries"

export function useFetchPlaylists(params?: QueryPlaylistParams) {
  return useQuery({
    queryKey: playlistKeys.list(params),
    queryFn: () => getAllPlaylists(params)
  })
}
