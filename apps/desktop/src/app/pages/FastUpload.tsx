import { useEffect, useState } from "react"

import { useCreateSong } from "@features/songs/hooks/useCreateSong"
import { useFetchSongs } from "@features/songs/hooks/useFetchSongs"

import { useInView } from "react-intersection-observer"

import { Button, Loader, ScrollArea, TextInput, Typography } from "@components/ui"

function FastUpload() {
  const [name, setName] = useState<string>("")

  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchSongs()
  const { mutate } = useCreateSong()
  const { ref, inView } = useInView()

  const songs = data?.pages.flatMap((page) => page) || []

  const handleCreateSong = () => {
    mutate({ name, duration: 0 })
    setName("")
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      const timeout = setTimeout(() => {
        fetchNextPage()
      }, 2000)
      return () => clearTimeout(timeout)
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
