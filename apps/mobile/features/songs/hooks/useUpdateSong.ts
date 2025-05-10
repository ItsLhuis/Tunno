import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@features/songs/api/keys"

import { updateSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

export function useUpdateSong() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Parameters<typeof updateSong>[1] }) =>
      updateSong(id, updates),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.detailsWithRelations(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.listWithRelations() })
    },
    onSuccess: (song) => {
      toast.success(t("songs.updatedTitle"), {
        description: t("songs.updatedDescription", { name: song.name })
      })
    },
    onError: (error) => {
      toast.error(t("songs.updatedFailedTitle"), {
        description: error.message
      })
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.detailsWithRelations(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.listWithRelations() })
    }
  })
}
