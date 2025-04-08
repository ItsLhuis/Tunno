import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { updateSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

import { type SongWithRelations } from "@features/songs/api/types"

export function useEditSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Parameters<typeof updateSong>[1] }) =>
      updateSong(id, updates),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.all })

      const previousSong = queryClient.getQueryData<SongWithRelations>(songKeys.details(id))

      return { previousSong }
    },
    onSuccess: (_, {}, context) => {
      if (context?.previousSong) {
        toast.success("Song Updated Successfully", {
          description: `${context.previousSong.name} has been updated`
        })
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.all })
    }
  })
}
