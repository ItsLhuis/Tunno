import Sv from "@assets/images/flags/sv.svg"

import { type Language } from "../types"

export const swedish: Language = {
  code: "sv",
  name: "Svenska",
  flag: Sv,
  isRtl: false,
  translations: {
    songs: {
      title: "Sånger"
    },
    favorites: {
      title: "Favoriter"
    },
    playlists: {
      title: "Spellistor"
    },
    artists: {
      title: "Artister"
    },
    settings: {
      title: "Inställningar"
    }
  }
}
