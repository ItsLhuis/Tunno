/**
 * Defines parameters for pagination, including limit and cursor for fetching data in chunks.
 */
export type PaginationParams = {
  /**
   * Maximum number of items to return per page.
   */
  limit?: number
  /**
   * Cursor string for fetching the next or previous page of results.
   */
  cursor?: string
}

/**
 * Defines generic query parameters for filtering, ordering, and pagination.
 *
 * @template TOrderByColumn - The type of column names available for ordering.
 * @template TFilters - The type of filters that can be applied.
 */
export type QueryParams<TOrderByColumn extends string, TFilters = Record<string, unknown>> = {
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: TFilters
} & PaginationParams

/**
 * Represents a paginated response structure for lists of data.
 *
 * @template T - The type of items in the paginated list.
 */
export type PaginatedResponse<T> = {
  items: T[]
  nextCursor?: string
  prevCursor?: string
  hasNextPage: boolean
  hasPrevPage: boolean
}

/**
 * Defines the various types of entities in the application.
 */
export type EntityType = "song" | "artist" | "album" | "playlist" | "sidebar"

/**
 * Defines the possible related entities for a Song.
 */
export type SongRelations = "home" | "artists" | "albums" | "playlists"

/**
 * Defines the possible related entities for an Artist.
 */
export type ArtistRelations = "home" | "songs" | "albums" | "sidebar"

/**
 * Defines the possible related entities for an Album.
 */
export type AlbumRelations = "home" | "songs" | "artists" | "sidebar"

/**
 * Defines the possible related entities for a Playlist.
 */
export type PlaylistRelations = "home" | "songs" | "sidebar"

/**
 * Defines the possible related entities for a Sidebar item.
 */
export type SidebarRelations = "albums" | "artists" | "playlists"

/**
 * Maps each entity type to its specific set of relation types.
 *
 * Used to enforce type-safe invalidation contexts where each entity
 * can only reference its valid relations.
 */
export type RelationsMap = {
  song: SongRelations
  artist: ArtistRelations
  album: AlbumRelations
  playlist: PlaylistRelations
  sidebar: SidebarRelations
}

/**
 * Context for invalidating React Query caches, specifying which relations to re-fetch.
 *
 * When an entity is mutated, this context determines which related queries
 * should be invalidated to keep the UI in sync.
 *
 * @template T - The EntityType for which the invalidation context is created.
 */
export type InvalidationContext<T extends EntityType> = {
  relations?: RelationsMap[T][]
  forceAll?: boolean
}

/**
 * Enum for various validation and integrity error codes.
 *
 * These codes represent domain-specific errors that occur during entity
 * validation or referential integrity checks.
 */
export enum ValidationErrorCode {
  DUPLICATE_ALBUM = "DUPLICATE_ALBUM",
  DUPLICATE_ARTIST = "DUPLICATE_ARTIST",
  DUPLICATE_PLAYLIST = "DUPLICATE_PLAYLIST",
  INTEGRITY_ALBUM_ARTIST = "INTEGRITY_ALBUM_ARTIST",
  INTEGRITY_ARTIST_DELETION = "INTEGRITY_ARTIST_DELETION"
}

/**
 * Custom error class for validation and integrity errors in the application.
 *
 * Represents domain-specific errors that occur during entity validation or
 * referential integrity checks. These errors include structured metadata
 * for proper error handling and UI feedback.
 *
 * @example
 * ```ts
 * throw new CustomError(
 *   ValidationErrorCode.DUPLICATE_ALBUM,
 *   "name",
 *   "An album with this name already exists",
 *   "album"
 * )
 * ```
 */
export class CustomError extends Error {
  readonly code: ValidationErrorCode
  readonly field: string
  readonly entity: EntityType

  /**
   * Creates a new CustomError instance.
   *
   * @param code - Validation error code from ValidationErrorCode enum.
   * @param field - Name of the field that caused the error.
   * @param message - Human-readable error message.
   * @param entity - Type of entity the error relates to.
   */
  constructor(code: ValidationErrorCode, field: string, message: string, entity: EntityType) {
    super(message)
    this.name = "CustomError"
    this.code = code
    this.field = field
    this.entity = entity
  }
}

/**
 * Type guard to check if an error is a CustomError instance.
 *
 * Use this to safely narrow error types in catch blocks and error
 * handling middleware to access CustomError-specific properties.
 *
 * @param error - Unknown error to check.
 * @returns `true` if error is a CustomError instance, `false` otherwise.
 *
 * @example
 * ```ts
 * try {
 *   await insertAlbum(data)
 * } catch (error) {
 *   if (isCustomError(error)) {
 *     console.log(error.code, error.field, error.entity)
 *   }
 * }
 * ```
 */
export function isCustomError(error: unknown): error is CustomError {
  return error instanceof CustomError
}
