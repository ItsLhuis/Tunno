import Nl from "@assets/images/flags/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Nederlands",
  flag: Nl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Geen resultaten gevonden"
    },
    songs: {
      title: "Nummers",
      createdTitle: "Nummer Succesvol Aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Nummer Aanmaken Mislukt",
      updatedTitle: "Nummer Succesvol Bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Nummer Bijwerken Mislukt",
      deletedTitle: "Nummer Succesvol Verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Nummer Verwijderen Mislukt"
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
