import { useQuery } from "@tanstack/react-query"

import { getSongIdsByAlbumIds } from "../api/queries"

import { songKeys } from "@repo/api"

export function useFetchSongIdsByAlbumIds(albumIds: number[] | null | undefined) {
  return useQuery({
    queryKey: songKeys.listSongIdsByAlbumIds(albumIds || []),
    queryFn: () => getSongIdsByAlbumIds(albumIds!),
    enabled: !!albumIds && albumIds.length > 0
  })
}
