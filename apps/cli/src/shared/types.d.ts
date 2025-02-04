export type Artist = {
  name: string
  thumbnail: string | null
}

export type Album = {
  name: string
  thumbnail: string
  isSingle: boolean
}

export type Song = {
  title: string
  thumbnail: string
  duration: number
  artists: Artist[]
  album: Album
  releaseYear: number
}
