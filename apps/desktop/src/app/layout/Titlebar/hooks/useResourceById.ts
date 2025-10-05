import { useFetchSongById } from "@features/songs/hooks/useFetchSongById"
import { useFetchArtistById } from "@features/artists/hooks/useFetchArtistById"

export type ResourceType = "song" | "album" | "artist" | "playlist"

export type ResourceData = {
  id: number
  name: string
  type: ResourceType
}

export function useResourceById(id: number | null | undefined, type: ResourceType) {
  const songQuery = useFetchSongById(type === "song" ? id : null)
  const artistQuery = useFetchArtistById(type === "artist" ? id : null)

  const isLoading = songQuery.isLoading || artistQuery.isLoading
  const error = songQuery.error || artistQuery.error

  const resourceData: ResourceData | undefined = (() => {
    if (type === "song" && songQuery.data) {
      return {
        id: songQuery.data.id,
        name: songQuery.data.name,
        type: "song"
      }
    }

    if (type === "artist" && artistQuery.data) {
      return {
        id: artistQuery.data.id,
        name: artistQuery.data.name,
        type: "artist"
      }
    }

    return undefined
  })()

  return {
    data: resourceData,
    isLoading,
    error
  }
}
