import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { albumKeys, invalidateQueries, isCustomError } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { updateAlbum } from "../api/mutations"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

/**
 * Custom hook for updating an existing album.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of an album's details. It includes:
 * - Optimistic query cancellation (`albumKeys.all`).
 * - Updates track metadata in the player store if the currently playing song belongs to the updated album.
 * - Invalidation of relevant queries (`album`, `home`, `songs`, `artists`, `sidebar`) to refetch data after the update.
 * - Error and success handling with toast notifications.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with `id`, `updates`, `thumbnailAction`, `thumbnailPath`, and `artists` properties.
 *
 * @example
 * ```tsx
 * const { mutate: updateExistingAlbum, isLoading } = useUpdateAlbum();
 *
 * const handleUpdate = (albumId: number, newTitle: string) => {
 *   updateExistingAlbum({
 *     id: albumId,
 *     updates: { name: newTitle },
 *   });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleUpdate(album.id, "New Album Title")} disabled={isLoading}>
 *   Update Album
 * </Button>
 * ```
 */
export function useUpdateAlbum() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { currentTrackId, updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
      currentTrackId: state.currentTrackId,
      updateTrackMetadata: state.updateTrackMetadata
    }))
  )

  return useMutation({
    mutationFn: ({
      id,
      updates,
      thumbnailAction,
      thumbnailPath,
      artists
    }: {
      id: Parameters<typeof updateAlbum>[0]
      updates: Parameters<typeof updateAlbum>[1]
      thumbnailAction?: Parameters<typeof updateAlbum>[2]
      thumbnailPath?: Parameters<typeof updateAlbum>[3]
      artists?: Parameters<typeof updateAlbum>[4]
    }) => updateAlbum(id, updates, thumbnailAction, thumbnailPath, artists, t),
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

      toast.success(t("albums.updatedTitle"), {
        description: t("albums.updatedDescription", { name: album.name })
      })
    },
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("albums.updatedFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "album", {
        relations: ["home", "songs", "artists", "sidebar"]
      })
    }
  })
}
