import It from "../assets/it.svg"

import { type Language } from "../types"

export const italian: Language = {
  code: "it",
  name: "Italiano",
  flag: It,
  isRtl: false,
  translations: {
    common: {
      noResultsFound: "Nessun risultato trovato",
      lessThanAnHourAgo: "Meno di un'ora fa",
      hoursAgo: "{{count}} ora{{count, plural, one {} other{e}}} fa",
      today: "Oggi",
      yesterday: "Ieri"
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
      title: "Preferiti",
      addedTitle: "Aggiunto ai Preferiti",
      addedDescription: "{{name}} è stato aggiunto ai preferiti",
      addedFailedTitle: "Errore nell'Aggiunta ai Preferiti",
      removedTitle: "Rimosso dai Preferiti",
      removedDescription: "{{name}} è stato rimosso dai preferiti",
      removedFailedTitle: "Errore nella Rimozione dai Preferiti"
    },
    playlists: {
      title: "Playlist",
      createdTitle: "Playlist Creata con Successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Errore nella Creazione della Playlist",
      updatedTitle: "Playlist Aggiornata con Successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Errore nell'Aggiornamento della Playlist",
      deletedTitle: "Playlist Eliminata con Successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Errore nell'Eliminazione della Playlist"
    },
    artists: {
      title: "Artisti",
      createdTitle: "Artista Creato con Successo",
      createdDescription: "{{name}} è stato creato",
      createdFailedTitle: "Errore nella Creazione dell'Artista",
      updatedTitle: "Artista Aggiornato con Successo",
      updatedDescription: "{{name}} è stato aggiornato",
      updatedFailedTitle: "Errore nell'Aggiornamento dell'Artista",
      deletedTitle: "Artista Eliminato con Successo",
      deletedDescription: "{{name}} è stato eliminato",
      deletedFailedTitle: "Errore nell'Eliminazione dell'Artista"
    },
    settings: {
      title: "Impostazioni",
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
