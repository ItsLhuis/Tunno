import Fi from "@assets/images/flags/fi.svg"

import { type Language } from "../types"

export const finnish: Language = {
  code: "fi",
  name: "Suomi",
  flag: Fi,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Tuloksia ei löytynyt"
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
      title: "Suosikit"
    },
    playlists: {
      title: "Soittolistat"
    },
    artists: {
      title: "Artistit"
    },
    settings: {
      title: "Asetukset"
    }
  }
}
