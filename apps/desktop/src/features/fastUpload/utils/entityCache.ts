import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

export type ArtistCacheEntry = {
  id: number
  name: string
}

export type AlbumCacheEntry = {
  id: number
  name: string
  albumType: string
  artistIds: number[]
}

export class EntityCache {
  private artistCache = new Map<string, number>()
  private albumCache = new Map<string, AlbumCacheEntry>()

  async initialize(): Promise<void> {
    const artists = await database.select().from(schema.artists)
    for (const artist of artists) {
      this.artistCache.set(artist.name, artist.id)
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
        artistIds: albumArtists.map((a) => a.artistId)
      })
    }
  }

  getArtist(name: string): number | undefined {
    return this.artistCache.get(name)
  }

  addArtist(name: string, id: number): void {
    this.artistCache.set(name, id)
  }

  getAlbum(name: string, albumType: string): AlbumCacheEntry | undefined {
    const key = this.getAlbumKey(name, albumType)
    return this.albumCache.get(key)
  }

  addAlbum(name: string, albumType: string, id: number, artistIds: number[]): void {
    const key = this.getAlbumKey(name, albumType)
    this.albumCache.set(key, {
      id,
      name,
      albumType,
      artistIds
    })
  }

  updateAlbumArtists(albumId: number, artistIds: number[]): void {
    for (const [_key, album] of this.albumCache.entries()) {
      if (album.id === albumId) {
        album.artistIds = artistIds
        break
      }
    }
  }

  getStats(): { artists: number; albums: number } {
    return {
      artists: this.artistCache.size,
      albums: this.albumCache.size
    }
  }

  clear(): void {
    this.artistCache.clear()
    this.albumCache.clear()
  }

  private getAlbumKey(name: string, albumType: string): string {
    return `${name}:${albumType}`
  }
}
