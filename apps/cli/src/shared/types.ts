export type Artist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

export type Album = {
  name: string
  thumbnail: string
}

export type Lyrics = {
  id: number
  name: string
  trackName: string
  artistName: string
  albumName: string
  duration: number
  instrumental: boolean
  plainLyrics: { text: string }[]
  syncedLyrics?: { text: string; startTime: number }[]
}

export type Song = {
  song: string
  title: string
  thumbnail: string
  duration: number
  isSingle: boolean
  artists: Artist[]
  album: Album
  releaseYear: number
  lyrics: {
    plainLyrics: { text: string }[]
    syncedLyrics?: { text: string; startTime: number }[]
  } | null
}
