import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { removeSongsFromPlaylist } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for removing songs from a specific playlist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * operation of removing specified song IDs from a given playlist ID. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Error and success handling with toast notifications.
 * - Invalidation of relevant queries (`home`, `songs` relations) to refetch data after the update.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with `playlistId` (number) and `songIds` (array of numbers) as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: removeSongs, isLoading } = useRemoveSongsFromPlaylist();
 *
 * const handleRemoveSongs = (targetPlaylistId: number, songIdsToRemove: number[]) => {
 *   removeSongs({ playlistId: targetPlaylistId, songIds: songIdsToRemove });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleRemoveSongs(10, [1, 2])} disabled={isLoading}>
 *   Remove from Playlist
 * </Button>
 * ```
 */
export function useRemoveSongsFromPlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({ playlistId, songIds }: { playlistId: number; songIds: number[] }) => {
      await removeSongsFromPlaylist(playlistId, songIds)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: () => {
      toast.success(t("playlists.updatedTitle"))
    },
    onError: () => {
      toast.error(t("playlists.updatedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
