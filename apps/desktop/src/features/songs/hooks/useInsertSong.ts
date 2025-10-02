import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, artistKeys, playlistKeys, songKeys } from "@repo/api"

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
    },
    onError: () => {
      toast.error(t("songs.createdFailedTitle"))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all })
      queryClient.invalidateQueries({ queryKey: artistKeys.all })
      queryClient.invalidateQueries({ queryKey: albumKeys.all })
      queryClient.invalidateQueries({ queryKey: playlistKeys.all })
    }
  })
}
