import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, artistKeys, playlistKeys, songKeys } from "@repo/api"

import { toggleArtistFavorite } from "../api/mutations"

import { toast } from "@components/ui"

export function useToggleArtistFavorite() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleArtistFavorite(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: artistKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: artistKeys.list() })
    },
    onSuccess: async (artist) => {
      toast.success(artist.isFavorite ? t("favorites.deletedTitle") : t("favorites.createdTitle"), {
        description: artist.isFavorite
          ? t("favorites.deletedDescription", { name: artist.name })
          : t("favorites.createdDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.all })
      queryClient.invalidateQueries({ queryKey: songKeys.all })
      queryClient.invalidateQueries({ queryKey: albumKeys.all })
      queryClient.invalidateQueries({ queryKey: playlistKeys.all })
    }
  })
}
