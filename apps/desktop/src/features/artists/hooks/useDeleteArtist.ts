import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys } from "@repo/api"

import { deleteArtist } from "../api/mutations"

import { toast } from "@components/ui"

export function useDeleteArtist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteArtist(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: artistKeys.list() })
    },
    onSuccess: async (artist) => {
      toast.success(t("artists.deletedTitle"), {
        description: t("artists.deletedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("artists.deletedFailedTitle"))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: artistKeys.list() })
    }
  })
}
