import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@repo/api"

import { deleteSong } from "../api/mutations"
import { usePlayerStore } from "../stores/usePlayerStore"

import { toast } from "@components/ui"

export function useDeleteSong() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const removeSongById = usePlayerStore((state) => state.removeSongById)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSong(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: songKeys.details(id)
      })
      await removeSongById(id)
      await queryClient.cancelQueries({ queryKey: songKeys.list() })
    },
    onSuccess: async (song) => {
      toast.success(t("songs.deletedTitle"), {
        description: t("songs.deletedDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("songs.deletedFailedTitle"))
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({
        queryKey: songKeys.details(id)
      })
      queryClient.invalidateQueries({ queryKey: songKeys.list() })
    }
  })
}
