import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithArtists } from "../api/queries"

export function useFetchAlbumByIdWithArtists(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithArtists(id!),
    queryFn: () => getAlbumByIdWithArtists(id!),
    enabled: !!id
  })
}
