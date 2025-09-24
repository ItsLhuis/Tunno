import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@repo/api"

import { toggleSongFavorite } from "../api/mutations"
import { getSongByIdWithMainRelations } from "../api/queries"

import { usePlayerStore } from "../stores/usePlayerStore"

export function useToggleSongFavorite() {
  const queryClient = useQueryClient()

  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleSongFavorite(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.list() })
    },
    onSuccess: async (song) => {
      const songWithMainRelations = await getSongByIdWithMainRelations(song.id)
      if (songWithMainRelations) {
        await updateTrackMetadata(songWithMainRelations)
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.list() })
    }
  })
}
