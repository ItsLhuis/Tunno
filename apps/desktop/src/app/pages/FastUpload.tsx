import { useEffect, useState } from "react"

import { useUpdateSong } from "@/features/songs/hooks/useUpdateSong"
import { useCreateSong } from "@features/songs/hooks/useCreateSong"
import { useDeleteSong } from "@features/songs/hooks/useDeleteSong"
import { useFetchSongs } from "@features/songs/hooks/useFetchSongs"

import { useInView } from "react-intersection-observer"

import { Button, Loader, ScrollArea, TextInput, Typography } from "@components/ui"

import { UpdateSong } from "@/features/songs/api/types"

function FastUpload() {
  const [name, setName] = useState<string>("")

  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchSongs()
  const { mutate } = useCreateSong()
  const { mutate: deleteSong } = useDeleteSong()
  const { mutate: updateSong } = useUpdateSong()

  const { ref, inView } = useInView()

  const songs = data?.pages.flatMap((page) => page) || []

  const handleCreateSong = () => {
    mutate({ name, duration: 0 })
    setName("")
  }

  const handleDeleteSong = (id: number) => {
    deleteSong({ id })
  }

  const handleUpdateSong = (id: number, updates: UpdateSong) => {
    updateSong({ id, updates })
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="flex flex-1 flex-col gap-6 p-3 transition-[background-color,padding] md:p-9">
      <Typography variant="h2">Songs</Typography>
      <form
        className="flex flex-col items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateSong()
        }}
      >
        <TextInput
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder="Enter a name..."
        />
        <Button>Create</Button>
      </form>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Typography variant="h4">List of Songs</Typography>
        {isLoading ? (
          <Typography variant="h4">Loading...</Typography>
        ) : (
          <ScrollArea className="mt-4 flex-1 overflow-auto rounded-md border">
            <div className="space-y-4 divide-y">
              {songs.map((song) => (
                <div key={song.id} className="flex flex-col gap-2 p-4">
                  <Typography variant="h3">{song.name}</Typography>
                  <div className="mt-4">
                    <Typography variant="h4">JSON Representation</Typography>
                    <div className="rounded-md p-4">
                      <pre className="whitespace-pre-wrap break-words">
                        <code>{JSON.stringify(song, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                  <Button onClick={() => handleDeleteSong(song.id)}>Delete</Button>
                  <Button
                    onClick={() => handleUpdateSong(song.id, { ...song, name: "Updated Song" })}
                  >
                    Update
                  </Button>
                </div>
              ))}
              {hasNextPage && (
                <div ref={ref} className="flex justify-center p-4">
                  <Loader />
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

export default FastUpload
