import Ru from "@assets/images/flags/ru.svg"

import { type Language } from "../types"

export const russian: Language = {
  code: "ru",
  name: "Русский",
  flag: Ru,
  isRtl: false,
  translations: {
    songs: {
      title: "Песни"
    },
    favorites: {
      title: "Избранное"
    },
    playlists: {
      title: "Плейлисты"
    },
    artists: {
      title: "Артисты"
    },
    settings: {
      title: "Настройки"
    }
  }
}
