import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries, isCustomError } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { updateArtist } from "../api/mutations"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

/**
 * Custom hook for updating an existing artist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of an artist's details. It includes:
 * - Optimistic query cancellation (`artistKeys.all`).
 * - Updates track metadata in the player store if the currently playing song is associated with the updated artist.
 * - Invalidation of relevant queries (`artist`, `home`, `songs`, `albums`, `sidebar`) to refetch data after the update.
 * - Error and success handling with toast notifications.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isLoading`, `isError`, etc.).
 *          The `mutate` function expects an object with `id`, `updates`, `thumbnailAction`, and `thumbnailPath` properties.
 *
 * @example
 * ```tsx
 * const { mutate: updateExistingArtist, isLoading } = useUpdateArtist();
 *
 * const handleUpdate = (artistId: number, newName: string) => {
 *   updateExistingArtist({
 *     id: artistId,
 *     updates: { name: newName },
 *   });
 * };
 *
 * // In a component:
 * <Button onPress={() => handleUpdate(artist.id, "New Artist Name")} disabled={isLoading}>
 *   Update Artist
 * </Button>
 * ```
 */
export function useUpdateArtist() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  return useMutation({
    mutationFn: ({
      id,
      updates,
      thumbnailAction,
      thumbnailPath
    }: {
      id: Parameters<typeof updateArtist>[0]
      updates: Parameters<typeof updateArtist>[1]
      thumbnailAction?: Parameters<typeof updateArtist>[2]
      thumbnailPath?: Parameters<typeof updateArtist>[3]
    }) => updateArtist(id, updates, thumbnailAction, thumbnailPath, t),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: artistKeys.all })
    },
    onSuccess: async (artist) => {
      if (currentTrackId) {
        const currentSong = await getSongByIdWithMainRelations(currentTrackId)
        if (currentSong?.artists?.some((a) => a.artistId === artist.id)) {
          await updateTrackMetadata(currentSong)
        }
      }

      toast.success(t("artists.updatedTitle"), {
        description: t("artists.updatedDescription", { name: artist.name })
      })
    },
    onError: (error) => {
      if (!isCustomError(error)) {
        toast.error(t("artists.updatedFailedTitle"))
      }
    },
    onSettled: () => {
      invalidateQueries(queryClient, "artist", {
        relations: ["home", "songs", "albums", "sidebar"]
      })
    }
  })
}
