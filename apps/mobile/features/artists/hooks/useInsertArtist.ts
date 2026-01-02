import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries, isCustomError } from "@repo/api"

import { insertArtist } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertArtistType } from "@repo/schemas"

export function useInsertArtist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (artist: InsertArtistType) => {
      const { thumbnail, ...rest } = artist
      const createdArtist = await insertArtist(rest, thumbnail, t)
      return createdArtist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: artistKeys.all })
    },
    onSuccess: (createdArtist) => {
      if (!createdArtist) return

      toast.success(t("artists.createdTitle"), {
        description: t("artists.createdDescription", { name: createdArtist.name })
      })
    },
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("artists.createdFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home"]
      })
    }
  })
}
