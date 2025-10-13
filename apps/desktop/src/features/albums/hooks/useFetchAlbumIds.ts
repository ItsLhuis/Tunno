import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumIdsOnly } from "../api/queries"

export function useFetchAlbumIds(params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listIdsOnly(params),
    queryFn: () => getAlbumIdsOnly(params)
  })
}
