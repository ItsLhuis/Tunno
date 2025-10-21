export type PaginationParams = {
  limit?: number
  cursor?: string
}

export type QueryParams<TOrderByColumn extends string, TFilters = Record<string, unknown>> = {
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: TFilters
} & PaginationParams

export type PaginatedResponse<T> = {
  items: T[]
  nextCursor?: string
  prevCursor?: string
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type EntityType = "song" | "artist" | "album" | "playlist"

export type SongRelations = "home" | "artists" | "albums" | "playlists"
export type ArtistRelations = "home" | "songs" | "albums"
export type AlbumRelations = "home" | "songs" | "artists"
export type PlaylistRelations = "home" | "songs"

export type RelationsMap = {
  song: SongRelations
  artist: ArtistRelations
  album: AlbumRelations
  playlist: PlaylistRelations
}

export type InvalidationContext<T extends EntityType> = {
  relations?: RelationsMap[T][]
  forceAll?: boolean
}
