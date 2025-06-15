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
      hoursAgo: "{{count}} uur geleden",
      today: "Vandaag",
      yesterday: "Gisteren"
    },
    update: {
      downloading: "Update downloaden en installeren",
      downloadingDescription:
        "Er is een nieuwe update beschikbaar en wordt automatisch geïnstalleerd",
      installedSuccess: "Update succesvol geïnstalleerd",
      failed: "Update installeren mislukt"
    },
    home: { title: "Home" },
    songs: {
      title: "Nummers",
      createdTitle: "Nummer succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Nummer aanmaken mislukt",
      updatedTitle: "Nummer succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Nummer bijwerken mislukt",
      deletedTitle: "Nummer succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Nummer verwijderen mislukt"
    },
    favorites: {
      title: "Favorieten",
      addedTitle: "Toegevoegd aan favorieten",
      addedDescription: "{{name}} is toegevoegd aan favorieten",
      addedFailedTitle: "Toevoegen aan favorieten mislukt",
      removedTitle: "Verwijderd uit favorieten",
      removedDescription: "{{name}} is verwijderd uit favorieten",
      removedFailedTitle: "Verwijderen uit favorieten mislukt"
    },
    playlists: {
      title: "Afspeellijsten",
      createdTitle: "Afspeellijst succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Afspeellijst aanmaken mislukt",
      updatedTitle: "Afspeellijst succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Afspeellijst bijwerken mislukt",
      deletedTitle: "Afspeellijst succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Afspeellijst verwijderen mislukt"
    },
    artists: {
      title: "Artiesten",
      createdTitle: "Artiest succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Artiest aanmaken mislukt",
      updatedTitle: "Artiest succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Artiest bijwerken mislukt",
      deletedTitle: "Artiest succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Artiest verwijderen mislukt"
    },
    settings: {
      title: "Instellingen",
      theme: {
        title: "Thema",
        description: "Kies uw voorkeursweergavemodus",
        light: "Licht",
        dark: "Donker",
        system: "Systeem"
      },
      language: {
        title: "Taal",
        description: "Kies uw voorkeurstaal"
      },
      sync: {
        title: "Synchronisatie",
        description: "Synchroniseer uw gegevens tussen apparaten"
      }
    }
  }
}
