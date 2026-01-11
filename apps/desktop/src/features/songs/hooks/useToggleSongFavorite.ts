import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, songKeys } from "@repo/api"

import { toggleSongFavorite } from "../api/mutations"
import { getSongByIdWithMainRelations } from "../api/queries"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

/**
 * Custom hook for toggling a song's favorite status.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of a song's favorite status. It includes:
 * - Optimistic updates by canceling ongoing queries to prevent race conditions.
 * - Updating track metadata in the player store (`updateTrackMetadata`) if the song is currently playing.
 * - Invalidating relevant queries (`songKeys.all`, `home` relations) to refetch data after the update.
 * - Error and success handling with toast notifications, dynamically displaying messages based on the new favorite status.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: toggleFavorite, isPending } = useToggleSongFavorite();
 *
 * const handleToggle = (songId: number) => {
 *   toggleFavorite({ id: songId });
 * };
 *
 * // In a component:
 * <Button onClick={() => handleToggle(song.id)} disabled={isPending}>
 *   {song.isFavorite ? "Unfavorite" : "Favorite"}
 * </Button>
 * ```
 */
export function useToggleSongFavorite() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => toggleSongFavorite(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })
    },
    onSuccess: async (song) => {
      const songWithMainRelations = await getSongByIdWithMainRelations(song.id)
      if (songWithMainRelations) {
        queryClient.setQueryData(songKeys.detailsWithMainRelations(song.id), songWithMainRelations)
        await updateTrackMetadata(songWithMainRelations)
      }

      toast.success(song.isFavorite ? t("favorites.deletedTitle") : t("favorites.createdTitle"), {
        description: song.isFavorite
          ? t("favorites.deletedDescription", { name: song.name })
          : t("favorites.createdDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("favorites.createdFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "song", {
        relations: ["home"]
      })
    }
  })
}
