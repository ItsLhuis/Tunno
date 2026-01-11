import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys, isCustomError } from "@repo/api"

import { updatePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

import { type UpdatePlaylistType } from "@repo/schemas"

/**
 * Parameters for the `useUpdatePlaylist` hook's mutation function.
 */
type UpdatePlaylistParams = {
  /**
   * The ID of the playlist to update.
   */
  id: number
  /**
   * An object containing the playlist data to be updated, excluding the `thumbnail` property.
   */
  updates: Omit<UpdatePlaylistType, "thumbnail">
  /**
   * (Optional) Specifies how to handle the thumbnail: 'keep', 'update', or 'remove'.
   */
  thumbnailAction?: "keep" | "update" | "remove"
  /**
   * (Optional) The path to the new thumbnail image file if `thumbnailAction` is 'update'.
   */
  thumbnailPath?: string
}

/**
 * Custom hook for updating an existing playlist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of a playlist's details. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Invalidation of relevant queries (`playlist`, `home`, `songs`, `sidebar`) to refetch data after the update.
 * - Error and success handling with toast notifications.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an {@link UpdatePlaylistParams} object as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: updateExistingPlaylist, isLoading } = useUpdatePlaylist();
 *
 * const handleUpdate = (playlistId: number, newName: string) => {
 *   updateExistingPlaylist({
 *     id: playlistId,
 *     updates: { name: newName },
 *   });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleUpdate(playlist.id, "My New Playlist")} disabled={isLoading}>
 *   Update Playlist
 * </Button>
 * ```
 */
export function useUpdatePlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({ id, updates, thumbnailAction, thumbnailPath }: UpdatePlaylistParams) => {
      const updatedPlaylist = await updatePlaylist(id, updates, thumbnailAction, thumbnailPath, t)
      return updatedPlaylist
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: (updatedPlaylist) => {
      if (!updatedPlaylist) return

      toast.success(t("playlists.updatedTitle"), {
        description: t("playlists.updatedDescription", { name: updatedPlaylist.name })
      })
    },
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("playlists.updatedFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs", "sidebar"]
      })
    }
  })
}
