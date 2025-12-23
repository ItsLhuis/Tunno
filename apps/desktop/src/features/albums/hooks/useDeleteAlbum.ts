import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { deleteAlbum } from "../api/mutations"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

export function useDeleteAlbum() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  const { currentTrackId, updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      updateTrackMetadata: state.updateTrackMetadata
    }))
  )

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteAlbum(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: albumKeys.all })
    },
    onSuccess: async (album) => {
      if (currentTrackId) {
        const currentSong = await getSongByIdWithMainRelations(currentTrackId)
        if (currentSong?.album?.id === album.id) {
          await updateTrackMetadata(currentSong)
        }
      }

      const currentPath = router.state.location.pathname
      const albumDetailPath = `/albums/${album.id}`

      if (currentPath === albumDetailPath) {
        await router.navigate({ to: "/albums", replace: true })
      }

      toast.success(t("albums.deletedTitle"), {
        description: t("albums.deletedDescription", { name: album.name })
      })
    },
    onError: () => {
      toast.error(t("albums.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["home", "songs", "artists", "sidebar"]
      })
    }
  })
}
