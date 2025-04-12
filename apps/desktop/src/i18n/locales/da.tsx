import Da from "@assets/images/flags/da.svg"

import { type Language } from "../types"

export const danish: Language = {
  code: "da",
  name: "Dansk",
  flag: Da,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ingen resultater fundet"
    },
    songs: {
      title: "Sange",
      createdTitle: "Sang Oprettet med Succes",
      createdDescription: "{{name}} er blevet oprettet",
      createdFailedTitle: "Kunne Ikke Oprette Sang",
      updatedTitle: "Sang Opdateret med Succes",
      updatedDescription: "{{name}} er blevet opdateret",
      updatedFailedTitle: "Kunne Ikke Opdatere Sang",
      deletedTitle: "Sang Slettet med Succes",
      deletedDescription: "{{name}} er blevet slettet",
      deletedFailedTitle: "Kunne Ikke Slette Sang"
    },
    favorites: {
      title: "Favoritter"
    },
    playlists: {
      title: "Playlister"
    },
    artists: {
      title: "Kunstnere"
    },
    settings: {
      title: "Indstillinger"
    }
  }
}
