import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumByIdWithSongsAndArtists } from "../api/queries"

export function useFetchAlbumByIdWithSongsAndArtists(id: number | null | undefined) {
  return useQuery({
    queryKey: albumKeys.detailsWithSongsAndArtists(id!),
    queryFn: () => getAlbumByIdWithSongsAndArtists(id!),
    enabled: !!id
  })
}
