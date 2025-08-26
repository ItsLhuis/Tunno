import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsFilteredByArtists } from "../api/queries"

export function useFetchAlbumsByArtists(artistIds: number[], params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listByArtists(artistIds, params),
    queryFn: () => getAlbumsFilteredByArtists(artistIds, params),
    enabled: !!artistIds?.length
  })
}
