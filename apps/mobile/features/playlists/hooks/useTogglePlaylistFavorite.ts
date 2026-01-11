import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { togglePlaylistFavorite } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for toggling a playlist's favorite status.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of a playlist's favorite status. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Invalidation of relevant queries (`home`, `songs` relations) to refetch data after the update.
 * - Error and success handling with toast notifications, dynamically displaying messages based on the new favorite status.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an `id` (number) as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: toggleFavorite, isLoading } = useTogglePlaylistFavorite();
 *
 * const handleToggle = (playlistId: number) => {
 *   toggleFavorite(playlistId);
 * };
 *
 * // In a component:
 * <Button onPress={() => handleToggle(playlist.id)} disabled={isLoading}>
 *   {playlist.isFavorite ? "Unfavorite Playlist" : "Favorite Playlist"}
 * </Button>
 * ```
 */
export function useTogglePlaylistFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (id: number) => {
      const updatedPlaylist = await togglePlaylistFavorite(id)
      return updatedPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (updatedPlaylist) => {
      if (!updatedPlaylist) return

      toast.success(
        updatedPlaylist.isFavorite ? t("favorites.createdTitle") : t("favorites.deletedTitle"),
        {
          description: updatedPlaylist.isFavorite
            ? t("favorites.createdDescription", { name: updatedPlaylist.name })
            : t("favorites.deletedDescription", { name: updatedPlaylist.name })
        }
      )
    },
    onError: () => {
      toast.error(t("favorites.deletedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
