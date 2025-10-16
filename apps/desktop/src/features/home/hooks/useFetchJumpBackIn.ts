import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getJumpBackIn } from "../api/queries"

export function useFetchJumpBackIn(options?: { limit?: number; hours?: number }) {
  const limit = options?.limit ?? 16
  const hours = options?.hours ?? 48

  return useQuery({
    queryKey: homeKeys.listJumpBackIn({ limit, hours }),
    queryFn: () => getJumpBackIn(limit, hours)
  })
}
