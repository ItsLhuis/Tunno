import De from "@assets/images/flags/de.svg"

import { type Language } from "../types"

export const german: Language = {
  code: "de",
  name: "Deutsch",
  flag: De,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Keine Ergebnisse gefunden"
    },
    songs: {
      title: "Lieder"
    },
    favorites: {
      title: "Favoriten"
    },
    playlists: {
      title: "Wiedergabelisten"
    },
    artists: {
      title: "Künstler"
    },
    settings: {
      title: "Einstellungen"
    }
  }
}
