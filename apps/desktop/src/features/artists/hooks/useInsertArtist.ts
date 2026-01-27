import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries, isCustomError } from "@repo/api"

import { insertArtist } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertArtistType } from "@repo/schemas"

/**
 * Custom hook for inserting a new artist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * creation of a new artist. It includes:
 * - Invalidating relevant queries (`artistKeys.all`) to refetch data after insertion.
 * - Error and success handling with toast notifications.
 * - Logic to invalidate specific related queries (`home`) after insertion.
 * - Robust error handling for custom errors.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an `InsertArtistType` object as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: insertNewArtist, isPending } = useInsertArtist();
 *
 * const handleInsert = (artistData: InsertArtistType) => {
 *   insertNewArtist(artistData);
 * };
 *
 * // In a component:
 * <button onClick={() => handleInsert(newArtist)} disabled={isPending}>
 *   Add Artist
 * </button>
 * ```
 */
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
