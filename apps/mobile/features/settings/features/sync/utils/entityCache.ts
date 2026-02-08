import { database, schema } from "@database/client"

import { isNotNull } from "drizzle-orm"

/**
 * Represents a cached entry mapping a fingerprint to a local database ID.
 */
type CacheEntry = {
  id: number
}

/**
 * A utility class for caching entity fingerprint-to-ID mappings to optimize database
 * interactions during the sync process. This prevents redundant database lookups when
 * resolving fingerprints to local IDs for relationship linking (e.g., linking a song
 * to its artists and album).
 *
 * Maintains three separate caches for artists, albums, and playlists, keyed by
 * their SHA-256 fingerprint strings.
 */
export class EntityCache {
  private artistCache = new Map<string, CacheEntry>()
  private albumCache = new Map<string, CacheEntry>()
  private playlistCache = new Map<string, CacheEntry>()

  /**
   * Initializes the cache by pre-populating it with existing entities from the local database.
   * This is called once at the beginning of a sync session to avoid redundant lookups
   * for entities that already exist on mobile.
   *
   * Only selects `id` and `fingerprint` columns for performance.
   *
   * @returns A Promise that resolves when all three caches have been populated.
   */
  async initialize(): Promise<void> {
    const [artists, albums, playlists] = await Promise.all([
      database
        .select({ id: schema.artists.id, fingerprint: schema.artists.fingerprint })
        .from(schema.artists)
        .where(isNotNull(schema.artists.fingerprint)),
      database
        .select({ id: schema.albums.id, fingerprint: schema.albums.fingerprint })
        .from(schema.albums)
        .where(isNotNull(schema.albums.fingerprint)),
      database
        .select({ id: schema.playlists.id, fingerprint: schema.playlists.fingerprint })
        .from(schema.playlists)
        .where(isNotNull(schema.playlists.fingerprint))
    ])

    for (const artist of artists) {
      this.artistCache.set(artist.fingerprint!, { id: artist.id })
    }

    for (const album of albums) {
      this.albumCache.set(album.fingerprint!, { id: album.id })
    }

    for (const playlist of playlists) {
      this.playlistCache.set(playlist.fingerprint!, { id: playlist.id })
    }
  }

  /**
   * Retrieves a cached artist entry by its fingerprint.
   * @param fingerprint - The SHA-256 fingerprint of the artist.
   * @returns The {@link CacheEntry} if found, otherwise `undefined`.
   */
  getArtist(fingerprint: string): CacheEntry | undefined {
    return this.artistCache.get(fingerprint)
  }

  /**
   * Adds a new artist entry to the cache after it has been inserted into the database.
   * @param fingerprint - The SHA-256 fingerprint of the artist.
   * @param id - The local database ID of the artist.
   */
  addArtist(fingerprint: string, id: number): void {
    this.artistCache.set(fingerprint, { id })
  }

  /**
   * Retrieves a cached album entry by its fingerprint.
   * @param fingerprint - The SHA-256 fingerprint of the album.
   * @returns The {@link CacheEntry} if found, otherwise `undefined`.
   */
  getAlbum(fingerprint: string): CacheEntry | undefined {
    return this.albumCache.get(fingerprint)
  }

  /**
   * Adds a new album entry to the cache after it has been inserted into the database.
   * @param fingerprint - The SHA-256 fingerprint of the album.
   * @param id - The local database ID of the album.
   */
  addAlbum(fingerprint: string, id: number): void {
    this.albumCache.set(fingerprint, { id })
  }

  /**
   * Retrieves a cached playlist entry by its fingerprint.
   * @param fingerprint - The SHA-256 fingerprint of the playlist.
   * @returns The {@link CacheEntry} if found, otherwise `undefined`.
   */
  getPlaylist(fingerprint: string): CacheEntry | undefined {
    return this.playlistCache.get(fingerprint)
  }

  /**
   * Adds a new playlist entry to the cache after it has been inserted into the database.
   * @param fingerprint - The SHA-256 fingerprint of the playlist.
   * @param id - The local database ID of the playlist.
   */
  addPlaylist(fingerprint: string, id: number): void {
    this.playlistCache.set(fingerprint, { id })
  }

  /**
   * Clears all cached artist, album, and playlist entries.
   * Should be called after the sync session completes to free memory.
   */
  clear(): void {
    this.artistCache.clear()
    this.albumCache.clear()
    this.playlistCache.clear()
  }
}
