import en from "@assets/images/flags/en.svg"

import { type Language } from "../types"

export const english: Language = {
  code: "en",
  name: "English",
  flag: en,
  translations: {
    pages: {
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
}
