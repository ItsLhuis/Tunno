import { sha256 } from "js-sha256"

function normalizeString(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, " ")
}

export function generateSongFingerprint(
  name: string,
  duration: number,
  artistNames: string[],
  albumName: string | null
): string {
  const normalizedName = normalizeString(name)
  const sortedArtists = [...artistNames].map(normalizeString).sort().join(",")
  const normalizedAlbum = albumName ? normalizeString(albumName) : ""

  const input = `song:${normalizedName}:${duration}:${sortedArtists}:${normalizedAlbum}`

  return sha256(input)
}

export function generateAlbumFingerprint(
  name: string,
  albumType: string,
  artistNames: string[]
): string {
  const normalizedName = normalizeString(name)
  const normalizedType = normalizeString(albumType)
  const sortedArtists = [...artistNames].map(normalizeString).sort().join(",")

  const input = `album:${normalizedName}:${normalizedType}:${sortedArtists}`

  return sha256(input)
}

export function generateArtistFingerprint(name: string): string {
  const normalizedName = normalizeString(name)

  const input = `artist:${normalizedName}`

  return sha256(input)
}

export function generatePlaylistFingerprint(name: string): string {
  const normalizedName = normalizeString(name)

  const input = `playlist:${normalizedName}`

  return sha256(input)
}
