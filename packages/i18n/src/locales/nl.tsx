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
      hoursAgo: "{{count}} uur{{count, plural, one {} other{}} geleden",
      today: "Vandaag",
      yesterday: "Gisteren",
      goBack: "Terug",
      goFoward: "Vooruit",
      favorite: "Favoriet",
      unfavorite: "Verwijderen uit favorieten",
      enableShuffle: "Shuffle inschakelen",
      disableShuffle: "Shuffle uitschakelen",
      previous: "Vorige",
      play: "Afspelen",
      pause: "Pauze",
      next: "Volgende",
      enableRepeat: "Herhalen inschakelen",
      enableRepeatOne: "Herhaal één keer",
      disableRepeat: "Herhalen uitschakelen",
      mute: "Dempen",
      unmute: "Dempen uit",
      devices: "Apparaten",
      queue: "Wachtrij"
    },
    update: {
      downloading: "Update downloaden en installeren",
      downloadingDescription: "Een nieuwe update is beschikbaar en wordt automatisch geïnstalleerd",
      installedSuccess: "Update succesvol geïnstalleerd",
      failed: "Update installeren mislukt"
    },
    breadcrumbs: {
      home: {
        title: "Home"
      },
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
      fastUpload: {
        title: "Snelle upload"
      },
      settings: {
        title: "Instellingen",
        appearance: {
          title: "Uiterlijk"
        },
        language: {
          title: "Taal"
        },
        sync: {
          title: "Synchronisatie"
        }
      }
    },
    home: { title: "Home" },
    songs: {
      title: "Liedjes",
      createdTitle: "Liedje succesvol aangemaakt",
      createdDescription: "{{name}} is aangemaakt",
      createdFailedTitle: "Liedje aanmaken mislukt",
      updatedTitle: "Liedje succesvol bijgewerkt",
      updatedDescription: "{{name}} is bijgewerkt",
      updatedFailedTitle: "Liedje bijwerken mislukt",
      deletedTitle: "Liedje succesvol verwijderd",
      deletedDescription: "{{name}} is verwijderd",
      deletedFailedTitle: "Liedje verwijderen mislukt"
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
      appearance: {
        title: "Uiterlijk",
        description: "Selecteer je voorkeursweergavemodus",
        light: "Licht",
        dark: "Donker",
        system: "Systeem"
      },
      language: {
        title: "Taal",
        description: "Kies je voorkeurstaal"
      },
      sync: {
        title: "Synchronisatie",
        description: "Synchroniseer je gegevens tussen apparaten"
      }
    },
    fastUpload: {
      title: "Snelle upload"
    },
    languages: {
      da: "Deens",
      de: "Duits",
      en: "Engels",
      es: "Spaans",
      fi: "Fins",
      fr: "Frans",
      hi: "Hindi",
      it: "Italiaans",
      ja: "Japans",
      ko: "Koreaans",
      nl: "Nederlands",
      no: "Noors",
      pl: "Pools",
      pt: "Portugees",
      ru: "Russisch",
      sv: "Zweeds",
      tr: "Turks",
      uk: "Oekraïens",
      vi: "Vietnamees",
      zh: "Chinees"
    }
  }
}
