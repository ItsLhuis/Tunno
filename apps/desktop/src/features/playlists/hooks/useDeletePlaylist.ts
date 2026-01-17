import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { invalidateQueries, playlistKeys } from "@repo/api"

import { deletePlaylist } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for deleting a playlist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * deletion of a playlist. It includes:
 * - Optimistic query cancellation (`playlistKeys.all`).
 * - Invalidation of relevant queries (`playlist`, `home`, `songs`, `sidebar`) to refetch data after deletion.
 * - Error and success handling with toast notifications.
 * - Navigation logic: if the user is currently viewing the deleted playlist, they are redirected.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: deletePlaylist, isPending } = useDeletePlaylist();
 *
 * const handleDelete = (playlistId: number) => {
 *   deletePlaylist({ id: playlistId });
 * };
 *
 * // In a component:
 * <Button onClick={() => handleDelete(playlist.id)} disabled={isPending}>
 *   Delete Playlist
 * </Button>
 * ```
 */
export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePlaylist(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },
    onSuccess: async (deletedPlaylist) => {
      if (!deletedPlaylist) return

      const currentPath = router.state.location.pathname
      const playlistDetailPath = `/playlists/${deletedPlaylist.id}`

      if (currentPath === playlistDetailPath) {
        await router.navigate({ to: "/playlists", replace: true })
      }

      toast.success(t("playlists.deletedTitle"), {
        description: t("playlists.deletedDescription", { name: deletedPlaylist.name })
      })
    },
    onError: () => {
      toast.error(t("playlists.deletedFailedTitle"))
    },
    onSettled: (playlist) => {
      if (playlist) {
        queryClient.removeQueries({ queryKey: playlistKeys.details(playlist.id) })
      }

      invalidateQueries(queryClient, "playlist", {
        relations: ["home", "songs", "sidebar"]
      })
    }
  })
}
