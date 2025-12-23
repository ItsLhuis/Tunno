import { type SidebarEntityType } from "./types"

export const sidebarKeys = {
  all: ["sidebar"] as const,
  list: () => [...sidebarKeys.all, "list"] as const,
  check: (entityType: SidebarEntityType, entityId: number) =>
    [...sidebarKeys.all, "check", entityType, entityId] as const
}
