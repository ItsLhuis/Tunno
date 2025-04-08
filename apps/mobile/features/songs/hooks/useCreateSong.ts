import { useMutation, useQueryClient } from "@tanstack/react-query"

import { songKeys } from "@features/songs/api/keys"

import { addSong } from "@features/songs/api/mutations"

import { toast } from "@components/ui"

export function useCreateSong() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addSong,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: songKeys.all })
    },
    onSuccess: (song) => {
      toast.success("Song Added Successfully", {
        description: `${song.name} has been created`
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all })
    }
  })
}
