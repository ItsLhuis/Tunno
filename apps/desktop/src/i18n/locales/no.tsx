import No from "@assets/images/flags/no.svg"

import { type Language } from "../types"

export const norwegian: Language = {
  code: "no",
  name: "Norsk",
  flag: No,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater funnet"
    },
    songs: {
      title: "Sanger"
    },
    favorites: {
      title: "Favoritter"
    },
    playlists: {
      title: "Spillelister"
    },
    artists: {
      title: "Artister"
    },
    settings: {
      title: "Innstillinger"
    }
  }
}
