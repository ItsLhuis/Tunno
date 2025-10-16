import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getHiddenGems } from "../api/queries"

export function useFetchHiddenGems(options?: {
  limit?: number
  minYearsOld?: number
  maxPlayCount?: number
}) {
  const limit = options?.limit ?? 12
  const minYearsOld = options?.minYearsOld ?? 5
  const maxPlayCount = options?.maxPlayCount ?? 3

  return useQuery({
    queryKey: homeKeys.listHiddenGems({ limit, minYearsOld, maxPlayCount }),
    queryFn: () => getHiddenGems(limit, { minYearsOld, maxPlayCount })
  })
}
