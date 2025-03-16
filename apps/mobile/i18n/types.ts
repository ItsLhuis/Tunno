import { type LocaleKeys } from "./locales"

export { type LocaleKeys }

export type Language = {
  code: LocaleKeys
  name: string
  flag: string
  isRtl: boolean
  translations: Translations
}

export type Translations = {
  songs: {
    title: string
  }
  favorites: {
    title: string
  }
  playlists: {
    title: string
  }
  artists: {
    title: string
  }
  settings: {
    title: string
  }
}
