import { useState } from "react"

import { useFetchSongsWithRelations } from "@features/songs/hooks/useFetchSongsWithRelations"

import { useCreateSong } from "@features/songs/hooks/useCreateSong"
import { useDeleteSong } from "@features/songs/hooks/useDeleteSong"
import { useUpdateSong } from "@features/songs/hooks/useUpdateSong"

import { Button, ScrollArea, TextInput, Typography } from "@components/ui"

import { type UpdateSong } from "@features/songs/api/types"

function FastUpload() {
  const [name, setName] = useState<string>("")

  const { data: songs, isLoading } = useFetchSongsWithRelations()

  const { mutate: createSong } = useCreateSong()
  const { mutate: deleteSong } = useDeleteSong()
  const { mutate: updateSong } = useUpdateSong()

  const handleCreateSong = () => {
    createSong({ name, duration: 0 })
    setName("")
  }

  const handleDeleteSong = (id: number) => {
    deleteSong({ id })
  }

  const handleUpdateSong = (id: number, updates: UpdateSong) => {
    updateSong({ id, updates })
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-3 transition-[background-color,padding] md:p-9">
      <Typography variant="h1">Songs</Typography>
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
        {isLoading || !songs ? (
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
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

export default FastUpload
