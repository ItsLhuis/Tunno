import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { insertPlaylist } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertPlaylistType } from "@repo/schemas"

export function useInsertPlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (playlist: InsertPlaylistType) => {
      const { thumbnail, ...rest } = playlist
      const createdPlaylist = await insertPlaylist(rest, thumbnail)
      return createdPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (createdPlaylist) => {
      if (!createdPlaylist) return

      toast.success(t("playlists.createdTitle"), {
        description: t("playlists.createdDescription", { name: createdPlaylist.name })
      })
    },
    onError: () => {
      toast.error(t("playlists.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
