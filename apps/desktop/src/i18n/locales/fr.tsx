import fr from "@assets/images/flags/fr.svg"

import { type Language } from "../types"

export const french: Language = {
  code: "fr",
  name: "Français",
  flag: fr,
  isRtl: false,
  translations: {
    songs: {
      title: "Chansons"
    },
    favorites: {
      title: "Favoris"
    },
    playlists: {
      title: "Listes"
    },
    artists: {
      title: "Artistes"
    },
    settings: {
      title: "Paramètres"
    }
  }
}
