import { database, schema } from "@database/client"

import { eq, isNull } from "drizzle-orm"

import {
  generateAlbumFingerprint,
  generateArtistFingerprint,
  generatePlaylistFingerprint,
  generateSongFingerprint
} from "@repo/database"

export async function backfillFingerprints(): Promise<void> {
  const artistsWithoutFingerprint = await database
    .select({ id: schema.artists.id, name: schema.artists.name })
    .from(schema.artists)
    .where(isNull(schema.artists.fingerprint))

  for (const artist of artistsWithoutFingerprint) {
    const fingerprint = await generateArtistFingerprint(artist.name)
    await database
      .update(schema.artists)
      .set({ fingerprint })
      .where(eq(schema.artists.id, artist.id))
  }

  const albumsWithoutFingerprint = await database
    .select({
      id: schema.albums.id,
      name: schema.albums.name,
      albumType: schema.albums.albumType
    })
    .from(schema.albums)
    .where(isNull(schema.albums.fingerprint))

  for (const album of albumsWithoutFingerprint) {
    const albumArtists = await database
      .select({ name: schema.artists.name })
      .from(schema.albumsToArtists)
      .innerJoin(schema.artists, eq(schema.albumsToArtists.artistId, schema.artists.id))
      .where(eq(schema.albumsToArtists.albumId, album.id))

    const artistNames = albumArtists.map((a) => a.name)
    const fingerprint = await generateAlbumFingerprint(album.name, album.albumType, artistNames)
    await database.update(schema.albums).set({ fingerprint }).where(eq(schema.albums.id, album.id))
  }

  const playlistsWithoutFingerprint = await database
    .select({ id: schema.playlists.id, name: schema.playlists.name })
    .from(schema.playlists)
    .where(isNull(schema.playlists.fingerprint))

  for (const playlist of playlistsWithoutFingerprint) {
    const fingerprint = await generatePlaylistFingerprint(playlist.name)
    await database
      .update(schema.playlists)
      .set({ fingerprint })
      .where(eq(schema.playlists.id, playlist.id))
  }

  const songsWithoutFingerprint = await database
    .select({
      id: schema.songs.id,
      name: schema.songs.name,
      duration: schema.songs.duration,
      albumId: schema.songs.albumId
    })
    .from(schema.songs)
    .where(isNull(schema.songs.fingerprint))

  for (const song of songsWithoutFingerprint) {
    const songArtists = await database
      .select({ name: schema.artists.name })
      .from(schema.songsToArtists)
      .innerJoin(schema.artists, eq(schema.songsToArtists.artistId, schema.artists.id))
      .where(eq(schema.songsToArtists.songId, song.id))

    let albumName: string | null = null
    if (song.albumId) {
      const [album] = await database
        .select({ name: schema.albums.name })
        .from(schema.albums)
        .where(eq(schema.albums.id, song.albumId))
      albumName = album?.name ?? null
    }

    const artistNames = songArtists.map((a) => a.name)
    const fingerprint = await generateSongFingerprint(
      song.name,
      song.duration,
      artistNames,
      albumName
    )
    await database.update(schema.songs).set({ fingerprint }).where(eq(schema.songs.id, song.id))
  }
}
