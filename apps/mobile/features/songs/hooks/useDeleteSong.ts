import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "../api/keys"

import { deleteSong } from "../api/mutations"

import { toast } from "@components/ui"

import { type SongWithRelations } from "@features/songs/api/types"

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSong(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.all })

      const previousSong = queryClient.getQueryData<SongWithRelations>(songKeys.details(id))

      return { previousSong }
    },
    onSuccess: (_, {}, context) => {
      if (context?.previousSong) {
        toast.success("Song Deleted Successfully", {
          description: `${context.previousSong.name} has been deleted`
        })
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.all })
    }
  })
}
