import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

/**
 * Represents a cached entry for an artist, storing essential information for quick lookup.
 */
export type ArtistCacheEntry = {
  /**
   * The unique ID of the artist in the database.
   */
  id: number
  /**
   * The name of the artist.
   */
  name: string
  /**
   * The filename of the artist's thumbnail image, or `null` if none.
   */
  thumbnail: string | null
}

/**
 * Represents a cached entry for an album, storing essential information for quick lookup.
 */
export type AlbumCacheEntry = {
  /**
   * The unique ID of the album in the database.
   */
  id: number
  /**
   * The name of the album.
   */
  name: string
  /**
   * The type of the album (e.g., "album", "single", "compilation").
   */
  albumType: string
  /**
   * An array of artist IDs associated with this album.
   */
  artistIds: number[]
  /**
   * The filename of the album's thumbnail image, or `null` if none.
   */
  thumbnail: string | null
}

/**
 * A utility class for caching artist and album entities to optimize database interactions
 * during the fast upload process. This prevents redundant database queries for frequently
 * accessed entities like artists and albums, improving performance.
 */
export class EntityCache {
  private artistCache = new Map<string, ArtistCacheEntry>()
  private albumCache = new Map<string, AlbumCacheEntry>()

  /**
   * Initializes the cache by pre-populating it with existing artists and albums from the database.
   * This is called once at the beginning of a fast upload process to avoid initial lookups.
   * @returns A Promise that resolves when the cache has been populated.
   */
  async initialize(): Promise<void> {
    const artists = await database.select().from(schema.artists)
    for (const artist of artists) {
      this.artistCache.set(artist.name, {
        id: artist.id,
        name: artist.name,
        thumbnail: artist.thumbnail
      })
    }

    const albums = await database.select().from(schema.albums)

    for (const album of albums) {
      const albumArtists = await database
        .select({ artistId: schema.albumsToArtists.artistId })
        .from(schema.albumsToArtists)
        .where(eq(schema.albumsToArtists.albumId, album.id))

      const key = this.getAlbumKey(album.name, album.albumType)
      this.albumCache.set(key, {
        id: album.id,
        name: album.name,
        albumType: album.albumType,
        artistIds: albumArtists.map((a) => a.artistId),
        thumbnail: album.thumbnail
      })
    }
  }

  /**
   * Retrieves a cached artist entry by its name.
   * @param name - The name of the artist to retrieve.
   * @returns The {@link ArtistCacheEntry} if found, otherwise `undefined`.
   */
  getArtist(name: string): ArtistCacheEntry | undefined {
    return this.artistCache.get(name)
  }

  /**
   * Adds a new artist entry to the cache.
   * @param name - The name of the artist.
   * @param id - The ID of the artist.
   * @param thumbnail - The filename of the artist's thumbnail, or `null`.
   */
  addArtist(name: string, id: number, thumbnail: string | null): void {
    this.artistCache.set(name, { id, name, thumbnail })
  }

  /**
   * Updates the thumbnail for an artist in the cache.
   * @param name - The name of the artist.
   * @param thumbnail - The new thumbnail filename, or `null`.
   */
  updateArtistThumbnail(name: string, thumbnail: string | null): void {
    const entry = this.artistCache.get(name)
    if (entry) {
      entry.thumbnail = thumbnail
    }
  }

  /**
   * Retrieves a cached album entry by its name and album type.
   * @param name - The name of the album to retrieve.
   * @param albumType - The type of the album (e.g., "album", "single").
   * @returns The {@link AlbumCacheEntry} if found, otherwise `undefined`.
   */
  getAlbum(name: string, albumType: string): AlbumCacheEntry | undefined {
    const key = this.getAlbumKey(name, albumType)
    return this.albumCache.get(key)
  }

  /**
   * Adds a new album entry to the cache.
   * @param name - The name of the album.
   * @param albumType - The type of the album.
   * @param id - The ID of the album.
   * @param artistIds - An array of artist IDs associated with the album.
   * @param thumbnail - The filename of the album's thumbnail, or `null`.
   */
  addAlbum(
    name: string,
    albumType: string,
    id: number,
    artistIds: number[],
    thumbnail: string | null
  ): void {
    const key = this.getAlbumKey(name, albumType)
    this.albumCache.set(key, {
      id,
      name,
      albumType,
      artistIds,
      thumbnail
    })
  }

  /**
   * Updates the list of associated artist IDs for a specific album in the cache.
   * @param albumId - The ID of the album to update.
   * @param artistIds - The new array of artist IDs to associate with the album.
   */
  updateAlbumArtists(albumId: number, artistIds: number[]): void {
    for (const [_key, album] of this.albumCache.entries()) {
      if (album.id === albumId) {
        album.artistIds = artistIds
        break
      }
    }
  }

  /**
   * Updates the thumbnail for an album in the cache.
   * @param name - The name of the album.
   * @param albumType - The type of the album.
   * @param thumbnail - The new thumbnail filename, or `null`.
   */
  updateAlbumThumbnail(name: string, albumType: string, thumbnail: string | null): void {
    const key = this.getAlbumKey(name, albumType)
    const entry = this.albumCache.get(key)
    if (entry) {
      entry.thumbnail = thumbnail
    }
  }

  /**
   * Returns the current number of cached artists and albums.
   * @returns An object containing the count of `artists` and `albums` in the cache.
   */
  getStats(): { artists: number; albums: number } {
    return {
      artists: this.artistCache.size,
      albums: this.albumCache.size
    }
  }

  /**
   * Clears all cached artist and album entries.
   */
  clear(): void {
    this.artistCache.clear()
    this.albumCache.clear()
  }

  /**
   * Generates a unique key for an album based on its name and type for internal cache storage.
   * @param name - The name of the album.
   * @param albumType - The type of the album.
   * @returns A string key in the format "name:albumType".
   */
  private getAlbumKey(name: string, albumType: string): string {
    return `${name}:${albumType}`
  }
}
