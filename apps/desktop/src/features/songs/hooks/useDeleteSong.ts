import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, songKeys } from "@repo/api"

import { deleteSong } from "../api/mutations"
import { usePlayerStore } from "../stores/usePlayerStore"

import { toast } from "@components/ui"

export function useDeleteSong() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  const removeSongById = usePlayerStore((state) => state.removeSongById)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSong(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })

      await removeSongById(id)
    },
    onSuccess: async (song) => {
      const currentPath = router.state.location.pathname
      const songDetailPath = `/songs/${song.id}`

      if (currentPath === songDetailPath) {
        await router.navigate({ to: "/songs", replace: true })
      }

      toast.success(t("songs.deletedTitle"), {
        description: t("songs.deletedDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("songs.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "song", {
        relations: ["home", "artists", "albums", "playlists"]
      })
    }
  })
}
