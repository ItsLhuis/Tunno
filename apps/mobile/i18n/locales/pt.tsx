import Pt from "@assets/images/flags/pt.svg"

import { type Language } from "../types"

export const portuguese: Language = {
  code: "pt",
  name: "Português",
  flag: Pt,
  isRtl: false,
  translations: {
    songs: {
      title: "Músicas"
    },
    favorites: {
      title: "Favoritos"
    },
    playlists: {
      title: "Listas"
    },
    artists: {
      title: "Artistas"
    },
    settings: {
      title: "Definições"
    }
  }
}
