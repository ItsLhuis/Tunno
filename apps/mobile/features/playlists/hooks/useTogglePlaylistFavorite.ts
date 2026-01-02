import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { togglePlaylistFavorite } from "../api/mutations"

import { toast } from "@components/ui"

export function useTogglePlaylistFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (id: number) => {
      const updatedPlaylist = await togglePlaylistFavorite(id)
      return updatedPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (updatedPlaylist) => {
      if (!updatedPlaylist) return

      toast.success(
        updatedPlaylist.isFavorite ? t("favorites.createdTitle") : t("favorites.deletedTitle"),
        {
          description: updatedPlaylist.isFavorite
            ? t("favorites.createdDescription", { name: updatedPlaylist.name })
            : t("favorites.deletedDescription", { name: updatedPlaylist.name })
        }
      )
    },
    onError: () => {
      toast.error(t("favorites.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
