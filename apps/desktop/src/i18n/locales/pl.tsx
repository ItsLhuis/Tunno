import Pl from "@assets/images/flags/pl.svg"

import { type Language } from "../types"

export const polish: Language = {
  code: "pl",
  name: "Polski",
  flag: Pl,
  isRtl: false,
  translations: {
    songs: {
      title: "Piosenki"
    },
    favorites: {
      title: "Ulubione"
    },
    playlists: {
      title: "Playlisty"
    },
    artists: {
      title: "Artyści"
    },
    settings: {
      title: "Ustawienia"
    }
  }
}
