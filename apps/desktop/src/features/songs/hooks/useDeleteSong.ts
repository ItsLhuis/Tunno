import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { invalidateQueries, songKeys } from "@repo/api"

import { deleteSong } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for deleting a song.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * deletion of a song. It includes:
 * - Optimistic removal from the player's queue (`removeSongById`).
 * - Invalidation of relevant queries (`songKeys.all`) to refetch data after deletion.
 * - Error handling with toast notifications.
 * - Navigation logic: if the user is currently viewing the deleted song, they are redirected.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: deleteSong, isPending } = useDeleteSong();
 *
 * const handleDelete = (songId: number) => {
 *   deleteSong({ id: songId });
 * };
 *
 * // In a component:
 * <button onClick={() => handleDelete(song.id)} disabled={isPending}>
 *   Delete Song
 * </button>
 * ```
 */
export function useDeleteSong() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  const removeSongById = usePlayerStore((state) => state.removeSongById)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSong(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })

      await removeSongById(id)
    },
    onSuccess: async (song) => {
      const currentPath = router.state.location.pathname
      const songDetailPath = `/songs/${song.id}`

      if (currentPath === songDetailPath) {
        await router.navigate({ to: "/songs", replace: true })
      }

      toast.success(t("songs.deletedTitle"), {
        description: t("songs.deletedDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("songs.deletedFailedTitle"))
    },
    onSettled: (song) => {
      if (song) {
        queryClient.removeQueries({ queryKey: songKeys.details(song.id) })
      }

      invalidateQueries(queryClient, "song", {
        relations: ["home", "artists", "albums", "playlists"]
      })
    }
  })
}
