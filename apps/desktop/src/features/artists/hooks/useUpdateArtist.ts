import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys } from "@repo/api"

import { updateArtist } from "../api/mutations"

import { toast } from "@components/ui"

export function useUpdateArtist() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

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
      toast.success(t("artists.updatedTitle"), {
        description: t("artists.updatedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("artists.updatedFailedTitle"))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.all })
    }
  })
}
