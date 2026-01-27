import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries } from "@repo/api"

import { toggleAlbumFavorite } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for toggling an album's favorite status.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of an album's favorite status. It includes:
 * - Optimistic query cancellation (`albumKeys.all`).
 * - Invalidation of relevant queries (`home` relations) to refetch data after the update.
 * - Error and success handling with toast notifications, dynamically displaying messages based on the new favorite status.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: toggleFavorite, isPending } = useToggleAlbumFavorite();
 *
 * const handleToggle = (albumId: number) => {
 *   toggleFavorite({ id: albumId });
 * };
 *
 * // In a component:
 * <button onClick={() => handleToggle(album.id)} disabled={isPending}>
 *   {album.isFavorite ? "Unfavorite Album" : "Favorite Album"}
 * </button>
 * ```
 */
export function useToggleAlbumFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleAlbumFavorite(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: albumKeys.all })
    },
    onSuccess: async (album) => {
      toast.success(album.isFavorite ? t("favorites.deletedTitle") : t("favorites.createdTitle"), {
        description: album.isFavorite
          ? t("favorites.deletedDescription", { name: album.name })
          : t("favorites.createdDescription", { name: album.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["home"]
      })
    }
  })
}
