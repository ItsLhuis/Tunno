import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getDiscover } from "../api/queries"

export function useFetchDiscover(options?: { limit?: number }) {
  const limit = options?.limit ?? 12

  return useQuery({
    queryKey: homeKeys.listDiscover({ limit }),
    queryFn: () => getDiscover(limit)
  })
}
