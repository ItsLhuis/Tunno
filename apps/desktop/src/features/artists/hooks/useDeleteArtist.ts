import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRouter } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { artistKeys, invalidateQueries, isCustomError } from "@repo/api"

import { getSongByIdWithMainRelations } from "../../songs/api/queries"
import { deleteArtist } from "../api/mutations"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

/**
 * Custom hook for deleting an artist.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * deletion of an artist. It includes:
 * - Optimistic query cancellation (`artistKeys.all`).
 * - Updates track metadata in the player store if the currently playing song is associated with the deleted artist.
 * - Invalidation of relevant queries (`artist`, `home`, `songs`, `albums`, `sidebar`) to refetch data after deletion.
 * - Robust error handling, specifically for custom errors (`isCustomError`).
 * - Success and error handling with toast notifications.
 * - Navigation logic: if the user is currently viewing the deleted artist, they are redirected.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with an `id` property as its argument.
 *
 * @example
 * ```tsx
 * const { mutate: deleteArtist, isPending } = useDeleteArtist();
 *
 * const handleDelete = (artistId: number) => {
 *   deleteArtist({ id: artistId });
 * };
 *
 * // In a component:
 * <button onClick={() => handleDelete(artist.id)} disabled={isPending}>
 *   Delete Artist
 * </button>
 * ```
 */
export function useDeleteArtist() {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { t } = useTranslation()

  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const updateTrackMetadata = usePlayerStore((state) => state.updateTrackMetadata)

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteArtist(id, t),
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

      const currentPath = router.state.location.pathname
      const artistDetailPath = `/artists/${artist.id}`

      if (currentPath === artistDetailPath) {
        await router.navigate({ to: "/artists", replace: true })
      }

      toast.success(t("artists.deletedTitle"), {
        description: t("artists.deletedDescription", { name: artist.name })
      })
    },
    onError: (error) => {
      if (isCustomError(error)) {
        toast.error(t("artists.deletedFailedTitle"), {
          description: error.message
        })
      } else {
        toast.error(t("artists.deletedFailedTitle"))
      }
    },
    onSettled: (artist) => {
      if (artist) {
        queryClient.removeQueries({ queryKey: artistKeys.details(artist.id) })
      }

      invalidateQueries(queryClient, "artist", {
        relations: ["home", "songs", "albums", "sidebar"]
      })
    }
  })
}
