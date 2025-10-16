import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { updateArtist } from "../api/mutations"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { toast } from "@components/ui"

export function useUpdateArtist() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { currentTrackId, updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      updateTrackMetadata: state.updateTrackMetadata
    }))
  )

  return useMutation({
    mutationFn: ({
      id,
      updates,
      thumbnailAction,
      thumbnailPath
    }: {
      id: Parameters<typeof updateArtist>[0]
      updates: Parameters<typeof updateArtist>[1]
      thumbnailAction?: Parameters<typeof updateArtist>[2]
      thumbnailPath?: Parameters<typeof updateArtist>[3]
    }) => updateArtist(id, updates, thumbnailAction, thumbnailPath),
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

      toast.success(t("artists.updatedTitle"), {
        description: t("artists.updatedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("artists.updatedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home", "songs", "albums"]
      })
    }
  })
}
