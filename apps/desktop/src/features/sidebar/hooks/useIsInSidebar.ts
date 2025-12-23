import { useQuery } from "@tanstack/react-query"

import { sidebarKeys, type SidebarEntityType } from "@repo/api"

import { isInSidebar } from "../api/queries"

export function useIsInSidebar(entityType: SidebarEntityType, entityId: number | null) {
  return useQuery({
    queryKey: sidebarKeys.check(entityType, entityId ?? 0),
    queryFn: () => isInSidebar(entityType, entityId!),
    enabled: entityId !== null
  })
}
