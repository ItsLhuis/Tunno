import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAllAlbums } from "../api/queries"

export function useFetchAlbums(params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.list(params),
    queryFn: () => getAllAlbums(params)
  })
}
