import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter, usePathname } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { deletePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  const router = useRouter()
  const pathname = usePathname()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePlaylist(id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },

    onSuccess: async (deletedPlaylist) => {
      if (!deletedPlaylist) return

      const playlistDetailPath = `/playlists/${deletedPlaylist.id}`

      if (pathname === playlistDetailPath) {
        router.replace("/playlists")
      }

      toast.success(t("playlists.deletedTitle"), {
        description: t("playlists.deletedDescription", {
          name: deletedPlaylist.name
        })
      })
    },

    onError: () => {
      toast.error(t("playlists.deletedFailedTitle"))
    },

    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs", "sidebar"]
      })
    }
  })
}
