import It from "@assets/images/flags/it.svg"

import { type Language } from "../types"

export const italian: Language = {
  code: "it",
  name: "Italiano",
  flag: It,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nessun risultato trovato"
    },
    songs: {
      title: "Canzoni",
      createdTitle: "Canzone Creata con Successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile Creare la Canzone",
      updatedTitle: "Canzone Aggiornata con Successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile Aggiornare la Canzone",
      deletedTitle: "Canzone Eliminata con Successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile Eliminare la Canzone"
    },
    favorites: {
      title: "Preferiti"
    },
    playlists: {
      title: "Playlist"
    },
    artists: {
      title: "Artisti"
    },
    settings: {
      title: "Impostazioni"
    }
  }
}
