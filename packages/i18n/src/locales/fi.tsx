import Fi from "../assets/fi.svg"

import { type Language } from "../types"

export const finnish: Language = {
  code: "fi",
  name: "Suomi",
  flag: Fi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Ei tuloksia löytynyt",
      lessThanAnHourAgo: "Alle tunti sitten",
      hoursAgo: "{{count}} tunti{{count, plural, one {} other{a}}} sitten",
      today: "Tänään",
      yesterday: "Eilen"
    },
    update: {
      downloading: "Downloading and installing update",
      downloadingDescription: "A new update is available and being installed automatically",
      installedSuccess: "Update installed successfully",
      failed: "Failed to install update"
    },
    songs: {
      title: "Kappaleet",
      createdTitle: "Kappale Luotu Onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Kappaleen Luominen Epäonnistui",
      updatedTitle: "Kappale Päivitetty Onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Kappaleen Päivitys Epäonnistui",
      deletedTitle: "Kappale Poistettu Onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Kappaleen Poisto Epäonnistui"
    },
    favorites: {
      title: "Suosikit",
      addedTitle: "Lisätty Suosikkeihin",
      addedDescription: "{{name}} on lisätty suosikkeihin",
      addedFailedTitle: "Lisäys Suosikkeihin Epäonnistui",
      removedTitle: "Poistettu Suosikeista",
      removedDescription: "{{name}} on poistettu suosikeista",
      removedFailedTitle: "Poisto Suosikeista Epäonnistui"
    },
    playlists: {
      title: "Soittolistat",
      createdTitle: "Soittolista Luotu Onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Soittolistan Luominen Epäonnistui",
      updatedTitle: "Soittolista Päivitetty Onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Soittolistan Päivitys Epäonnistui",
      deletedTitle: "Soittolista Poistettu Onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Soittolistan Poisto Epäonnistui"
    },
    artists: {
      title: "Artistit",
      createdTitle: "Artisti Luotu Onnistuneesti",
      createdDescription: "{{name}} on luotu",
      createdFailedTitle: "Artistin Luominen Epäonnistui",
      updatedTitle: "Artisti Päivitetty Onnistuneesti",
      updatedDescription: "{{name}} on päivitetty",
      updatedFailedTitle: "Artistin Päivitys Epäonnistui",
      deletedTitle: "Artisti Poistettu Onnistuneesti",
      deletedDescription: "{{name}} on poistettu",
      deletedFailedTitle: "Artistin Poisto Epäonnistui"
    },
    settings: {
      title: "Asetukset",
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
