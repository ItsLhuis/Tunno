import { useQuery } from "@tanstack/react-query"

import { homeKeys } from "@repo/api"

import { getYourPlaylists } from "../api/queries"

export function useFetchYourPlaylists(options?: { limit?: number; favoritesOnly?: boolean }) {
  const limit = options?.limit ?? 48
  const favoritesOnly = options?.favoritesOnly ?? false

  return useQuery({
    queryKey: homeKeys.listYourPlaylists({ limit, favorites: favoritesOnly }),
    queryFn: () => getYourPlaylists(limit, favoritesOnly)
  })
}
