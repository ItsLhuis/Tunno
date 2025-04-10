import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { updateSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

import { type Song } from "@features/songs/api/types"

export function useUpdateSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Parameters<typeof updateSong>[1] }) =>
      updateSong(id, updates),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.infinite() })

      const previousSong = queryClient.getQueryData<Song>(songKeys.details(id))

      return { previousSong }
    },
    onSuccess: (_, {}, context) => {
      const description = context?.previousSong
        ? `${context.previousSong.name} has been updated`
        : undefined

      toast.success("Song Updated Successfully", { description })
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.infinite() })
    }
  })
}
