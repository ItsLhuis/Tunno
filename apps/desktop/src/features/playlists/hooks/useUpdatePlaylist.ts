import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, isCustomError, playlistKeys } from "@repo/api"

import { updatePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for updating an existing playlist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of a playlist's details. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Invalidation of relevant queries (`playlist`, `home`, `songs`, `sidebar`) to refetch data after the update.
 * - Error and success handling with toast notifications.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with `id`, `updates`, `thumbnailAction`, and `thumbnailPath` properties.
 *
 * @example
 * ```tsx
 * const { mutate: updateExistingPlaylist, isPending } = useUpdatePlaylist();
 *
 * const handleUpdate = (playlistId: number, newName: string) => {
 *   updateExistingPlaylist({
 *     id: playlistId,
 *     updates: { name: newName },
 *   });
 * };
 *
 * // In a component:
 * <button onClick={() => handleUpdate(playlist.id, "My New Playlist")} disabled={isPending}>
 *   Update Playlist
 * </button>
 * ```
 */
export function useUpdatePlaylist() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({
      id,
      updates,
      thumbnailAction,
      thumbnailPath
    }: {
      id: Parameters<typeof updatePlaylist>[0]
      updates: Parameters<typeof updatePlaylist>[1]
      thumbnailAction?: Parameters<typeof updatePlaylist>[2]
      thumbnailPath?: Parameters<typeof updatePlaylist>[3]
    }) => updatePlaylist(id, updates, thumbnailAction, thumbnailPath, t),
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
