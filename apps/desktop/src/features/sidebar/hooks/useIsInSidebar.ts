import { useQuery } from "@tanstack/react-query"

import { sidebarKeys, type SidebarEntityType } from "@repo/api"

import { isInSidebar } from "../api/queries"

/**
 * Custom hook to check if a specific entity is present in the sidebar.
 *
 * This hook uses `@tanstack/react-query` to fetch and cache the boolean status
 * indicating whether the given entity (e.g., an album, artist, or playlist)
 * is currently pinned to the sidebar.
 *
 * @param entityType - The type of the entity to check (e.g., "playlist", "album").
 * @param entityId - The unique identifier of the entity. The query is disabled if this is `null`.
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing a boolean value.
 *
 * @example
 * ```tsx
 * const { data: isPinned, isLoading } = useIsInSidebar("album", 123);
 *
 * if (isLoading) {
 *   return <p>Checking status...</p>;
 * }
 *
 * return (
 *   <p>
 *     Album is in sidebar: {isPinned ? "Yes" : "No"}
 *   </p>
 * );
 * ```
 */
export function useIsInSidebar(entityType: SidebarEntityType, entityId: number | null) {
  return useQuery({
    queryKey: sidebarKeys.check(entityType, entityId ?? 0),
    queryFn: () => isInSidebar(entityType, entityId!),
    enabled: entityId !== null
  })
}
