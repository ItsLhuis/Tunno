import Fi from "@assets/images/flags/fi.svg"

import { type Language } from "../types"

export const finnish: Language = {
  code: "fi",
  name: "Suomi",
  flag: Fi,
  isRtl: false,
  translations: {
    songs: {
      title: "Kappaleet"
    },
    favorites: {
      title: "Suosikit"
    },
    playlists: {
      title: "Soittolistat"
    },
    artists: {
      title: "Artistit"
    },
    settings: {
      title: "Asetukset"
    }
  }
}
