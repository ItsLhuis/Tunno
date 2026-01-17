import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter, usePathname } from "expo-router"

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
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: deletePlaylist, isLoading } = useDeletePlaylist();
 *
 * const handleDelete = (playlistId: number) => {
 *   deletePlaylist({ id: playlistId });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleDelete(playlist.id)} disabled={isLoading}>
 *   Delete Playlist
 * </Button>
 * ```
 */
export function useDeletePlaylist() {
  const queryClient = useQueryClient()

  const router = useRouter()
  const pathname = usePathname()

  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePlaylist(id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: playlistKeys.all })
    },

    onSuccess: async (deletedPlaylist) => {
      if (!deletedPlaylist) return

      const playlistDetailPath = `/playlists/${deletedPlaylist.id}`

      if (pathname === playlistDetailPath) {
        router.replace("/playlists")
      }

      toast.success(t("playlists.deletedTitle"), {
        description: t("playlists.deletedDescription", {
          name: deletedPlaylist.name
        })
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
