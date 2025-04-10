import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { createSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

export function useCreateSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSong,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.infinite() })
    },
    onSuccess: (song) => {
      toast.success("Song Added Successfully", {
        description: `${song.name} has been added`
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.infinite() })
    }
  })
}
