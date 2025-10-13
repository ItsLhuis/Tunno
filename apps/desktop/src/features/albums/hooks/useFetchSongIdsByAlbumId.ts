import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getSongIdsByAlbumId } from "../api/queries"

export function useFetchSongIdsByAlbumId(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.listSongIdsOnly(id!),
    queryFn: () => getSongIdsByAlbumId(id!),
    enabled: !!id
  })
}
