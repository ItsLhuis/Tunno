function normalizeString(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, " ")
}

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()

  const data = encoder.encode(input)

  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function generateSongFingerprint(
  name: string,
  duration: number,
  artistNames: string[],
  albumName: string | null
): Promise<string> {
  const normalizedName = normalizeString(name)

  const sortedArtists = [...artistNames].map(normalizeString).sort().join(",")
  const normalizedAlbum = albumName ? normalizeString(albumName) : ""

  const input = `song:${normalizedName}:${duration}:${sortedArtists}:${normalizedAlbum}`

  return hashString(input)
}

export async function generateAlbumFingerprint(
  name: string,
  albumType: string,
  artistNames: string[]
): Promise<string> {
  const normalizedName = normalizeString(name)
  const normalizedType = normalizeString(albumType)

  const sortedArtists = [...artistNames].map(normalizeString).sort().join(",")

  const input = `album:${normalizedName}:${normalizedType}:${sortedArtists}`

  return hashString(input)
}

export async function generateArtistFingerprint(name: string): Promise<string> {
  const normalizedName = normalizeString(name)

  const input = `artist:${normalizedName}`

  return hashString(input)
}

export async function generatePlaylistFingerprint(name: string): Promise<string> {
  const normalizedName = normalizeString(name)

  const input = `playlist:${normalizedName}`

  return hashString(input)
}
