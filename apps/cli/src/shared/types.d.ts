export type Artist = {
  name: string
  thumbnail: string | null
  genres: string[]
}

export type Album = {
  name: string
  thumbnail: string
}

export type Song = {
  title: string
  thumbnail: string
  duration: number
  artists: Artist[]
  album: Album
  releaseYear: number
}
