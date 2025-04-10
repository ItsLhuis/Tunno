import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { deleteSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

import { type Song } from "@features/songs/api/types"

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSong(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: songKeys.details(id) })
      await queryClient.cancelQueries({ queryKey: songKeys.infinite() })

      const previousSong = queryClient.getQueryData<Song>(songKeys.details(id))

      return { previousSong }
    },
    onSuccess: (_, {}, context) => {
      const description = context?.previousSong
        ? `${context.previousSong.name} has been deleted`
        : undefined;

      toast.success("Song Deleted Successfully", { description });
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: songKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: songKeys.infinite() })
    }
  })
}
