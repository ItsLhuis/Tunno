import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { songKeys } from "@repo/api"

import { insertSong } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertSongType } from "@repo/schemas"

export function useInsertSong() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (song: InsertSongType) => {
      const { file, thumbnail, artists, ...rest } = song
      const createdSong = await insertSong(rest, artists, file, thumbnail)
      return createdSong
    },
    onSuccess: (createdSong) => {
      if (!createdSong) return

      toast.success(t("songs.createdTitle"), {
        description: t("songs.createdDescription", { name: createdSong.name })
      })

      queryClient.refetchQueries({ queryKey: songKeys.list() })
    },
    onError: (error: any) => {
      toast.error(t("songs.createdFailedTitle"), {
        description: error.message
      })
    }
  })
}
