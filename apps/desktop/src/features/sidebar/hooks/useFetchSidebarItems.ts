import { useQuery } from "@tanstack/react-query"

import { sidebarKeys } from "@repo/api"

import { getSidebarItems } from "../api/queries"

export function useFetchSidebarItems() {
  return useQuery({
    queryKey: sidebarKeys.list(),
    queryFn: getSidebarItems
  })
}
