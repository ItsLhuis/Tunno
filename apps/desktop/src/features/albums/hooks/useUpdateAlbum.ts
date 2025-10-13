import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { updateAlbum } from "../api/mutations"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../songs/stores/usePlayerStore"

import { toast } from "@components/ui"

export function useUpdateAlbum() {
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
      thumbnailPath,
      artists
    }: {
      id: Parameters<typeof updateAlbum>[0]
      updates: Parameters<typeof updateAlbum>[1]
      thumbnailAction?: Parameters<typeof updateAlbum>[2]
      thumbnailPath?: Parameters<typeof updateAlbum>[3]
      artists?: Parameters<typeof updateAlbum>[4]
    }) => updateAlbum(id, updates, thumbnailAction, thumbnailPath, artists),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: albumKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: albumKeys.list() })
    },
    onSuccess: async (album) => {
      if (currentTrackId) {
        const currentSong = await getSongByIdWithMainRelations(currentTrackId)
        if (currentSong?.album?.id === album.id) {
          await updateTrackMetadata(currentSong)
        }
      }

      toast.success(t("albums.updatedTitle"), {
        description: t("albums.updatedDescription", { name: album.name })
      })
    },
    onError: () => {
      toast.error(t("albums.updatedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["songs", "artists"]
      })
    }
  })
}
