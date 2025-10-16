import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getTopAlbums } from "../api/queries"

export function useFetchTopAlbums(options?: { limit?: number }) {
  const limit = options?.limit ?? 10

  return useQuery({
    queryKey: homeKeys.listTopAlbums({ limit }),
    queryFn: () => getTopAlbums(limit)
  })
}
