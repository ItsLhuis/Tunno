import { useQuery } from "@tanstack/react-query"

import { sidebarKeys } from "@repo/api"

import { getSidebarItems } from "../api/queries"

/**
 * Custom hook for fetching all items pinned to the sidebar.
 *
 * This hook leverages `@tanstack/react-query`'s `useQuery` to handle the asynchronous
 * fetching and caching of the sidebar items, which are enriched with details like
 * name and thumbnail.
 *
 * @returns A `UseQueryResult` object from `@tanstack/react-query` containing the sidebar items data,
 *          loading state, error state, and other query properties.
 *
 * @example
 * ```tsx
 * const { data: sidebarItems, isLoading, isError } = useFetchSidebarItems();
 *
 * if (isLoading) return <p>Loading sidebar...</p>;
 * if (isError) return <p>Error loading sidebar!</p>;
 *
 * return (
 *   <nav>
 *     {sidebarItems?.map(item => (
 *       <div key={item.id}>{item.name}</div>
 *     ))}
 *   </nav>
 * );
 * ```
 */
export function useFetchSidebarItems() {
  return useQuery({
    queryKey: sidebarKeys.list(),
    queryFn: getSidebarItems
  })
}
