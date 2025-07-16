import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@repo/api"

import { createSong } from "../api/mutations"

import { toast } from "@components/ui"

export function useCreateSong() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: createSong,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.listWithRelations() })
    },
    onSuccess: (song) => {
      toast.success(t("songs.createdTitle"), {
        description: t("songs.createdDescription", { name: song.name })
      })
    },
    onError: (error) => {
      toast.error(t("songs.createdFailedTitle"), {
        description: error.message
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.listWithRelations() })
    }
  })
}
