import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@repo/api"

import { updateSong } from "../api/mutations"
import { getSongByIdWithMainRelations } from "../api/queries"

import { usePlayerStore } from "../stores/usePlayerStore"

import { toast } from "@components/ui"

export function useUpdateSong() {
  const queryClient = useQueryClient()

  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({
      id,
      updates,
      thumbnailAction,
      thumbnailPath,
      artists
    }: {
      id: Parameters<typeof updateSong>[0]
      updates: Parameters<typeof updateSong>[1]
      thumbnailAction?: Parameters<typeof updateSong>[2]
      thumbnailPath?: Parameters<typeof updateSong>[3]
      artists?: number[]
    }) => updateSong(id, updates, thumbnailAction, thumbnailPath, artists),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.list() })
    },
    onSuccess: async (song) => {
      const songWithMainRelations = await getSongByIdWithMainRelations(song.id)
      if (songWithMainRelations) {
        await updateTrackMetadata(songWithMainRelations)
      }
      
      toast.success(t("songs.updatedTitle"), {
        description: t("songs.updatedDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("songs.updatedFailedTitle"))
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.list() })
    }
  })
}
