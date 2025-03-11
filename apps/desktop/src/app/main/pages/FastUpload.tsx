import { useEffect, useState } from "react"

import { database, schema, type InferQueryModel } from "@database/client"

import { Button, ScrollArea, TextInput, Typography } from "@components/ui"

function FastUpload() {
  const [name, setName] = useState("")
  const [songs, setSongs] = useState<
    InferQueryModel<"songs", { artists: true; playlists: true; album: true }>[]
  >([])

  async function addSong() {
    await database.insert(schema.songs).values({ name })
    setName("")
    loadSongs()
  }

  async function loadSongs() {
    database.query.songs
      .findMany({
        with: {
          album: true,
          artists: { with: { artist: true } },
          playlists: { with: { playlist: true } }
        }
      })
      .execute()
      .then((results) => {
        setSongs(results)
      })
  }

  useEffect(() => {
    async function init() {
      loadSongs()
    }
    init()
  }, [])

  return (
    <div className="flex flex-col flex-1 gap-6 p-3 md:p-9 transition-[background-color,padding]">
      <Typography variant="h2">Insert Song</Typography>
      <form
        className="flex flex-col items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          addSong()
        }}
      >
        <TextInput
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder="Enter a name..."
        />
        <Button>Insert</Button>
      </form>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Typography variant="h4">List of Songs from the Database ({songs.length}):</Typography>
        <ScrollArea className="flex-1 rounded-md border overflow-auto mt-4">
          <div className="divide-y space-y-4">
            {songs.map((item) => (
              <div key={item.id} className="p-4 flex flex-col gap-2">
                <Typography variant="h3">{item.name}</Typography>
                <div>
                  <strong>Release Year:</strong> {item.releaseYear || "N/A"}
                </div>
                <div>
                  <strong>Duration:</strong> {item.duration || "N/A"} seconds
                </div>
                <div>
                  <strong>Is Favorite:</strong> {item.isFavorite ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Thumbnail:</strong> {item.thumbnail || "No Thumbnail"}
                </div>
                <div>
                  <strong>Created At:</strong> {item.createdAt}
                </div>
                <div className="mt-4">
                  <Typography variant="h4">JSON Representation</Typography>
                  <div className="p-4 rounded-md">
                    <pre className="whitespace-pre-wrap break-words">
                      <code>{JSON.stringify(item, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default FastUpload
