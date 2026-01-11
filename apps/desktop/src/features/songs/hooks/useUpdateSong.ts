import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useTranslation } from "@repo/i18n"

import {
  invalidateQueries,
  songKeys,
  type SongRelations,
  type SongWithMainRelations
} from "@repo/api"

import { updateSong } from "../api/mutations"
import { getSongByIdWithMainRelations } from "../api/queries"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

import { toast } from "@components/ui"

/**
 * Custom hook for updating an existing song.
 *
 * This hook leverages `@tanstack/react-query`'s `useMutation` to handle the asynchronous
 * update of a song's details. It includes:
 * - Optimistic updates: `onMutate` captures the previous song state to potentially revert on error.
 * - Updating track metadata in the player store (`updateTrackMetadata`) if the updated song is currently playing.
 * - Invalidating relevant queries (`songKeys.all`, `home`, `artists`, `albums` relations) to refetch data after the update.
 *   The invalidation logic specifically checks if artists or album relationships have changed.
 * - Error and success handling with toast notifications.
 *
 * @returns A `UseMutationResult` object from `@tanstack/react-query` containing the mutation function (`mutate`) and its state (`isPending`, `isError`, etc.).
 *          The `mutate` function expects an object with `id`, `updates`, `thumbnailAction`, `thumbnailPath`, and `artists` properties.
 *
 * @example
 * ```tsx
 * const { mutate: updateExistingSong, isPending } = useUpdateSong();
 *
 * const handleUpdate = (songId: number, newTitle: string) => {
 *   updateExistingSong({
 *     id: songId,
 *     updates: { name: newTitle },
 *   });
 * };
 *
 * // In a component:
 * <Button onClick={() => handleUpdate(song.id, "New Song Title")} disabled={isPending}>
 *   Update Song
 * </Button>
 * ```
 */
export function useUpdateSong() {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { updateTrackMetadata } = usePlayerStore(
    useShallow((state) => ({
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
      id: Parameters<typeof updateSong>[0]
      updates: Parameters<typeof updateSong>[1]
      thumbnailAction?: Parameters<typeof updateSong>[2]
      thumbnailPath?: Parameters<typeof updateSong>[3]
      artists?: number[]
    }) => updateSong(id, updates, thumbnailAction, thumbnailPath, artists),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })

      const previousSong = queryClient.getQueryData(songKeys.detailsWithMainRelations(id)) as
        | SongWithMainRelations
        | undefined

      return {
        previousSong,
        previousArtists: previousSong?.artists.map((a) => a.artistId) || [],
        previousAlbumId: previousSong?.albumId
      }
    },
    onSuccess: async (song) => {
      const songWithMainRelations = await getSongByIdWithMainRelations(song.id)
      if (songWithMainRelations) {
        queryClient.setQueryData(songKeys.detailsWithMainRelations(song.id), songWithMainRelations)
        await updateTrackMetadata(songWithMainRelations)
      }

      toast.success(t("songs.updatedTitle"), {
        description: t("songs.updatedDescription", { name: song.name })
      })
    },
    onError: () => {
      toast.error(t("songs.updatedFailedTitle"))
    },
    onSettled: async (_, __, variables, context) => {
      const { artists, updates } = variables

      const { previousArtists = [], previousAlbumId } = context || {}

      const relations: SongRelations[] = []

      const currentArtists = artists || []
      const hadArtists = previousArtists.length > 0
      const hasArtists = currentArtists.length > 0

      const artistsChanged =
        hadArtists !== hasArtists ||
        (hadArtists &&
          hasArtists &&
          (previousArtists.length !== currentArtists.length ||
            !previousArtists.every((id) => currentArtists.includes(id))))

      if (artistsChanged) {
        relations.push("artists")
      }

      if (updates.albumId !== previousAlbumId) {
        relations.push("albums")
      }

      relations.push("home")

      invalidateQueries(queryClient, "song", {
        relations: relations.length > 0 ? relations : undefined
      })
    }
  })
}
