import Da from "@assets/images/flags/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Dansk",
  flag: Da,
  isRtl: false,
  translations: {
    songs: {
      title: "Sange"
    },
    favorites: {
      title: "Favoritter"
    },
    playlists: {
      title: "Playlister"
    },
    artists: {
      title: "Kunstnere"
    },
    settings: {
      title: "Indstillinger"
    }
  }
}
