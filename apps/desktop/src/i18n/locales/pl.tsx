import Pl from "@assets/images/flags/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polski",
  flag: Pl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nie znaleziono wyników"
    },
    songs: {
      title: "Piosenki"
    },
    favorites: {
      title: "Ulubione"
    },
    playlists: {
      title: "Listy odtwarzania"
    },
    artists: {
      title: "Artyści"
    },
    settings: {
      title: "Ustawienia"
    }
  }
}
