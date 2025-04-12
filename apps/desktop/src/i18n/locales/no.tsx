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
      title: "Sanger",
      createdTitle: "Sang Opprettet Vellykket",
      createdDescription: "{{name}} har blitt opprettet",
      createdFailedTitle: "Kunne Ikke Opprette Sang",
      updatedTitle: "Sang Oppdatert Vellykket",
      updatedDescription: "{{name}} har blitt oppdatert",
      updatedFailedTitle: "Kunne Ikke Oppdatere Sang",
      deletedTitle: "Sang Slettet Vellykket",
      deletedDescription: "{{name}} har blitt slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang"
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
