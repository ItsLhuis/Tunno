export type Artist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

export type Album = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: Artist[]
}

export type Lyrics = {
  id: number
  name: string
  trackName: string
  artistName: string
  albumName: string
  duration: number
  instrumental: boolean
  lyrics: { text: string; startTime: number }[]
}

export type Song = {
  song: string
  title: string
  thumbnail: string
  duration: number
  artists: Artist[]
  album: Album
  lyrics: { text: string; startTime: number }[] | null
}
