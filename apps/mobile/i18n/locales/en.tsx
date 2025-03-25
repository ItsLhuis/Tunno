import En from "@assets/images/flags/en.svg"

import { type Language } from "../types"

export const english: Language = {
  code: "en",
  name: "English",
  flag: En,
  isRtl: false,
  translations: {
    songs: {
      title: "Songs"
    },
    favorites: {
      title: "Favorites"
    },
    playlists: {
      title: "Playlists"
    },
    artists: {
      title: "Artists"
    },
    settings: {
      title: "Settings"
    }
  }
}
