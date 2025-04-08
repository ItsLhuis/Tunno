import { useQuery } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { getSongById } from "@features/songs/api/queries"

export function useFetchSongById(id: number) {
  return useQuery({
    queryKey: songKeys.details(id),
    queryFn: () => getSongById(id)
  })
}
