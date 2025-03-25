import Nl from "@assets/images/flags/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Nederlands",
  flag: Nl,
  isRtl: false,
  translations: {
    songs: {
      title: "Liedjes"
    },
    favorites: {
      title: "Favorieten"
    },
    playlists: {
      title: "Afspeellijsten"
    },
    artists: {
      title: "Artiesten"
    },
    settings: {
      title: "Instellingen"
    }
  }
}
