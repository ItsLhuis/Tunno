import { useMutation, useQueryClient } from "@tanstack/react-query"

import { usePathname, useRouter } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { albumKeys, invalidateQueries } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { deleteAlbum } from "../api/mutations"

import { toast } from "@components/ui"

/**
 * Custom hook for deleting an album.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * deletion of an album. It includes:
 * - Optimistic query cancellation (`albumKeys.all`).
 * - Updates track metadata in the player store if the currently playing song belongs to the deleted album.
 * - Invalidation of relevant queries (`album`, `home`, `songs`, `artists`, `sidebar`) to refetch data after deletion.
 * - Error and success handling with toast notifications.
 * - Navigation logic: if the user is currently viewing the deleted album, they are redirected.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: deleteAlbum, isLoading } = useDeleteAlbum();
 *
 * const handleDelete = (albumId: number) => {
 *   deleteAlbum({ id: albumId });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleDelete(album.id)} disabled={isLoading}>
 *   Delete Album
 * </Button>
 * ```
 */
export function useDeleteAlbum() {
  const queryClient = useQueryClient()

  const router = useRouter()
  const pathname = usePathname()

  const { t } = useTranslation()

  const { currentTrackId, updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      updateTrackMetadata: state.updateTrackMetadata
    }))
  )

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteAlbum(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: albumKeys.all })
    },
    onSuccess: async (album) => {
      if (currentTrackId) {
        const currentSong = await getSongByIdWithMainRelations(currentTrackId)
        if (currentSong?.album?.id === album.id) {
          await updateTrackMetadata(currentSong)
        }
      }

      const albumDetailPath = `/albums/${album.id}`

      if (pathname === albumDetailPath) {
        router.replace("/albums")
      }

      toast.success(t("albums.deletedTitle"), {
        description: t("albums.deletedDescription", { name: album.name })
      })
    },
    onError: () => {
      toast.error(t("albums.deletedFailedTitle"))
    },
    onSettled: (album) => {
      if (album) {
        queryClient.removeQueries({ queryKey: albumKeys.details(album.id) })
      }

      invalidateQueries(queryClient, "album", {
        relations: ["home", "songs", "artists", "sidebar"]
      })
    }
  })
}
