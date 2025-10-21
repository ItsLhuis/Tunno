import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, songKeys } from "@repo/api"

import { toggleSongFavorite } from "../api/mutations"
import { getSongByIdWithMainRelations } from "../api/queries"

import { usePlayerStore } from "../stores/usePlayerStore"

import { toast } from "@components/ui"

export function useToggleSongFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleSongFavorite(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })
    },
    onSuccess: async (song) => {
      const songWithMainRelations = await getSongByIdWithMainRelations(song.id)
      if (songWithMainRelations) {
        queryClient.setQueryData(songKeys.detailsWithMainRelations(song.id), songWithMainRelations)
        await updateTrackMetadata(songWithMainRelations)
      }

      toast.success(song.isFavorite ? t("favorites.deletedTitle") : t("favorites.createdTitle"), {
        description: song.isFavorite
          ? t("favorites.deletedDescription", { name: song.name })
          : t("favorites.createdDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "song", {
        relations: ["home"]
      })
    }
  })
}
