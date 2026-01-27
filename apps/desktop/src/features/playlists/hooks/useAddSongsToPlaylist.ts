import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { updateSongsToPlaylists } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for adding songs to multiple playlists.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * operation of adding specified song IDs to specified playlist IDs. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Error and success handling with toast notifications.
 * - Invalidation of relevant queries (`home`, `songs` relations) to refetch data after the update.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with `songIds` (array of numbers) and `playlistIds` (array of numbers) as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: addSongs, isPending } = useAddSongsToPlaylist();
 *
 * const handleAddSongs = (selectedSongIds: number[], targetPlaylistIds: number[]) => {
 *   addSongs({ songIds: selectedSongIds, playlistIds: targetPlaylistIds });
 * };
 *
 * // In a component:
 * <button onClick={() => handleAddSongs([1, 2], [10, 11])} disabled={isPending}>
 *   Add to Playlists
 * </button>
 * ```
 */
export function useAddSongsToPlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({ songIds, playlistIds }: { songIds: number[]; playlistIds: number[] }) => {
      await updateSongsToPlaylists(songIds, playlistIds)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: () => {
      toast.success(t("playlists.songsAddedTitle"))
    },
    onError: () => {
      toast.error(t("playlists.songsAddedFailedTitle"))
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
