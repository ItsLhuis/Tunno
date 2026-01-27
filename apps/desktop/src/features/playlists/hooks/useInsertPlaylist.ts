import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys, isCustomError } from "@repo/api"

import { insertPlaylist } from "../api/mutations"

import { toast } from "@components/ui"

import { type InsertPlaylistType } from "@repo/schemas"

/**
 * Custom hook for inserting a new playlist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * creation of a new playlist. It includes:
 * - Invalidating relevant queries (`playlistKeys.all`) to refetch data after insertion.
 * - Error and success handling with toast notifications.
 * - Logic to invalidate specific related queries (`home`, `songs`) after insertion.
 * - Robust error handling for custom errors.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an `InsertPlaylistType` object as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: insertNewPlaylist, isPending } = useInsertPlaylist();
 *
 * const handleInsert = (playlistData: InsertPlaylistType) => {
 *   insertNewPlaylist(playlistData);
 * };
 *
 * // In a component:
 * <button onClick={() => handleInsert(newPlaylist)} disabled={isPending}>
 *   Add Playlist
 * </button>
 * ```
 */
export function useInsertPlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async (playlist: InsertPlaylistType) => {
      const { thumbnail, ...rest } = playlist
      const createdPlaylist = await insertPlaylist(rest, thumbnail, t)
      return createdPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (createdPlaylist) => {
      if (!createdPlaylist) return

      toast.success(t("playlists.createdTitle"), {
        description: t("playlists.createdDescription", { name: createdPlaylist.name })
      })
    },
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("playlists.createdFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs"]
      })
    }
  })
}
