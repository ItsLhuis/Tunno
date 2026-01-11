import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries } from "@repo/api"

import { toggleArtistFavorite } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for toggling an artist's favorite status.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of an artist's favorite status. It includes:
 * - Optimistic query cancellation (`artistKeys.all`).
 * - Invalidation of relevant queries (`home` relations) to refetch data after the update.
 * - Error and success handling with toast notifications, dynamically displaying messages based on the new favorite status.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: toggleFavorite, isLoading } = useToggleArtistFavorite();
 *
 * const handleToggle = (artistId: number) => {
 *   toggleFavorite({ id: artistId });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleToggle(artist.id)} disabled={isLoading}>
 *   {artist.isFavorite ? "Unfavorite Artist" : "Favorite Artist"}
 * </Button>
 * ```
 */
export function useToggleArtistFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleArtistFavorite(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: artistKeys.all })
    },
    onSuccess: async (artist) => {
      toast.success(artist.isFavorite ? t("favorites.createdTitle") : t("favorites.deletedTitle"), {
        description: artist.isFavorite
          ? t("favorites.createdDescription", { name: artist.name })
          : t("favorites.deletedDescription", { name: artist.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home"]
      })
    }
  })
}
