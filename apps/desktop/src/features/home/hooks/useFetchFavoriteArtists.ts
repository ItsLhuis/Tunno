import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getFavoriteArtists } from "../api/queries"

export function useFetchFavoriteArtists(options?: { limit?: number }) {
  const limit = options?.limit ?? 12

  return useQuery({
    queryKey: homeKeys.listFavoriteArtists({ limit }),
    queryFn: () => getFavoriteArtists(limit)
  })
}
