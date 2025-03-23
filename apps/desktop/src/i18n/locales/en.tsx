import En from "@assets/images/flags/en.svg"

import { type Language } from "../types"

export const english: Language = {
  code: "en",
  name: "English",
  flag: En,
  isRtl: false,
  translations: {
    common :{
      noResultsFound: "No results found"
    },
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
