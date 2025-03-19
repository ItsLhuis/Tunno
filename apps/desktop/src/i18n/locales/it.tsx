import It from "@assets/images/flags/it.svg"

import { type Language } from "../types"

export const italian: Language = {
  code: "it",
  name: "Italiano",
  flag: It,
  isRtl: false,
  translations: {
    songs: {
      title: "Canzoni"
    },
    favorites: {
      title: "Preferiti"
    },
    playlists: {
      title: "Playlist"
    },
    artists: {
      title: "Artisti"
    },
    settings: {
      title: "Impostazioni"
    }
  }
}
