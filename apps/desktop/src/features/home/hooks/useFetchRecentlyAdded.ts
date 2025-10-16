import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getRecentlyAdded } from "../api/queries"

export function useFetchRecentlyAdded(options?: { limit?: number }) {
  const limit = options?.limit ?? 12

  return useQuery({
    queryKey: homeKeys.listRecentlyAdded({ limit }),
    queryFn: () => getRecentlyAdded(limit)
  })
}
