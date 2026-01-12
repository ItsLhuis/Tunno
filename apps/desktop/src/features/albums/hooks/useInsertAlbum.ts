import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries, isCustomError } from "@repo/api"

import { insertAlbum } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertAlbumType } from "@repo/schemas"

/**
 * Custom hook for inserting a new album.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * creation of a new album. It includes:
 * - Invalidating relevant queries (`albumKeys.all`) to refetch data after insertion.
 * - Error and success handling with toast notifications.
 * - Logic to invalidate specific related queries (`home`) after insertion.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an `InsertAlbumType` object as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: insertNewAlbum, isPending } = useInsertAlbum();
 *
 * const handleInsert = (albumData: InsertAlbumType) => {
 *   insertNewAlbum(albumData);
 * };
 *
 * // In a component:
 * <Button onClick={() => handleInsert(newAlbum)} disabled={isPending}>
 *   Add Album
 * </Button>
 * ```
 */
export function useInsertAlbum() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (album: InsertAlbumType) => {
      const { thumbnail, artists, ...rest } = album
      const createdAlbum = await insertAlbum(rest, thumbnail, artists, t)
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
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("albums.createdFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["home"]
      })
    }
  })
}
