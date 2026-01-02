import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries } from "@repo/api"

import { toggleArtistFavorite } from "../api/mutations"

import { toast } from "@components/ui"

export function useToggleArtistFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleArtistFavorite(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: artistKeys.all })
    },
    onSuccess: async (artist) => {
      toast.success(artist.isFavorite ? t("favorites.createdTitle") : t("favorites.deletedTitle"), {
        description: artist.isFavorite
          ? t("favorites.createdDescription", { name: artist.name })
          : t("favorites.deletedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home"]
      })
    }
  })
}
