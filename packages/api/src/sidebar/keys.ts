import { type SidebarEntityType } from "./types"

/**
 * Query keys for sidebar-related data.
 *
 * Provides a structured way to generate unique keys for React Query,
 * enabling efficient caching and invalidation of sidebar data.
 *
 * Base keys:
 * - `all`: all sidebar data
 *
 * Methods:
 * - `list()`: list sidebar items
 * - `check(entityType, entityId)`: check the presence of a specific entity in the sidebar
 */
export const sidebarKeys = {
  all: ["sidebar"] as const,
  list: () => [...sidebarKeys.all, "list"] as const,
  check: (entityType: SidebarEntityType, entityId: number) =>
    [...sidebarKeys.all, "check", entityType, entityId] as const
}
