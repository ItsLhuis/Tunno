import { useFetchAlbumById } from "@features/albums/hooks/useFetchAlbumById"
import { useFetchArtistById } from "@features/artists/hooks/useFetchArtistById"
import { useFetchPlaylistById } from "@features/playlists/hooks/useFetchPlaylistById"
import { useFetchSongById } from "@features/songs/hooks/useFetchSongById"

export type ResourceType = "song" | "album" | "artist" | "playlist"

export type ResourceData = {
  id: number
  name: string
  type: ResourceType
}

export function useResourceById(id: number | null | undefined, type: ResourceType) {
  const songQuery = useFetchSongById(type === "song" ? id : null)
  const artistQuery = useFetchArtistById(type === "artist" ? id : null)
  const albumQuery = useFetchAlbumById(type === "album" ? id : null)
  const playlistQuery = useFetchPlaylistById(type === "playlist" ? id : null)

  const isLoading =
    songQuery.isLoading || artistQuery.isLoading || albumQuery.isLoading || playlistQuery.isLoading
  const error = songQuery.error || artistQuery.error || albumQuery.error || playlistQuery.error

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

    if (type === "album" && albumQuery.data) {
      return {
        id: albumQuery.data.id,
        name: albumQuery.data.name,
        type: "album"
      }
    }

    if (type === "playlist" && playlistQuery.data) {
      return {
        id: playlistQuery.data.id,
        name: playlistQuery.data.name,
        type: "playlist"
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
