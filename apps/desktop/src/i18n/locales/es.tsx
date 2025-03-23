import Es from "@assets/images/flags/es.svg"

import { type Language } from "../types"

export const spanish: Language = {
  code: "es",
  name: "Español",
  flag: Es,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "No se encontraron resultados"
    },
    songs: {
      title: "Canciones"
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
      title: "Ajustes"
    }
  }
}
