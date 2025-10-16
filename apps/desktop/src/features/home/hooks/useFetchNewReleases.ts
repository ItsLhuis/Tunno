import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getNewReleases } from "../api/queries"

export function useFetchNewReleases(options?: { limit?: number; days?: number }) {
  const limit = options?.limit ?? 8
  const days = options?.days ?? 30

  return useQuery({
    queryKey: homeKeys.listNewReleases({ limit, days }),
    queryFn: () => getNewReleases(limit, days)
  })
}
