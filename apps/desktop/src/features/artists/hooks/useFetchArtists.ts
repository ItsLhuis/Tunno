import { useQuery } from "@tanstack/react-query"

import { artistKeys, type QueryArtistParams } from "@repo/api"

import { getAllArtists } from "../api/queries"

export function useFetchArtists(params?: QueryArtistParams) {
  return useQuery({
    queryKey: artistKeys.list(params),
    queryFn: () => getAllArtists(params)
  })
}
