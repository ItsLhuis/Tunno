import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, songKeys, type SongRelations } from "@repo/api"

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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })
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
    onSettled: (_, __, variables) => {
      const { artists, albumId } = variables

      const relations: SongRelations[] = []

      if (artists.length > 0) {
        relations.push("artists")
      }

      if (albumId) {
        relations.push("albums")
      }

      relations.push("home")

      invalidateQueries(queryClient, "song", {
        relations: relations.length > 0 ? relations : undefined
      })
    }
  })
}
