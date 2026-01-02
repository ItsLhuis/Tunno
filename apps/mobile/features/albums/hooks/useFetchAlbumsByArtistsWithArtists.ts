import { useQuery } from "@tanstack/react-query"

import { albumKeys, type QueryAlbumParams } from "@repo/api"

import { getAlbumsFilteredByArtistsWithArtists } from "../api/queries"

export function useFetchAlbumsByArtistsWithArtists(artistIds: number[], params?: QueryAlbumParams) {
  return useQuery({
    queryKey: albumKeys.listByArtistsWithArtists(artistIds, params),
    queryFn: () => getAlbumsFilteredByArtistsWithArtists(artistIds, params),
    enabled: artistIds.length > 0
  })
}
