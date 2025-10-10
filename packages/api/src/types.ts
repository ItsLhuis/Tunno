export type QueryParams<TOrderByColumn extends string, TFilters = Record<string, unknown>> = {
  limit?: number
  offset?: number
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: TFilters
}

export type EntityType = "song" | "artist" | "album" | "playlist"

export type SongRelations = "artists" | "albums" | "playlists"
export type ArtistRelations = "songs" | "albums"
export type AlbumRelations = "songs" | "artists"
export type PlaylistRelations = "songs"

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
