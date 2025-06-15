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
    update: {
      downloading: "Download e installazione dell'aggiornamento",
      downloadingDescription:
        "Un nuovo aggiornamento è disponibile e viene installato automaticamente",
      installedSuccess: "Aggiornamento installato con successo",
      failed: "Installazione dell'aggiornamento fallita"
    },
    home: { title: "Home" },
    songs: {
      title: "Brani",
      createdTitle: "Brano Creato con Successo",
      createdDescription: "{{name}} è stato creato",
      createdFailedTitle: "Impossibile Creare il Brano",
      updatedTitle: "Brano Aggiornato con Successo",
      updatedDescription: "{{name}} è stato aggiornato",
      updatedFailedTitle: "Impossibile Aggiornare il Brano",
      deletedTitle: "Brano Eliminato con Successo",
      deletedDescription: "{{name}} è stato eliminato",
      deletedFailedTitle: "Impossibile Eliminare il Brano"
    },
    favorites: {
      title: "Preferiti",
      addedTitle: "Aggiunto ai Preferiti",
      addedDescription: "{{name}} è stato aggiunto ai preferiti",
      addedFailedTitle: "Impossibile Aggiungere ai Preferiti",
      removedTitle: "Rimosso dai Preferiti",
      removedDescription: "{{name}} è stato rimosso dai preferiti",
      removedFailedTitle: "Impossibile Rimuovere dai Preferiti"
    },
    playlists: {
      title: "Playlist",
      createdTitle: "Playlist Creata con Successo",
      createdDescription: "{{name}} è stata creata",
      createdFailedTitle: "Impossibile Creare la Playlist",
      updatedTitle: "Playlist Aggiornata con Successo",
      updatedDescription: "{{name}} è stata aggiornata",
      updatedFailedTitle: "Impossibile Aggiornare la Playlist",
      deletedTitle: "Playlist Eliminata con Successo",
      deletedDescription: "{{name}} è stata eliminata",
      deletedFailedTitle: "Impossibile Eliminare la Playlist"
    },
    artists: {
      title: "Artisti",
      createdTitle: "Artista Creato con Successo",
      createdDescription: "{{name}} è stato creato",
      createdFailedTitle: "Impossibile Creare l'Artista",
      updatedTitle: "Artista Aggiornato con Successo",
      updatedDescription: "{{name}} è stato aggiornato",
      updatedFailedTitle: "Impossibile Aggiornare l'Artista",
      deletedTitle: "Artista Eliminato con Successo",
      deletedDescription: "{{name}} è stato eliminato",
      deletedFailedTitle: "Impossibile Eliminare l'Artista"
    },
    settings: {
      title: "Impostazioni",
      theme: {
        title: "Tema",
        description: "Seleziona il tuo aspetto preferito",
        light: "Chiaro",
        dark: "Scuro",
        system: "Sistema"
      },
      language: {
        title: "Lingua",
        description: "Scegli la tua lingua preferita"
      },
      sync: {
        title: "Sincronizzazione",
        description: "Sincronizza i tuoi dati tra i dispositivi"
      }
    }
  }
}
