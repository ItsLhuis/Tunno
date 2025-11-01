import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { deletePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePlaylist(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: async (deletedPlaylist) => {
      if (!deletedPlaylist) return

      const currentPath = router.state.location.pathname
      const playlistDetailPath = `/playlists/${deletedPlaylist.id}`

      if (currentPath === playlistDetailPath) {
        await router.navigate({ to: "/playlists", replace: true })
      }

      toast.success(t("playlists.deletedTitle"), {
        description: t("playlists.deletedDescription", { name: deletedPlaylist.name })
      })
    },
    onError: () => {
      toast.error(t("playlists.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
