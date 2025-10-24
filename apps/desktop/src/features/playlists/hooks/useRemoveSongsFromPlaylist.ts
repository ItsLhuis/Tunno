import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { removeSongsFromPlaylist } from "../api/mutations"

import { toast } from "@components/ui"

export function useRemoveSongsFromPlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({ playlistId, songIds }: { playlistId: number; songIds: number[] }) => {
      await removeSongsFromPlaylist(playlistId, songIds)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: () => {
      toast.success(t("playlists.updatedTitle"))
    },
    onError: () => {
      toast.error(t("playlists.updatedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
