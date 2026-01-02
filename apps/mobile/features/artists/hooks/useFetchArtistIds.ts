import { useQuery } from "@tanstack/react-query"

import { type QueryArtistParams, artistKeys } from "@repo/api"

import { getArtistIdsOnly } from "../api/queries"

export function useFetchArtistIds(params?: QueryArtistParams) {
  return useQuery({
    queryKey: artistKeys.listIdsOnly(params),
    queryFn: async () => {
      return getArtistIdsOnly(params)
    }
  })
}
