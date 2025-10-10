import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { deleteArtist } from "../api/mutations"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { toast } from "@components/ui"

export function useDeleteArtist() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { currentTrackId, updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      updateTrackMetadata: state.updateTrackMetadata
    }))
  )

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteArtist(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: artistKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: artistKeys.list() })
    },
    onSuccess: async (artist) => {
      if (currentTrackId) {
        const currentSong = await getSongByIdWithMainRelations(currentTrackId)
        if (currentSong?.artists?.some((a) => a.artistId === artist.id)) {
          await updateTrackMetadata(currentSong)
        }
      }

      toast.success(t("artists.deletedTitle"), {
        description: t("artists.deletedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("artists.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["songs", "albums"]
      })
    }
  })
}
