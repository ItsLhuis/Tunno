import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@repo/api"
import { createSong } from "../api/mutations"

import { toast } from "@components/ui"
import { type InsertSongType } from "@repo/schemas"

export function useCreateSong() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (song: InsertSongType) => {
      const { file, thumbnail, ...rest } = song
      const createdSong = await createSong(rest, file, thumbnail)
      return createdSong
    },
    onSuccess: (createdSong) => {
      if (!createdSong) return

      toast.success(t("songs.createdTitle"), {
        description: t("songs.createdDescription", { name: createdSong.name })
      })

      queryClient.refetchQueries({ queryKey: songKeys.listWithRelations() })
    },
    onError: (error: any) => {
      toast.error(t("songs.createdFailedTitle"), {
        description: error.message
      })
    }
  })
}
