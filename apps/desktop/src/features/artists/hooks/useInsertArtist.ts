import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries } from "@repo/api"

import { insertArtist } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertArtistType } from "@repo/schemas"

export function useInsertArtist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (artist: InsertArtistType) => {
      const { thumbnail, ...rest } = artist
      const createdArtist = await insertArtist(rest, thumbnail)
      return createdArtist
    },
    onSuccess: (createdArtist) => {
      if (!createdArtist) return

      toast.success(t("artists.createdTitle"), {
        description: t("artists.createdDescription", { name: createdArtist.name })
      })
    },
    onError: () => {
      toast.error(t("artists.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home"]
      })
    }
  })
}
