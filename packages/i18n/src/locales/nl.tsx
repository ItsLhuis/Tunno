import Nl from "../assets/nl.svg"

import { type Language } from "../types"

export const dutch: Language = {
  code: "nl",
  name: "Nederlands",
  flag: Nl,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Geen resultaten gevonden",
      lessThanAnHourAgo: "Minder dan een uur geleden",
      hoursAgo: "{{count}} uur{{count, plural, one {} other{en}}} geleden",
      today: "Vandaag",
      yesterday: "Gisteren"
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
      title: "Favorieten",
      addedTitle: "Toegevoegd aan Favorieten",
      addedDescription: "{{name}} is toegevoegd aan favorieten",
      addedFailedTitle: "Kon Niet Toevoegen aan Favorieten",
      removedTitle: "Verwijderd uit Favorieten",
      removedDescription: "{{name}} is verwijderd uit favorieten",
      removedFailedTitle: "Kon Niet Verwijderen uit Favorieten"
    },
    playlists: {
      title: "Afspeellijsten",
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
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest Succesvol Aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Artiest Aanmaken Mislukt",
      updatedTitle: "Artiest Succesvol Bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Artiest Bijwerken Mislukt",
      deletedTitle: "Artiest Succesvol Verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Artiest Verwijderen Mislukt"
    },
    settings: {
      title: "Instellingen",
      theme: {
        title: "Theme",
        description: "Select your preferred appearance mode",
        light: "Light",
        dark: "Dark",
        system: "System"
      },
      language: {
        title: "Language",
        description: "Choose your preferred language"
      },
      sync: {
        title: "Sync",
        description: "Synchronize your data across devices"
      }
    }
  }
}
