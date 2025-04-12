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
  common: {
    noResultsFound: string
  }
  songs: {
    title: string
    createdTitle: string
    createdDescription: string
    createdFailedTitle: string
    updatedTitle: string
    updatedDescription: string
    updatedFailedTitle: string
    deletedTitle: string
    deletedDescription: string
    deletedFailedTitle: string
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
