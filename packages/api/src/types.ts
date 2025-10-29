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

export enum ValidationErrorCode {
  DUPLICATE_ALBUM = "DUPLICATE_ALBUM",
  DUPLICATE_ARTIST = "DUPLICATE_ARTIST",
  DUPLICATE_PLAYLIST = "DUPLICATE_PLAYLIST",
  INTEGRITY_ALBUM_ARTIST = "INTEGRITY_ALBUM_ARTIST",
  INTEGRITY_ARTIST_DELETION = "INTEGRITY_ARTIST_DELETION"
}

export class CustomError extends Error {
  readonly code: ValidationErrorCode
  readonly field: string
  readonly entity: EntityType

  constructor(code: ValidationErrorCode, field: string, message: string, entity: EntityType) {
    super(message)
    this.name = "CustomError"
    this.code = code
    this.field = field
    this.entity = entity
  }
}

export function isCustomError(error: unknown): error is CustomError {
  return error instanceof CustomError
}
