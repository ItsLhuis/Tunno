import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getOnRepeat } from "../api/queries"

export function useFetchOnRepeat(options?: { days?: number; limit?: number }) {
  const days = options?.days ?? 14
  const limit = options?.limit ?? 3

  return useQuery({
    queryKey: homeKeys.listOnRepeat({ days, limit }),
    queryFn: () => getOnRepeat(limit, days)
  })
}
