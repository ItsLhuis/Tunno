import Uk from "@assets/images/flags/uk.svg"

import { type Language } from "../types"

export const ukrainian: Language = {
  code: "uk",
  name: "Українська",
  flag: Uk,
  isRtl: false,
  translations: {
    songs: {
      title: "Пісні"
    },
    favorites: {
      title: "Улюблені"
    },
    playlists: {
      title: "Плейлисти"
    },
    artists: {
      title: "Артисти"
    },
    settings: {
      title: "Налаштування"
    }
  }
}
