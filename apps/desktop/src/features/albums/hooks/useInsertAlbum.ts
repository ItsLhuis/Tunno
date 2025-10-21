import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries } from "@repo/api"

import { insertAlbum } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertAlbumType } from "@repo/schemas"

export function useInsertAlbum() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (album: InsertAlbumType) => {
      const { thumbnail, artists, ...rest } = album
      const createdAlbum = await insertAlbum(rest, thumbnail, artists)
      return createdAlbum
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: albumKeys.all })
    },
    onSuccess: (createdAlbum) => {
      if (!createdAlbum) return

      toast.success(t("albums.createdTitle"), {
        description: t("albums.createdDescription", { name: createdAlbum.name })
      })
    },
    onError: () => {
      toast.error(t("albums.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["home"]
      })
    }
  })
}
