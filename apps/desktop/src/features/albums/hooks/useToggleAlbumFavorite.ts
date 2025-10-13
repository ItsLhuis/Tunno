import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries } from "@repo/api"

import { toggleAlbumFavorite } from "../api/mutations"

import { toast } from "@components/ui"

export function useToggleAlbumFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleAlbumFavorite(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: albumKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: albumKeys.list() })
    },
    onSuccess: async (album) => {
      toast.success(album.isFavorite ? t("favorites.deletedTitle") : t("favorites.createdTitle"), {
        description: album.isFavorite
          ? t("favorites.deletedDescription", { name: album.name })
          : t("favorites.createdDescription", { name: album.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album")
    }
  })
}
