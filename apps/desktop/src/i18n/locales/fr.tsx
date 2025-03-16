import fr from "@assets/images/flags/fr.svg"

import { type Language } from "../types"

export const french: Language = {
  code: "fr",
  name: "Français",
  flag: fr,
  translations: {
    pages: {
      songs: {
        title: "Chansons"
      },
      favorites: {
        title: "Favoris"
      },
      playlists: {
        title: "Listes de Lecture"
      },
      artists: {
        title: "Artistes"
      }
    }
  }
}
