import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries } from "@repo/api"

import { deletePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePlaylist(id),
    onSuccess: (deletedPlaylist) => {
      if (!deletedPlaylist) return

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
