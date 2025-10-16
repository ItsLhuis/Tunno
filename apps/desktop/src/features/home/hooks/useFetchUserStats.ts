import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getUserStats } from "../api/queries"

export function useFetchUserStats() {
  return useQuery({
    queryKey: homeKeys.listStats(),
    queryFn: () => getUserStats()
  })
}
