import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { updatePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

import { type UpdatePlaylistType } from "@repo/schemas"

type UpdatePlaylistParams = {
  id: number
  updates: Omit<UpdatePlaylistType, "thumbnail">
  thumbnailAction?: "keep" | "update" | "remove"
  thumbnailPath?: string
}

export function useUpdatePlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({ id, updates, thumbnailAction, thumbnailPath }: UpdatePlaylistParams) => {
      const updatedPlaylist = await updatePlaylist(id, updates, thumbnailAction, thumbnailPath)
      return updatedPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (updatedPlaylist) => {
      if (!updatedPlaylist) return

      toast.success(t("playlists.updatedTitle"), {
        description: t("playlists.updatedDescription", { name: updatedPlaylist.name })
      })
    },
    onError: () => {
      toast.error(t("playlists.updatedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
