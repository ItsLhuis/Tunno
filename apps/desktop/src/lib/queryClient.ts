import { QueryClient } from "@tanstack/react-query"

/**
 * The global `QueryClient` instance for `@tanstack/react-query`.
 *
 * This client is configured with default options for all queries:
 * - `refetchOnMount`: `false` to prevent automatic refetching on component mount.
 * - `refetchOnWindowFocus`: `false` to prevent automatic refetching when the window regains focus.
 * - `retry`: `2` attempts for failed queries.
 * - `retryDelay`: `1000` milliseconds delay between retries.
 * - `staleTime`: `5` minutes before data is considered stale.
 * - `gcTime`: `10` minutes before inactive query data is garbage collected.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000
    }
  }
})
