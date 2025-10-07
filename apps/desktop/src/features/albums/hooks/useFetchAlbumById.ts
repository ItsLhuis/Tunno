import { useQuery } from "@tanstack/react-query"

import { albumKeys } from "@repo/api"

import { getAlbumById } from "../api/queries"

export function useFetchAlbumById(id: number | undefined | null) {
  return useQuery({
    queryKey: albumKeys.details(id!),
    queryFn: () => getAlbumById(id!),
    enabled: !!id
  })
}
