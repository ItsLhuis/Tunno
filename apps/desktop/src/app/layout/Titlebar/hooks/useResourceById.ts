import { useFetchSongByIdWithMainRelations } from "@features/songs/hooks/useFetchSongByIdWithMainRelations"

export type ResourceType = "song" | "album" | "artist" | "playlist"

export type ResourceData = {
  id: number
  name: string
  type: ResourceType
}

export function useResourceById(id: number | null | undefined, type: ResourceType) {
  const songQuery = useFetchSongByIdWithMainRelations(type === "song" ? id : null)

  const isLoading = songQuery.isLoading
  const error = songQuery.error
  const data = songQuery.data

  const resourceData: ResourceData | undefined = data
    ? {
        id: data.id,
        name: data.name,
        type: "song"
      }
    : undefined

  return {
    data: resourceData,
    isLoading,
    error
  }
}
