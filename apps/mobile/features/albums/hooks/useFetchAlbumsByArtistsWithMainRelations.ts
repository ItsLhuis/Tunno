import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsFilteredByArtistsWithMainRelations } from "../api/queries"

export function useFetchAlbumsByArtistsWithMainRelations(
  artistIds: number[],
  params?: QueryAlbumParams
) {
  return useQuery({
    queryKey: albumKeys.listByArtistsWithMainRelations(artistIds, params),
    queryFn: () => getAlbumsFilteredByArtistsWithMainRelations(artistIds, params),
    enabled: !!artistIds?.length
  })
}
