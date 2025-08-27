import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsFilteredByArtistsWithRelations } from "../api/queries"

export function useFetchAlbumsByArtistsWithRelations(artistIds: number[], params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listByArtistsWithRelations(artistIds, params),
    queryFn: () => getAlbumsFilteredByArtistsWithRelations(artistIds, params),
    enabled: !!artistIds?.length
  })
}
